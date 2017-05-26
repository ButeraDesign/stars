import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  allNotes = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {

      this._httpService.allStars()
      .then( data => { this.allNotes = data;
        console.log('all items');
        console.log(data) })
      .catch( err => { console.log(err); })

  }

}
