import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from './../topic.service';
import { Topic } from './../topic';
import { Location} from '@angular/common';

@Component({
  selector: 'app-topicedit',
  templateUrl: './topicedit.component.html',
  styleUrls: ['./topicedit.component.css']
})
export class TopiceditComponent implements OnInit {
  topic: Topic;
  
  constructor(private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.getTopicView();
  }
  getTopicView(): void {
    const id = +this.route.snapshot.paramMap.get('topicId');
    this.topicService.getTopicView(id)
      .subscribe(topic => {
        this.topic = topic[0];
      });
  }
  save(): void {
    this.topic.createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.topicService.updateTopic(this.topic)
      .subscribe(() => {
        this.router.navigate(['/topics']);
      });
  }
}


