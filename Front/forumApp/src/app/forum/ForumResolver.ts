import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Forum } from './forum.model';
import { Injectable } from '@angular/core';
import { ForumDataService } from './forum-data.service';
import { Observable } from 'rxjs';
  
@Injectable({
    providedIn: 'root'
})
export class ForumResolver implements Resolve<Forum> {
    constructor(private forumService: ForumDataService) {}
  
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<Forum> {
      return this.forumService.getForum$(route.params['id']);
    }
}