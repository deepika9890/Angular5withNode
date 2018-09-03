import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService} from './../userdata.service'
import { User } from './../user';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUserView();
  }

  getUserView(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserView(id)
      .subscribe(user => {
        this.user = user[0];
        console.log(this.user, 'single user');

      });
    
  }
}
