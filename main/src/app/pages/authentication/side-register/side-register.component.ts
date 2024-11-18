import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { UserDto } from '../../../entities/UserDto';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  form = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    sexe: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    picture: new FormControl(''),
    address: new FormControl(''),
    enabled: new FormControl(false),
  });

  constructor(private router: Router) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const user: UserDto = {
        id: 0, // Générer ou attribuer un ID ultérieurement
        firstname: this.form.value.firstname!,
        lastname: this.form.value.lastname!,
        dob: new Date(this.form.value.dob!), // Convertir la chaîne en Date
        telephone: this.form.value.telephone!,
        sexe: this.form.value.sexe!,
        email: this.form.value.email!,
        username: this.form.value.username!,
        password: this.form.value.password!,
        picture: this.form.value.picture!,
        address: this.form.value.address!,
        enabled: this.form.value.enabled!,
      };

      console.log('User:', user);
      // Logique pour envoyer `user` au backend via un service
      this.router.navigate(['/']);
    } else {
      console.log("Formulaire non valide");
    }
  }
}
