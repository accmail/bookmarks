import { Component, Output, EventEmitter } from '@angular/core';

import { BookmarkService } from '../bookmark.service';
import { Bookmark } from '../bookmark';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css']
})
export class AddBookmarkComponent {
  
  url: string;
  bookmarkService : BookmarkService;
  @Output() newBookmark = new EventEmitter<Bookmark>();


  constructor(bookmarkService: BookmarkService) { 
    this.bookmarkService = bookmarkService;
  }

  addBookmark(){
    var urlexp = /http(s?):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    
    if(this.url && this.url.match(urlexp) ){
       alert('OK');
      this.bookmarkService.addBookamrk(this.url).subscribe((res) => this.newBookmark.emit(res));
      this.url ='';
    }
    else{
      alert('wrong URL');
      this.url='';
    }
  }

}
