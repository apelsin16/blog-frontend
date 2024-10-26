import { AuthService } from '../auth.service';
import { Post } from '../models/post.model';
import { PostService } from './../post.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts: Post[] | [] = [];
  category = '';
  isAuthenticated = false;
  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true;
    }
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
      this.posts.forEach((post) => {
        if (post.text.length > 200) {
          post.text = `${post.text.slice(0, 200)}...`;
        }
      });
    });
  }

  setCategory(category: string) {
    this.category = category;
  }
}
