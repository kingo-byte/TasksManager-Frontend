import { Component, computed, inject, TemplateRef } from '@angular/core';
import { NgbDatepickerModule, NgbOffcanvas, NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDatepickerModule, NgbDropdownModule, FontAwesomeModule, NgbCollapseModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn = computed(() => this.authService.isLoggedInSignal());
  constructor(private authService: AuthService, private router: Router){}

  private offcanvasService = inject(NgbOffcanvas);
  faBars = faBars;
  
  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      ariaLabelledBy: 'sidebar',
      panelClass: 'container-offcanvas',
    });
  }

  logout(){
    this.authService.logout();
    this.authService.isLoggedInSignal.set(false); 
    this.router.navigate(['']);
  }
}
