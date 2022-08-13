import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/shared/services/voice-recognition.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {



  constructor(
    public service : VoiceRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }

  startService(){
    this.service.start()
  }

  stopService(){
    this.service.stop()
  }

}
