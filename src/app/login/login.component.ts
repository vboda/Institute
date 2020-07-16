import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: FormGroup;
  showError = false;
  errorText: string;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: Router) {
   }
   @ViewChild('btn') btn: ElementRef;

  ngOnInit(): void {
    this.userLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(form){
    if (form.valid){
      console.log(this.userLogin);
      // this.userService.getUsers().subscribe(
      //   res => {
      //     console.log(res);
      //   },
      //   err => {
      //     console.error(err);
      //   }
      // );
      this.userService.authenticate(this.userLogin.value).subscribe(res => {
        this.userLogin.reset();
        console.log(res);
        sessionStorage.setItem('currentUser', JSON.stringify(res.body));
        this.route.navigateByUrl('/user/profile', {state: res.body});

      },
      err => {
        this.userLogin.reset();
        this.showError = true;
        this.errorText = err.error || 'Invalid Credentials Please Try again';
        console.log(err);
        this.userLogin.reset();
        // this.route.navigateByUrl('/user/profile', {state: {user_id: 123, user_name: 'vinay'}});
      });

    }   // this.userLogin.value
  }

  onFocusOut(field){
    field.invalid = true;
  }

  onFocus(){
    this.showError = false;
  }
  sendit(){
    this.btn.nativeElement.focus();
    this.btn.nativeElement.click();
  }

}
