import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { AddForumComponent } from './add-forum/add-forum.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';
import { ForumResolver } from './ForumResolver';

const routes: Routes = [
  { path: 'forum/list', component: ForumListComponent },
  { path: 'forum/add', component: AddForumComponent },
  { path: 'forum/detail/:id', component: ForumDetailComponent
    ,resolve: { forum: ForumResolver }
  }
]; 

@NgModule({
  declarations: [PostComponent, ForumListComponent, AddForumComponent, ForumDetailComponent],
  imports: [CommonModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [ForumListComponent, AddForumComponent]
})
export class ForumModule { }
