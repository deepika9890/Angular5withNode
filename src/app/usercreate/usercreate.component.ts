import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../userdata.service';
import { Location } from '@angular/common';
import { User } from './../user';

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.css']
})
export class UsercreateComponent implements OnInit {
  user = new User();
  //userObj: User = new User();
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    
    //this.userObj.name = this.user.name;
    //this.userObj.address = this.user.address;
    this.userService.createUser(this.user)
      .subscribe(() => this.goBack());
  }
}
