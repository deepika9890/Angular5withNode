import { UserService } from './../userdata.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  title = 'DATABASE USERS';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(resp => {
        console.log('getting current user', resp.name);
        this.user = resp;
      })
  }


}
