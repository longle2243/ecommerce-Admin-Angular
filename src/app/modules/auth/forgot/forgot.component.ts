import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['administrator@mailinator.com', [Validators.required]],
      // email: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.forgot(this.form.controls['email'].value).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
