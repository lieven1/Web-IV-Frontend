import { Injectable, OnInit } from '@angular/core';
import { Forum } from './forum.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class ForumDataService{
  private _reloadFora$ = new BehaviorSubject<boolean>(true);
  
  constructor(private http: HttpClient) { }

  getFora$(name: string) {
    return this._reloadFora$.pipe(
      switchMap(() => this.fetchFora$(name)));
  }

  fetchFora$(name: string) {
    return this.http
      .get(`${environment.apiUrl}/forum/getFora?filter=${name}`)
      .pipe(catchError(this.handleError), 
      map((list: any[]): Forum[] => list.map(Forum.fromJSON)));
  }

  getForum$(id: string): Observable<Forum> {
    return this.http
      .get(`${environment.apiUrl}/forum/getForum?id=${id}`)
      .pipe(catchError(this.handleError), map(Forum.fromJSON));
  }

  addNewForum(forum: Forum) {
    return this.http
    .post(`${environment.apiUrl}/forum/`, forum.toJSON())
    .pipe(catchError(this.handleError))/* , map(Forum.fromJSON)) */
    .subscribe(() => {
      this._reloadFora$.next(true);
    })
    /* .subscribe((fo: Forum) => {
      this._fora = [...this._fora, fo];
    }); */
  }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = `an unknown error occurred ${err}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  getPosts$(id: number): Observable<Post[]> {
    return this.http
      .get(`${environment.apiUrl}/forum/getPosts?forumId=${id}`)
      .pipe(catchError(this.handleError), 
      map((list: any[]): Post[] => list.map(Post.fromJSON)));
  }
}
