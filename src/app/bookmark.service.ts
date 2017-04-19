import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { RequestOptions } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Bookmark } from './bookmark';

@Injectable()
export class BookmarkService {

  bookmarks$: Observable<Bookmark[]>
  private bookmarks: BehaviorSubject<Bookmark[]>;
  private dataStore: { bookmarks: Bookmark[] };

  private bookmarksUrl = 'http://localhost:3001/bookmarks';
  private bookmarkID = 'http://localhost:3001/bookmark';

  constructor(private http: Http) {
    this.dataStore = { bookmarks: [] };
    this.bookmarks = <BehaviorSubject<Bookmark[]>>new BehaviorSubject([]);
    this.bookmarks$ = this.bookmarks.asObservable();
  }

  addBookamrk(url: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.bookmarksUrl, { url }, options)
      .map((res) => res.json()).subscribe(data => {
        console.log('post response '+data);
        this.dataStore.bookmarks.unshift(data);
        this.bookmarks.next(Object.assign({}, this.dataStore).bookmarks);
      }, error => console.log('Could not creat bookmark'));
    //.catch(this.handleError);
  }

  getBookmarks() {
    this.http.get(this.bookmarksUrl)
      .map(res => res.json()).subscribe(data => {
        console.log(data);
        this.dataStore.bookmarks= data;
        this.bookmarks.next(Object.assign({}, this.dataStore).bookmarks);
      }, error => console.log('Could not load bookmarks.'));
    //.catch(this.handleError); 
  }

  removeBookmark(id: string) {
    this.http.delete(`${this.bookmarkID}/${id}`).subscribe(res => {
      this.dataStore.bookmarks.forEach((t, i) => {
        if (t._id === id) {
          this.dataStore.bookmarks.splice(i, 1);
        }
      });
      this.bookmarks.next(Object.assign({}, this.dataStore).bookmarks);
    }, error => console.log('Could not delete todo'));
  }


  private handleError(error: any) {
  // In a real world app, you might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

}
