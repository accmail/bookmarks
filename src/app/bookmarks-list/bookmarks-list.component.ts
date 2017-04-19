import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/filter';

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
    this.bookmarks = this.bookmarkService.bookmarks$;
    /*this.singleBookmark$ = this.bookmarkService.bookmarks
                              .map(bookmarks => bookmarks.find(item =>item.id === '1')); */
    this.bookmarkService.getBookmarks();
  }

  addBookmark(url){
    this.bookmarkService.addBookamrk(url);
  }

  trackByFn(index, item) {
    return index; // or item.id    for (*ngFor)  ;trackBy: trackByFn'
  }

  removeBookmark(itemId) {
    this.bookmarkService.removeBookmark(itemId);
  }

}
