import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  courses = [];
  roles = [];
  userSignUp: FormGroup;
  constructor(private modalService: NgbModal,
              private userService: UserService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
      this.userService.getCourses().subscribe(
        res => {
          res.forEach(element => {
            this.courses.push(element.course);
          });
        },
        err => {console.log(err)}
      );
      this.userService.getRoles().subscribe(
        res => {
          res.forEach(element => {
            this.roles.push(element.role);
          });
        },
        err => {console.log(err)}
      );
      this.userSignUp = this.fb.group({
        user_id: ['', Validators.required],
        user_name: ['', Validators.required],
        email: ['', Validators.required],
        mobile_number: ['', Validators.required],
        course: [''],
        role: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  addUserModel(content){
    this.userSignUp.reset();
    this.modalService.open(content, {centered: true, size: 'lg', scrollable: true});
  }

  signUp(form){
    if (form.valid) {
      this.userService.addUser(this.userSignUp.value).subscribe(
        res => {
          this.userSignUp.reset();
          this.modalService.dismissAll();
        },
        err => {
          this.userSignUp.reset();
          console.log(err);
        }
      );
    }
  }

}
