import { Component } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent {
  post$: Observable<Post> | undefined
  login!: string | null

    constructor(
        private postService: PostService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router
    ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
        const user = localStorage.getItem("user");
      this.login = user ? JSON.parse(user).login : null;
    }
    this.post$ = this.route.params
        .pipe(switchMap((params: Params) => {
            return this.postService.getPostById(params["id"])
        }))
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(data => {
      if (!data.success) {
          this.toastr.error("Post not deleted!", 'Error');
      } else {
          this.toastr.success("Post deleted", 'Success');
          this.router.navigate(["/"]);
      }
    });

  }
}
