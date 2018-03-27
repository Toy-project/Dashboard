import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  {
    path: 'project',
    loadChildren: 'app/project/project.module#ProjectModule'
  },
  {
    path: 'member',
    loadChildren: 'app/member/member.module#MemberModule'
  },
  {
    path: 'contact',
    loadChildren: 'app/contact/contact.module#ContactModule'
  },
  {
    path: 'upload',
    loadChildren: 'app/upload/upload.module#UploadModule'
  },
  {
    path: 'setting',
    loadChildren: 'app/setting/setting.module#SettingModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
