import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-showerror',
  templateUrl: './showerror.component.html',
  styleUrl: './showerror.component.scss',
})
export class ShowerrorComponent {
  @Input() form!: FormGroup;
  @Input() controlname!: string;

  isInvalidandTouched(form: FormGroup, controlname: string) {
    const field = form.controls[controlname];
    return field.invalid && (field.dirty || field.touched);
  }
}
