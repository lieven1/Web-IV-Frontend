import { Component, OnInit } from '@angular/core';
import { Forum } from '../forum.model';
import { ActivatedRoute } from '@angular/router';
import { ForumDataService } from '../forum-data.service';
import { Observable } from 'rxjs';
import { Post } from '../post.model';

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

  ngOnInit() {
      /* this.route.paramMap.subscribe(pa => 
        this.forumDataService.getForum$(pa.get(`id`))
        .subscribe(item => this.forum = item)); */

/*       const id = this.route.snapshot.paramMap.get('id');
      console.log(`${id}`);
      this.forumDataService.getForum$(id).subscribe(item => (this.forum = item));
 */  }

}
