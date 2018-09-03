
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UserviewComponent } from './userview/userview.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { UsercreateComponent } from './usercreate/usercreate.component';

const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'userview/:id', component: UserviewComponent },
    { path: 'userupdate/:id', component: UserupdateComponent },
    { path: 'usercreate', component: UsercreateComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

