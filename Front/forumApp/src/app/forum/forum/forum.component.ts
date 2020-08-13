import { Component, OnInit, Input } from '@angular/core';
import { Forum } from '../forum.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  @Input() public forum: Forum;
  constructor() { }

  ngOnInit(): void {
  }

}
