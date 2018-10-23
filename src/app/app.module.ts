import { CommentService } from './comment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { UsersComponent } from './users/users.component';
import { UsercreateComponent } from './usercreate/usercreate.component';
import { UserdeleteComponent } from './userdelete/userdelete.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { UserviewComponent } from './userview/userview.component';
import { UserService} from './userdata.service';
import { TopicsComponent } from './topics/topics.component';
import { TopicService} from './topic.service';
import { TopiccreateComponent } from './topiccreate/topiccreate.component';
import { TopiceditComponent } from './topicedit/topicedit.component';
import { TopicviewComponent } from './topicview/topicview.component';
import { TopicdeleteComponent } from './topicdelete/topicdelete.component';
import { CommentsComponent } from './comments/comments.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    UsercreateComponent,
    UserdeleteComponent,
    UserupdateComponent,
    UserviewComponent,
    LoginpageComponent,
    TopicsComponent,
    TopiccreateComponent,
    TopiceditComponent,
    TopicviewComponent,
    TopicdeleteComponent,
    CommentsComponent,
    RegisterComponent,
    ProductsComponent
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService, TopicService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
