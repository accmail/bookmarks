import { Component, OnInit, Input } from '@angular/core';

import { Bookmark } from '../bookmark';
import { BookmarkService } from '../bookmark.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  @Input() bookmark: Bookmark;
  @Input() bookmarkId: string;

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit() {

  }
  removeBookmark(item){
    this.bookmarkService.removeBookmark(item._id).subscribe((res) => console.log(res));
  }

}
