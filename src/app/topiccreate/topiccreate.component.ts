import { UserService } from './../userdata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from './../topic.service';
import { Topic } from './../topic';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-topiccreate',
  templateUrl: './topiccreate.component.html',
  styleUrls: ['./topiccreate.component.css']
})
export class TopiccreateComponent implements OnInit {
   topic =new Topic();
   user =new User();
  constructor(private topicService: TopicService,
              private userService: UserService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(resp => {
        console.log('getting current user', resp);
        this.user = resp;
      })
  }
  
  goBack(): void {
    this.location.back();
  }
  
  save(): void {
   //this.userService.getCurrentUser()
    this.topic.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.topic.userId = this.user.id;
    this.topicService.createTopic(this.topic)
      .subscribe(() => {
        //this.goBack()
        this.router.navigate(['/', 'users']);
      });
  }

}

