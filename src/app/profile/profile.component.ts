import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  userProfile: FormGroup;
  userName: string;
  showField = false;
  showAdmissionField = false;
  showCourseField = false;
  showPasswordField = false;
  showEmailField = false;
  showRoleField = false;
  showMobileField = false;
  passwordValue = '*******';
  // passwordValue = !!this.userProfile..value ? this.userProfile.get('password').value : '*******';
  constructor(private route: Router,
              private location: Location,
              private fb: FormBuilder,
              private userService: UserService) {
    // tslint:disable-next-line: no-unused-expression
    this.route.getCurrentNavigation().extras.state;
  }
  @ViewChild('addUser') content: ElementRef;
  ngOnInit(): void {
    console.log(this.location.getState());
    // this.user = this.location.getState()
    // tslint:disable-next-line: no-string-literal
    if (!!this.location.getState()['user_id']){
      this.user = !!this.location.getState();
    }else{
      this.route.navigateByUrl('/login');
    }
    this.userName = this.user.user_name;
//     // {
// 'user_id': 1,
// 'user_name': "vinay",
// "course": "Advance JAVA",
// "email": "vinayboda@gmail.com",
// "password": "test12345",
// "role": "student",
// "mobile_number": "9177167767"
// },

    this.userProfile = this.fb.group({
      admissionId: [this.user.user_id],
      password: ['*******', Validators.required],
      course: [this.user.course],
      email: [this.user.email],
      role: [this.user.role],
      mobile: [this.user.mobile_number]
    });
    // console.log(history.state);
    // this.modalService.open(this.content, {centered: true, size: 'lg', scrollable: true});
  }

  editElement(element){
    this.toggleFlag(element, true);
    // this.showField = true;
  }

  saveElement(element, formField){
    console.log('Inside element');
    // this.showField = false;
    this.toggleFlag(element, false);
    // call service
    const updateField = {};
    updateField[element] = formField.value;
    this.updateUserDetails(updateField);

  }
  cancel(element){
    // this.showField = false;
    this.toggleFlag(element, false);
  }

  toggleFlag(idName, value){
    if (idName === 'admission'){
      this.showAdmissionField = value;

    }else if (idName === 'course') {
      this.showCourseField = value;

    }else if (idName === 'email') {
      this.showEmailField = value;

    }else if (idName === 'password') {
      this.showPasswordField = value;

    }else if (idName === 'role') {
      this.showRoleField = value;

    }else if (idName === 'mobile_number') {
      this.showMobileField = value;

    }
  }
  updateUserDetails(updateField){
    const req = {
      user_id: this.userProfile.get('admissionId').value,
      update: updateField
    };
    this.userService.updateUser(req).subscribe(
      res => {
        // console.log(res);
        // this.ngOnInit();
        this.route.navigateByUrl('/user/profile', {state: this.userProfile.value});
      },
      error => {
        // console.log(error);
        // this.ngOnInit();
        this.route.navigateByUrl('/user/profile', {state: this.userProfile.value});
      }
    )
  }
}
