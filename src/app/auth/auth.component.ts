import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    login!: string;
    password!: string;

    constructor(
        private toastr: ToastrService,
        private authService: AuthService,
        private router: Router
    ) { }

    singIn(event: Event) {
        event.preventDefault();
        const user: User = {
            login: this.login,
            password: this.password
        }
        if (!this.login || !this.password) {
           this.toastr.error('All fielsd are required', 'Error');
            return;
        }

        this.authService.authUser(user).subscribe(data => {
            if (!data.success) {
                this.toastr.error(data.msg, 'Error');
            } else {
                this.toastr.success("You are successfilly logged in!", 'Success');
                this.router.navigate(["/dashboard"]);
                this.authService.storeUser(data.token, data.user)
            }
        })
    }
}
