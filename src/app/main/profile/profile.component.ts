import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbToastService, NgbToastType } from 'ngb-toast';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData: any;
  isEdit: boolean = false;
  profileForm!: FormGroup;
  isLoading: boolean = false;
  constructor(private _userService: UserService, private _fb: FormBuilder, private _toastService: NgbToastService) { }

  ngOnInit(): void {
    this._userService.profileData.subscribe(res => this.profileData = res);
  }

  onEdit() {
    this.isEdit = true;
    this.profileForm = this._fb.group({
      user_id: [this.profileData.id],
      name: [this.profileData.name, Validators.required],
      email: [this.profileData.email, [Validators.required, Validators.email]],
      phone_no: [this.profileData.phone_no, [Validators.required, Validators.pattern(/^\d+$/), Validators.maxLength(10)]]
    });
  }

  onSubmit() {
    if(this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    let fd = new FormData();
    for (const key in this.profileForm.value) {
      fd.append(key, this.profileForm.value[key])
    }
    this.isLoading = true;
    this._userService.updateProfile(fd).subscribe(result => {
      this.isLoading = false;
      if(result.Ack) {
        this.isEdit = false;
        localStorage.setItem('machineTestUser', JSON.stringify(result.response));
        this._userService.profileData.next(result.response);
        this._toastService.show({
          toastType: NgbToastType.Success,
          text: 'Profile updated successfully.'
        });
      } else {
        this._toastService.show({
          toastType: NgbToastType.Danger,
          text: result.msg
        });
      }
    }, error => {
      this.isLoading = false;
      console.log(error);
      
      this._toastService.show({
        toastType: NgbToastType.Danger,
        text: "Something went wrong"
      });
    });
  }

}
