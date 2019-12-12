import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { FeedComponent } from './feed/feed.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { VisualizerComponent } from './visualizer/visualizer.component';

const routes: Routes = [
  { path: 'profile/:user', component: ProfileComponent, },
  { path: 'signin', component: SignInComponent},
  { path: 'feed', component: FeedComponent},
  { path: 'friends', component: FriendsComponent},
  { path: 'chat', component: ChatComponent}, 
  { path: 'visualizer', component: VisualizerComponent}, 
  { path: '**', redirectTo: '/feed' },
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
