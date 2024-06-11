import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowerrorComponent } from './showerror/showerror.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShowerrorComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ShowerrorComponent],
})
export class ShareModule {}
