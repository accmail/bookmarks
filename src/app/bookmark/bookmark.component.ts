import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Bookmark } from '../bookmark';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent {
  @Input() bookmark: Bookmark;
  @Input() bookmarkId: string;
  @Output() deleteBookmark = new EventEmitter<string>();

  constructor() { }

  removeBookmark(item){
    this.deleteBookmark.emit(item._id);
  }

}
