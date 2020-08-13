import { Injectable, OnInit } from '@angular/core';
import { Forum } from './forum.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumDataService{
  // private _reloadFora$ = new BehaviorSubject<boolean>(true);
  private _fora$ = new BehaviorSubject<Forum[]>([]);
  private _fora: Forum[];
  
  constructor(private http: HttpClient) {
    this.fora$.subscribe((fora: Forum[]) => {
      this._fora = fora;
      this._fora$.next(this._fora);
    });
  }

  get allFora$(): Observable<Forum[]> {
    return this._fora$;
  }

  get fora$(): Observable<Forum[]> {
    return this.http.get(`${environment.apiUrl}/forum/`).pipe(
      tap(console.log),
      catchError(this.handleError),
      map((list: any[]): Forum[] => list.map(Forum.fromJSON))
    );
  }

  addNewForum(forum: Forum) {
    return this.http
    .post(`${environment.apiUrl}/forum/`, forum.toJSON())
    .pipe(catchError(this.handleError), map(Forum.fromJSON))
    /* .pipe(catchError((err) => {
      return throwError(err);
    }), tap((fo: Forum) => {
      this._reloadFora$.next(true);
    })) */
    .subscribe((fo: Forum) => {
      this._fora = [...this._fora, fo];
    });
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
}
