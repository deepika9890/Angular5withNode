
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { UsersComponent } from './users/users.component';
import { UserviewComponent } from './userview/userview.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { UsercreateComponent } from './usercreate/usercreate.component';
import { TopicsComponent } from './topics/topics.component';
import { TopiccreateComponent } from './topiccreate/topiccreate.component';
import { TopicviewComponent } from './topicview/topicview.component';
import { TopiceditComponent } from './topicedit/topicedit.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    { path: '', redirectTo: '/loginpage', pathMatch: 'full' },
    { path: 'loginpage', component: LoginpageComponent},
    { path: 'registerUser', component: RegisterComponent},
    { path: 'users', component: UsersComponent },
    { path: 'userview/:id', component: UserviewComponent },
    { path: 'userupdate/:id', component: UserupdateComponent },
    { path: 'usercreate', component: UsercreateComponent},
    { path: 'topics', component: TopicsComponent},
    { path: 'newTopic', component: TopiccreateComponent},
    { path: 'topicview/:topicId', component: TopicviewComponent},
    { path: 'topicedit/:topicId', component: TopiceditComponent},
    { path: 'products/:id', component: ProductsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

