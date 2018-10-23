
import { UserService} from './../userdata.service';
import { TopicService } from './../topic.service';
//import { CommentService } from './../comment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Topic} from './../topic';
import { User} from './../user';
//import { Comment} from './../comment';

@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.css']
})
export class TopicviewComponent implements OnInit {
   topic: Topic;
   user: User;
   //comment: Comment;
  constructor(private topicService: TopicService,
              private userService: UserService,
              //private commentService: CommentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTopicView();
   
  }

  getTopicView(): void{
    const id =+this.route.snapshot.paramMap.get('topicId');
    this.topicService.getTopicView(id)
    .subscribe(topic =>{
      this.topic =topic[0];
      console.log(this.topic, 'single topic');
      this.getUserView(this.topic.userId);

    });
  }

  getUserView(userId): void{
    //const userId =+this.route.snapshot.paramMap.get('userId');
    this.userService.getUserView(userId)
    .subscribe(user =>{
      this.user =user[0];
    });
  }  
 
  // getComments(topicId): void{
  //   const id = +this.route.snapshot.paramMap.get('topicId');
  //   this.commentService.getComments(topicId)
  //   .subscribe(comment =>{
  //     this.comment =comment[0];
  //   });
  // }

}