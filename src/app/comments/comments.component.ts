import { UserService } from './../userdata.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Topic } from './../topic';
import { User} from './../user';
import { CommentService } from './../comment.service';
import { Comment } from './../comment';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() topic: Topic;
  comment = new Comment();
  comments: Comment[];
  user: User;
  clicked = false;
  editableId= null;
 
  constructor(private commentService: CommentService,
              private userService: UserService,
              private router: Router,
              private location: Location) { }

  ngOnInit() {
    this.getComments(this.topic.topicId);
  
    this.userService.getCurrentUser()
    .subscribe(resp =>{
      this.user =resp;
    })
  }
  
  getComments(topicId): void{
    this.commentService.getComments(topicId)
    .subscribe(comments =>{
      this.comments =comments
      console.log(comments);
    });
  }

  createComment(): void{
    this.comment.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.comment.userId = this.user.id;
    this.comment.topicId = this.topic.topicId;
    this.comment.partitionKey = 1;
    this.commentService.createComment(this.comment)
    .subscribe(comment =>{
      this.comment = new Comment();
      this.getComments(this.topic.topicId);
    });
  }

  editComment(commentId): void{
    // this.commentService.editComment(this.comment)
    // .subscribe(comment =>{
    //   this.getComments(this.topic.topicId);
    // });
    this.editableId = commentId;
  }

  //   editIndex =null;

  // clickEdit(i){
  //   this.clicked =!this.clicked;
  //   this.editIndex =i; }


  confirmation(id): void{
    const r= confirm("Delete the comment.");
    if (r == true){
      this.commentService.deletecomment(id)
      .subscribe(comment =>{
        this.getComments(this.topic.topicId);
      });
    }
  }

  goBack(): void {
    this.getComments;
  }

  save(id): void {
    let currentcomment: any;
    console.log(id, 'save fn');
    this.comments.forEach(comment => {
      if (comment.id == id) {
        currentcomment =comment;
      }
    });
    this.commentService.editComment(currentcomment)
      .subscribe((resp) => {
        //this.goBack()
        //this.router.navigate(['/', '']);
        console.log('save excuted');
        this.editableId = null;
      });
  }

}
