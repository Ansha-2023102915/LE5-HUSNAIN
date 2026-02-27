import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  post = {
    title: '',
    content: ''
  };

  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  onSubmit(): void {
    const token = this.tokenStorage.getToken();
    console.log('1. Token exists:', !!token);

    if (!token) {
      this.errorMessage = 'You must be logged in to add a post';
      return;
    }

    console.log('2. Post data:', this.post);

    this.isSubmitting = true;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    console.log('3. Headers:', headers);

    this.http.post(
      'https://localhost:7191/api/Post/add',
      { title: this.post.title, body: this.post.content },
      { headers, responseType: 'text' }
    ).subscribe({
      next: (response) => {
        console.log('4. SUCCESS - Response:', response);
        console.log('5. Response type:', typeof response);

        this.successMessage = 'Post added successfully!';
        this.isSubmitting = false;
        this.post = { title: '', content: '' };

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.log('4. ERROR - Full error:', error);
        console.log('5. Error status:', error.status);
        console.log('6. Error message:', error.message);
        console.log('7. Error error:', error.error);

        this.errorMessage = 'Error adding post. Check console for details.';
        this.isSubmitting = false;
      }
    });
  }
}
