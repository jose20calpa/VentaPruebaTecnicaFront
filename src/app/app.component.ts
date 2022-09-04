import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMsj = false;
  showContent = true;
  message = 'No cuenta con privilegios';
  environmentName: string;
  versionNumber: string;
  maxTimeToShowMessage = 2000;

  hasJson = false;

  constructor(
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    
   
    
  }










}

