import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { RequestOptions } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Bookmark } from './bookmark';

@Injectable()
export class BookmarkService {

  bookmarks: number = 0;
  myPost: string;

  private bookmarksUrl = 'http://localhost:3001/bookmarks';
  private bookmarkID = 'http://localhost:3001/bookmark';

  constructor(private http: Http) { }
  //pojebany git
  addBookamrk(url: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //var body = {"url": url};
    return this.http.post(this.bookmarksUrl, { url }, options)
      .map( (res) => res.json())
      .catch(this.handleError);
  }
 
  getBookmarks(): Observable<Bookmark[]> {
     return this.http.get(this.bookmarksUrl)
      .map( res => res.json())
      .catch(this.handleError); 
  }

  removeBookmark(id: string){
    return this.http.delete( `${this.bookmarkID}/${id}`)
      .map( res => res.json())
      .catch(this.handleError);
  }
 
  isEmpty() {
    return this.bookmarks;
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
