import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent {
    name!: string;
    login!: string;
    email!: string;
    password!: string;

    constructor(
        private toastr: ToastrService,
        private authService: AuthService,
        private router: Router
    ) { }

    singUp(event: Event) {
        event.preventDefault();
        const user = {
            name: this.name,
            login: this.login,
            email: this.email,
            password: this.password
        }
        if (!this.email || !this.login || !this.name || !this.password) {
           this.toastr.error('All fielsd are required', 'Error');
            return;
        }

        this.authService.registerUser(user).subscribe(data => {
            if (!data.success) {
                this.toastr.error(data.msg, 'Error');
                this.router.navigate(["/reg"]);
            } else {
                this.toastr.success(data.msg, 'Success');
                this.router.navigate(["/auth"]);
            }
        })
    }
}
