import { Injectable } from '@angular/core';
import { Forum } from './forum.model';

@Injectable({
  providedIn: 'root'
})
export class ForumDataService {
  private _fora = [];
  constructor() { }

  get fora() {
    return this._fora;
  }

  addNewForum(forum: Forum) {
    this._fora.push(forum);
  }
}
