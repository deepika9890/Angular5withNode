import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../userdata.service';
import { Location } from '@angular/common';
import {User} from './../user';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {
  user: User;
  
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private location: Location){ }

  ngOnInit(): void {
    this.getUserView();
  }

  getUserView(): void{
    const id =+this.route.snapshot.paramMap.get('id');
    this.userService.getUserView(id)
    .subscribe(user => {
      this.user = user[0];
      console.log(this.user);
    });
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.userService.updateUser(this.user)
    .subscribe(()=> this.goBack());
  }
}