import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import decode from 'jwt-decode';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  menu = faBars;
  signOutIcon = faSignOutAlt;
  cogIcon = faCog;
  @Input() name: string;
  username: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = decode(token);
      this.username = decodedToken.name;
    }
  }

  logout(): void{
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  isInAdminCompanies(): boolean {
    return this.router.url.startsWith('/admin-companies/');
  }
}
