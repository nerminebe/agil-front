import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 
import { StorageService } from 'src/app/services/Storage.service';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule, 
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule, 
  ],
  templateUrl: './side-login.component.html'
})
export class AppSideLoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) {}

  ngOnInit(): void {
    // Initialisation logic (if needed)
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log("heree")
  console.log(this.form.value.username)
  console.log(this.form.value.password)
  const username = String(this.form.value.username);
  const password = String(this.form.value.password);

  this.authService.login(username, password)
  }
}
