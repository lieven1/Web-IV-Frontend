import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  //{ path: 'forum', loadChildren: () => import('./forum/forum.module').then(mod => mod.ForumModule)},
  //data: {preload: true}},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
      //{preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
