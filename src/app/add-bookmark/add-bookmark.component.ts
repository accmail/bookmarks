import { Component, Output, EventEmitter } from '@angular/core';

import { Bookmark } from '../bookmark';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css']
})
export class AddBookmarkComponent {
  
  url: string;
  @Output() newBookmark = new EventEmitter<string>();

  constructor() { 
  }

  addBookmark(){
    var urlexp = /http(s?):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    
    if(this.url && this.url.match(urlexp) ){
      this.newBookmark.emit(this.url);
      this.url ='';
    }
    else{
      alert('wrong URL');
      this.url='';
    }
  }

}
