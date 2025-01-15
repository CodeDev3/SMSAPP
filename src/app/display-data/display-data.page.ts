import { Component, OnInit } from '@angular/core';
import { GetAPIDataService } from '../service/get-apidata.service';
@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.page.html',
  styleUrls: ['./display-data.page.scss'],
})
export class DisplayDataPage implements OnInit {
  data:any[]=[];
  constructor(private apiService: GetAPIDataService) {}

  ngOnInit() {
 
  }


}
