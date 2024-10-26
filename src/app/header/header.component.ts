import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
      private toastr: ToastrService,
        public authService: AuthService,
        private router: Router
  ) { }

    logoutUser() {
        this.authService.logout();
        this.toastr.success("You are logged out!", 'Success');
        this.router.navigate(["/auth"]);
    }

}
