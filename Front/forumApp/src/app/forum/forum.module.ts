import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum/forum.component';
import { PostComponent } from './post/post.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { AddForumComponent } from './add-forum/add-forum.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ForumComponent, PostComponent, ForumListComponent, AddForumComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ForumListComponent]
})
export class ForumModule { }
