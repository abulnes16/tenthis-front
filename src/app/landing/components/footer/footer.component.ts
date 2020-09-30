import { Component, OnInit } from '@angular/core';

import {faFacebook, faInstagram, faTwitter} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  fbIcon = faFacebook;
  twIcon = faTwitter;
  igIcon = faInstagram;
  
  constructor() { }

  ngOnInit(): void {
  }

}
