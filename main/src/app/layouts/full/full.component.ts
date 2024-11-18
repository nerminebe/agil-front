import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { navItems } from './sidebar/sidebar-data';
import { NavService } from '../../services/nav.service';
import { StorageService } from '../../services/Storage.service';
import { UserService } from '../../services/User.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; 

import { NgScrollbarModule } from 'ngx-scrollbar'; // If using ngx-scrollbar
import { SidebarComponent } from '../full/sidebar/sidebar.component';
import { AppNavItemComponent } from '../full/sidebar/nav-item/nav-item.component';
import { HeaderComponent } from '../full/header/header.component';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  standalone: true,
  
  imports: [

    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    NgScrollbarModule, 
    SidebarComponent, AppNavItemComponent, HeaderComponent,
  ],
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
})
export class FullComponent implements OnInit {
  navItems = navItems;
  userData: any; // Holds user data fetched from the backend

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav | any;

  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navService: NavService,
    private userService: UserService,
    private storageService: StorageService
  ) {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
      .subscribe((state) => {
        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
      });
  }

  ngOnInit(): void {
    this.userService.me().subscribe({
      next: (userData) => {
        console.log('User data:', userData);
        this.userData = userData;

        // Save user data to local storage
        this.storageService.saveUser(userData);

        // Optionally: display username or other user details
        console.log('User logged in:', this.userData.username);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        // Handle error (e.g., redirect to login if unauthorized)
      },
    });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isContentWidthFixed = !this.isOver;
  }
}
