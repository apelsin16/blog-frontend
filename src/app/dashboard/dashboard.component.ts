import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  category!: string;
  title!: string;
  photo!: string;
  text!: string;

  constructor(
    private toastr: ToastrService,
    private postService: PostService,
    private router: Router
  ) {}

  createPost(event: Event) {
    event.preventDefault();
    const post = {
      category: this.category,
      title: this.title,
      photo: this.photo,
      text: this.text,
      author: JSON.parse(localStorage.getItem('user') ?? '{}').login,
      date: new Date(),
    };
    if (!this.category || !this.title || !this.photo || !this.text) {
      this.toastr.error('All fielsd are required', 'Error');
      return;
    }

    this.postService.createPost(post).subscribe((data) => {
      if (!data.success) {
        this.toastr.error(data.msg, 'Error');
      } else {
        this.toastr.success(data.msg, 'Success');
        this.router.navigate(['/']);
      }
    });
  }
}
