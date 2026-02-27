import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Add RouterModule
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initData();
    });
  }

  initData(): void {
    this.http.get<any>(`https://localhost:7191/api/Post/details/${this.id}`)
      .subscribe({
        next: (data) => {
          console.log('Raw post data:', data);
          this.post = new Post(
            data.id,
            data.title,
            data.content,
            data.userName,  // Map userName to author
            new Date(data.createdAt)
          );
        },
        error: (error) => {
          console.error('Error fetching post:', error);
        }
      });
  }
}
