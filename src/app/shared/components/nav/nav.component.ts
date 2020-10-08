import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isInAdminCompanies(): boolean {
    return this.router.url.startsWith('/admin-companies/');
  }
}
