import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HeroComponent } from './components/hero/hero.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { StoresComponent } from './components/stores/stores.component';
import { PlansComponent } from './components/plans/plans.component';
import { FooterComponent } from './components/footer/footer.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutComponent } from './components/layout/layout.component';

// Routing
import { LandingRoutingModule } from './landing-routing.module';
import { HeroRegisterComponent } from './components/hero-register/hero-register.component';
import { AuthModule } from '../auth/auth.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HeroComponent,
    BenefitsComponent,
    StoresComponent,
    PlansComponent,
    FooterComponent,
    CallToActionComponent,
    NavbarComponent,
    LayoutComponent,
    HeroRegisterComponent,
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    AuthModule,
    FontAwesomeModule,
  ]
})
export class LandingModule { }
