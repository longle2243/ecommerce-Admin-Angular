import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/share.module';
import { ForgotComponent } from './forgot/forgot.component';

@NgModule({
  declarations: [LoginComponent, ForgotComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, ShareModule],
})
export class AuthModule {}
