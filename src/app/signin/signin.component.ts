import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbToastService, NgbToastType } from 'ngb-toast';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  isLoading: boolean = false;
  constructor(private _fb: FormBuilder, 
    private _userService: UserService, 
    private _toastService: NgbToastService,
    private _router: Router) { }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }
    let fd = new FormData();
    for (const key in this.signinForm.value) {
      fd.append(key, this.signinForm.value[key])
    }
    this.isLoading = true;
    this._userService.signIn(fd).subscribe(result => {
      this.isLoading = false;
      if(result.Ack) {
        localStorage.setItem('machineTestUser', JSON.stringify(result.response));
        this._toastService.show({
          toastType: NgbToastType.Success,
          text: 'Logged in successfully.'
        });
        setTimeout(() => {
          this._router.navigate(['/main/profile']);
        }, 500);
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
