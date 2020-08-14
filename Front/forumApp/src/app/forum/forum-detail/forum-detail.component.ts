import { Component, OnInit } from '@angular/core';
import { Forum } from '../forum.model';
import { ActivatedRoute } from '@angular/router';
import { ForumDataService } from '../forum-data.service';
import { Observable, EMPTY } from 'rxjs';
import { Post } from '../post.model';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {
  public forum: Forum;
  private _fetchPosts$: Observable<Post[]>;
  public errorMessage: string = '';

  constructor(private route: ActivatedRoute, private _forumDataService: ForumDataService) 
  {
    this.route.data.subscribe(item => 
      this.forum = item['forum']);
    this._fetchPosts$ = this._forumDataService.getPosts$(this.forum.id);
  }

  get posts$(): Observable<Post[]> {
    return this._fetchPosts$;
  }

  follow(event:any):void {
    let get = this._forumDataService.follow(this.forum.id)
    .pipe(
      catchError((err) => {
        this.errorMessage = err;
        return EMPTY;
      })
    );
    get.subscribe();
  }

  addNewPost(post: Post) {
    this._forumDataService.addPost(post);
  }

  ngOnInit() {
      /* this.route.paramMap.subscribe(pa => 
        this.forumDataService.getForum$(pa.get(`id`))
        .subscribe(item => this.forum = item)); */

/*       const id = this.route.snapshot.paramMap.get('id');
      console.log(`${id}`);
      this.forumDataService.getForum$(id).subscribe(item => (this.forum = item));
 */  }

}
