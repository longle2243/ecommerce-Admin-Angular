import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent {
  form: FormGroup;
  resetToken?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {
    this.form = this.fb.group({
      password: ['12345678a', [Validators.required]],
      confirmpassword: ['12345678a', [Validators.required]],
    });

    this.activateRouter.queryParams.subscribe((param) => {
      this.resetToken = param['resetToken'];
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService
        .resetPassword(this.form.controls['password'].value, this.resetToken!)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(['/private/categories']);
        });
    }
  }
}
