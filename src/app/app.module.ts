import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

import { MemberService } from './member/member.service';
import { ProjectService } from './project/project.service';
import { SettingService } from './setting/setting.service';
import { VisitService } from './shared/visit/visit.service';
import { CookieService } from './shared/cookie/cookie.service';
import { MessageService } from './shared/message/message.service';
import { GithubService } from './shared/github/github.service';
import { UserAgent } from './shared/userAgent/user-agent';
import { Message } from './shared/message/message';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase, 'Dashboard'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    DatePipe,
    MemberService,
    ProjectService,
    SettingService,
    VisitService,
    CookieService,
    MessageService,
    GithubService,
    UserAgent,
    Message
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
