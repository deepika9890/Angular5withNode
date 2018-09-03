import { UserService } from './../userdata.service';
import { Component, OnInit } from '@angular/core';
import {User} from './../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  user: User;
 
  title ='List of users';

  constructor(private userService: UserService) {
    
   }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(): void{
    this.userService.getUserData()
    .subscribe(users => { 
      this.users =users
      console.log(this.users)
    });
  }

  confirmation(id): void{
    
    const r = confirm("Delete the user.");
    if (r == true) {
      this.userService.deleteUser(id)
      .subscribe(user =>{
        console.log("deleted")
        this.getUserData();
      })
    
  }
}
}

