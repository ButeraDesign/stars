import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  allStars = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {

      this._httpService.allStars()
      .then( data => { this.allStars = data;
        console.log('all items');
        console.log(data) })
      .catch( err => { console.log(err); })

  }

}
