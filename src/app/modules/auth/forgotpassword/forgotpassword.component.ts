import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  form: FormGroup;
  resetToken?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['administrator@mailinator.com', [Validators.required]],
      // email: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService
        .forgotPassword(this.form.controls['email'].value)
        .subscribe((res) => {
          console.log(res.data.resetPasswordToken);
          this.router.navigate(['resetPassword'], {
            queryParams: { resetToken: res.data.resetPasswordToken },
          });
        });
    }
  }
}
