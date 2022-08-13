import { Component, OnInit, Injectable, PLATFORM_ID, Inject} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public products: Product[] = [];
  public product: Product[] = [];
  public search: boolean = false;
  
  public languages = [{ 
    name: 'English',
    code: 'en'
  }, {
    name: 'Tamil',
    code: 'tn'
  }];

  public currencies = [{
    name: 'Rupees',
    currency: 'INR',
    price: 70.93 // price of inr
  },]

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService,    public service : VoiceRecognitionService,public router: Router  ) {
    this.productService.cartItems.subscribe(response => this.products = response);

    this.service.init();
  }

  ngOnInit(): void {
  }
  nav(){
    this.router.navigate(['/shop/collection/left/sidebar'])
  }
  startService(){
    this.service.start()
  }

  stopService(){
    this.service.stop()
  }
  searchToggle(){
    this.search = !this.search;
  }

  changeLanguage(code){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

}
