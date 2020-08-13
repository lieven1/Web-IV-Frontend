import { Component, OnInit } from '@angular/core';
import { ForumDataService } from '../forum-data.service';
import { Forum } from '../forum.model';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent {
  constructor(private _forumDataService: ForumDataService) { }

  get fora(): Forum[] {
    return this._forumDataService.fora;
  }

  addNewForum(forum: Forum) {
    this._forumDataService.addNewForum(forum);
  }
}
