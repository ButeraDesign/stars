import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  item ={starName:'', discription:''};
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.item);
    this._httpService.createStar(this.item);

  }

}
