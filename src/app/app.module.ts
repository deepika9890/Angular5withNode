import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UsercreateComponent } from './usercreate/usercreate.component';
import { UserdeleteComponent } from './userdelete/userdelete.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { UserviewComponent } from './userview/userview.component';
import { UserService} from './userdata.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    UsercreateComponent,
    UserdeleteComponent,
    UserupdateComponent,
    UserviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
