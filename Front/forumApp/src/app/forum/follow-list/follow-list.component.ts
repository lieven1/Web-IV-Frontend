import { Component, OnInit } from '@angular/core';
import { ForumDataService } from '../forum-data.service';
import { Forum } from '../forum.model';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-follow-list',
/*   templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.css'] */
  templateUrl: '../forum-list/forum-list.component.html',
  styleUrls: ['../forum-list/forum-list.component.css']
})
export class FollowListComponent implements OnInit{
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
        const params = val ? { queryParams: { filter: val, followed: '1' } } : { queryParams: { followed: '1' } };
        this._router.navigate(['/follow/list'], params);
      });
      const params = { queryParams: { followed: '1' } };
      this._router.navigate(['/follow/list'], params);
      this._fetchFora$ = this._route.queryParams
        .pipe(
          switchMap((newParams) => {
            if (newParams['filter']) {
              this.filterForumName = newParams['filter'];
            } 
            
            return this._forumDataService.getFora$(newParams['filter'], newParams['followed']);
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
