import { Component, OnInit } from '@angular/core';
import { FormGroup,  Validators, FormBuilder } from '@angular/forms';
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
 loginForm: FormGroup; 
  
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

 

  /*submit() {
    console.log("heree")
  console.log(this.form.value.username)
  console.log(this.form.value.password)
  const username = String(this.form.value.username);
  const password = String(this.form.value.password);

  this.authService.login(username, password)
  }*/
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.authService.login(username, password).subscribe(
        (response) => {
          console.log('Login successful:', response);
  
          // Vérifiez que la réponse contient les tokens
          if (response.access_token && response.refresh_token) {
            // Stocker les tokens dans le StorageService
            this.storageService.saveTokens(response.access_token, response.refresh_token);
  
            alert('Login successful!');
            // Rediriger l'utilisateur après la connexion
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Tokens are missing in the response!';
          }
        },
        (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid username or password';
        }
      );
    } else {
      this.errorMessage = 'Please enter username and password';
    }
  }
  
}
