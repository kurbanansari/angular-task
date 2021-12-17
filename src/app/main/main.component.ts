import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  profileData: any;
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.profileData.subscribe(res => this.profileData = res);
  }

  getProfileName() {
    var matches = this.profileData?.name?.match(/\b(\w)/g);
    console.log(matches)
    return matches ? matches.join('').toUpperCase() : this.profileData?.name[0].toUpperCase();
  }
}
