import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { BookmarkComponent } from './bookmark/bookmark.component';

import { BookmarkService } from './bookmark.service';

const appRoutes: Routes = [
  { path: '', component: AppComponent},
  { path: 'bookmarkList', component: BookmarksListComponent},
  { path: '**', component: BookmarksListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BookmarksListComponent,
    AddBookmarkComponent,
    BookmarkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BookmarkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
