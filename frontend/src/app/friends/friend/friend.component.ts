import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent {

  @Input() friend:any;
  @Input() showChat:Boolean;

  friends:any = [];

  constructor() { }
}
