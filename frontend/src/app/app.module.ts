import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';

import { AppRoutingModule } from './app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { FeedComponent } from './feed/feed.component';
import { FriendsComponent } from './friends/friends.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    SignInComponent,
    FeedComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
