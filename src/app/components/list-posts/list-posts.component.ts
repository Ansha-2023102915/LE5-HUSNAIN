import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Add this import
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-posts',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
  templateUrl: './list-posts.component.html',
})
export class ListPostsComponent implements OnInit {
  posts: Post[] = [];


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.http.get<any[]>('https://localhost:7191/api/Post/list')
      .subscribe({
        next: (data) => {
          console.log('Raw data from backend:', data);
          // Map the data properly
          this.posts = data.map(item => new Post(
            item.id,
            item.title,
            item.content,
            item.userName,     // Map userName to author
            new Date(item.createdAt)
          ));
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      });
  }
  navigateToPost(id: number): void {
    this.router.navigate(['/posts', id]);
  }
}
