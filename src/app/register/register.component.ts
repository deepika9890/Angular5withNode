import { FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Register } from './../register';
import { Observable } from 'rxjs/Observable';
import { UsersComponent } from './../users/users.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../userdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register =new Register();
  errorMsg ='';
  registerForm =this.fb.group({
    firstname:['', Validators.required],
    lastname: ['', Validators.required],
    sex: ['', Validators.required],
    dob: ['', Validators.required],
    address: ['', Validators.required],
    emailaddress: ['', Validators.required],
    name: ['', Validators.required],
    password: ['', Validators.required],
    photo: ['', Validators.required],
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  get aliases(){
    return this.registerForm.get('aliases') as
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

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  registerUser() {
    console.log("this.register");
    this.userService.registerUser(this.register)
      .subscribe((resp) => {
        if (resp && resp.length > 0) {
          const user =resp[0];
          this.userService.getCurrentUser()
            .subscribe(resp => {
              console.log('getting current user', resp);
              this.router.navigate(['/', 'users'])
            })
          }else{
            this.errorMsg ='registration failed'
          }
        });
      }
}

