import { Routes } from '@angular/router';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { LoginPageComponent } from './components/login-page/login-page.component';      // Add this
import { RegisterPageComponent } from './components/register-page/register-page.component'; // Add this
import { AddPostComponent } from './components/add-post/add-post.component';

export const routes: Routes = [
  { path: '', component: ListPostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'add-post', component: AddPostComponent } // Add this
];
