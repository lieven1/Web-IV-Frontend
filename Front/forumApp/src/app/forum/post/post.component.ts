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
  public timeAgo: string;
  public show:boolean = false;
  constructor(private _auth: AuthenticationService, private _data: ForumDataService) {
   }

  ngOnInit(): void {
    this.dateDifference();
  }

  toggle() {
    this.show = !this.show;
  }

  dateDifference() {
    let now = new Date();
    let nowTime = now.getTime();
    let postDate = new Date(this.post.dateAdded);
    let postTime = postDate.getTime();
    let diff = Math.abs(nowTime - postTime);
    let hoursAgo = Math.ceil(diff / (1000 * 3600));
    let daysAgo = Math.ceil(diff / (1000 * 3600 * 24));
    let yearsAgo = Math.ceil(diff / (1000 * 3600 * 24 * 365));
    this.timeAgo = yearsAgo > 1 ? yearsAgo + " years" : daysAgo > 1 ? daysAgo + " days" : hoursAgo + " hours";
  }

  showDelete(): boolean {
    return (this._auth.user$.getValue() == this.post.user.email);
  }

  delete() {
    this._data.removePost(this.post);
  }

  addNewPost(post: Post) {
    this._data.addPost(post);
  }

}
