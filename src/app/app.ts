import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
  isLoggedIn = false;
  isMenuOpen = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    // Subscribe to router events to close menu on navigation
    this.router.events.subscribe(() => {
      this.isMenuOpen = false;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout(event: Event) {
    event.preventDefault();
    this.tokenStorage.signOut();
    this.isLoggedIn = false;
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}
