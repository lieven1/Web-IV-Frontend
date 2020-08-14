import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Post } from '../post.model';
import { Forum } from '../forum.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  @Input() public forum: Forum;
  @Output() public newPost = new EventEmitter<Post>();
  constructor() { }

  ngOnInit(): void {
  }

  addPost(content: HTMLInputElement): boolean {
    const post = new Post(content.value, this.forum.id);
    this.newPost.emit(post);
    return false;
  }

}
