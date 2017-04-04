import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BookmarkService } from '../bookmark.service';
import { Bookmark } from '../bookmark';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.css']
})
export class BookmarksListComponent implements OnInit {
  bookmarks: Observable<Bookmark[]>;

  constructor(private bookmarkService: BookmarkService) {
   }

  ngOnInit(): void {
    this.getBookmarks();
  }
  getBookmarks(){
    this.bookmarks = this.bookmarkService.getBookmarks();
      //.then(bookmarks => this.bookmarks = bookmarks);
  }

  addBookmark(item: Bookmark){
    this.bookmarks.push(item);
  }

}
