import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Forum } from '../forum.model';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css']
})
export class AddForumComponent implements OnInit {
  @Output() public newForum = new EventEmitter<Forum>();
  constructor() { }

  ngOnInit(): void {
  }

  addForum(forumName: HTMLInputElement): boolean {
    const forum = new Forum(forumName.value, []);
    this.newForum.emit(forum);
    return false;
  }

}
