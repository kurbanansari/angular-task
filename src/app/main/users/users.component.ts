import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = false;
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.isLoading = true;
    this._userService.getAllUsers({}).subscribe(
      (result) => {
        this.isLoading = false;
        this.users = result.response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
