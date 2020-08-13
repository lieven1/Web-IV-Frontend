import { Component, OnInit } from '@angular/core';
import { ForumDataService } from '../forum-data.service';
import { Forum } from '../forum.model';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit{
  public errorMessage: string = '';
  private _fetchFora$: Observable<Forum[]>;
  public filterForumName: string = '';
  public filterForum$ = new Subject<string>();

  constructor(
    private _forumDataService: ForumDataService,
    private _router: Router,
    private _route: ActivatedRoute
    ) {
      this.filterForum$
      .pipe(distinctUntilChanged(), debounceTime(250))
      .subscribe(val => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this._router.navigate(['/forum/list'], params);
      });
  
      this._fetchFora$ = this._route.queryParams
        .pipe(
          switchMap((newParams) => {
            if (newParams['filter']) {
              this.filterForumName = newParams['filter'];
            }
            return this._forumDataService.getFora$(newParams['filter']);
          })
        )
        .pipe(
          catchError((err) => {
            this.errorMessage = err;
            return EMPTY;
          })
        );
    }

  get fora$(): Observable<Forum[]> {
    return this._fetchFora$;
  }

  addNewForum(forum: Forum) {
    this._forumDataService.addNewForum(forum);
  }

  ngOnInit(): void {
      
  }
}
