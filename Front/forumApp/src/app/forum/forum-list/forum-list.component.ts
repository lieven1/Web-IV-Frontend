import { Component, OnInit } from '@angular/core';
import { ForumDataService } from '../forum-data.service';
import { Forum } from '../forum.model';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit{
  private _fetchFora$: Observable<Forum[]>;
  public errorMessage: string = '';
  constructor(private _forumDataService: ForumDataService) { }

  get fora$(): Observable<Forum[]> {
    return this._fetchFora$;
  }

  addNewForum(forum: Forum) {
    this._forumDataService.addNewForum(forum);
  }

  ngOnInit(): void {
    this._fetchFora$ = this._forumDataService.fora$.pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )
  }
}
