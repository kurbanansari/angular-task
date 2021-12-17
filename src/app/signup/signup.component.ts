import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isLoading: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _toastService: NgbToastService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initSignupForm();
  }

  initSignupForm() {
    this.signupForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      phone_no: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    let fd = new FormData();
    for (const key in this.signupForm.value) {
      fd.append(key, this.signupForm.value[key]);
    }
    this.isLoading = true;
    this._userService.signUp(fd).subscribe(
      (result) => {
        this.isLoading = false;
        if (result.Ack) {
          this._toastService.show({
            toastType: NgbToastType.Success,
            text: result.msg,
          });
          setTimeout(() => {
            this._router.navigate(['/signin']);
          }, 500);
        } else {
          this._toastService.show({
            toastType: NgbToastType.Danger,
            text: result.msg,
          });
        }
      },
      (error) => {
        this.isLoading = false;
        console.log(error);

        this._toastService.show({
          toastType: NgbToastType.Danger,
          text: 'Something went wrong',
        });
      }
    );
  }
}
