import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { AuthenticationService } from 'src/app/user/authentication.service';
import { ForumDataService } from '../forum-data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() public post: Post;
  constructor(private _auth: AuthenticationService, private _data: ForumDataService) { }

  ngOnInit(): void {
  }

  showDelete(): boolean {
    return (this._auth.user$.getValue() == this.post.user.email);
  }

  delete() {
    this._data.removePost(this.post);
  }

}
