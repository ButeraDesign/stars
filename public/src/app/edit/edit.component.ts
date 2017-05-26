import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id;
  star;
  constructor(private _httpService: HttpService,private _route: ActivatedRoute) {
    this._route.params.subscribe((param)=>{
      this.id = param.id;
      console.log("TaskDetailsComponent loaded and url id given is: ", param.id);
    })
  }

  ngOnInit() {
    this._httpService.getStar(this.id)
    .then( data => { this.star = data;
      console.log(data) })
    .catch( err => { console.log(err); })
  }

  submit(){
    console.log(this.star);
    this._httpService.updateStar(this.star, this.id);

  }

}
