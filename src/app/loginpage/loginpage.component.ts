import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UsersComponent } from './../users/users.component';
import { Login } from './../login';
import { FormArray} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../userdata.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})

export class LoginpageComponent implements OnInit {
 login = new Login();
 errorMsg= '';
 loginForm =this.fb.group({
   name: ['', Validators.required],
   password: ['', Validators.required],
   aliases: this.fb.array([
    this.fb.control('')
  ])
});

get aliases(){
  return this.loginForm.get('aliases') as
  FormArray;
}
  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) { }

  ngOnInit(): void { 
  }

  goBack(): void {
    this.location.back();
  }

  addAlias(){
    this.aliases.push(this.fb.control(''));
  }
  
  submit() {
  //this.router.navigate(['/', 'users']);
  console.warn(this.loginForm.value);
  this.userService.login(this.login)
    .subscribe((resp) => {
      if (resp && resp.length > 0) {
        const user = resp[0];
        //this.router.navigate(['/', 'users'])
        this.userService.setCurrentUser(user);
        this.userService.getCurrentUser()
            .subscribe(resp => {
              console.log('getting current user', resp);
              this.router.navigate(['/', 'users'])
            })
      } else {
        this.errorMsg = 'login failed'
      }
    });
  }
}


  


