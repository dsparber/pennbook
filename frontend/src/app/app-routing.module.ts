import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/guard.service'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FeedComponent } from './feed/feed.component';
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: SignInComponent},
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
