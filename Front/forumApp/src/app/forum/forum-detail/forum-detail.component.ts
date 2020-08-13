import { Component, OnInit } from '@angular/core';
import { Forum } from '../forum.model';
import { ActivatedRoute } from '@angular/router';
import { ForumDataService } from '../forum-data.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {
  public forum: Forum;
  constructor(private route: ActivatedRoute, private forumDataService: ForumDataService) { }

  ngOnInit() {
    this.route.data.subscribe(item => 
      this.forum = item['forum']);

      /* this.route.paramMap.subscribe(pa => 
        this.forumDataService.getForum$(pa.get(`id`))
        .subscribe(item => this.forum = item)); */

/*       const id = this.route.snapshot.paramMap.get('id');
      console.log(`${id}`);
      this.forumDataService.getForum$(id).subscribe(item => (this.forum = item));
 */  }

}
