import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  constructor(private userService: UserService,
              private route: Router) { }
  users = [];
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      res => this.users = res,
      err => console.error(err)
    );
  }
  deleteUser(user){
    const data = {
      user_id : user.user_id
    }
    this.userService.deleteUser(data).subscribe(
      res => {
        this.ngOnInit();
      },
      err => console.log(err)
    );
  }
}
