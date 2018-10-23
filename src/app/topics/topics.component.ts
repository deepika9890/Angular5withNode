
import { Component, OnInit } from '@angular/core';
import {TopicService} from './../topic.service';
import {Topic} from './../topic';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics: Topic[];
  topic: Topic;

  title = 'Topic Forum';
  constructor(private topicService: TopicService) { }

  ngOnInit(){
    this.getTopicData();
  }

  getTopicData(): void{
    this.topicService.getTopicData()
    .subscribe(topics =>{
      this.topics =topics
      
    });
  }

  confirmation(topicId): void{
    const r = confirm("Delete the topic.");
    if (r==true){
      this.topicService.deleteTopic(topicId)
      .subscribe(user =>{
        this.getTopicData();
      })
    }
  }
}
