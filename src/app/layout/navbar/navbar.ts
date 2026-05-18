import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [MatIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private router = inject(Router);

  private readonly labels: Record<string, string> = {
    dashboard: 'Dashboard',
    assets: 'All Assets',
    import: 'Import',
    export: 'Export',
    users: 'Users',
    employees: 'Employees',
    groups: 'Security Groups',
    reports: 'Reports',
    settings: 'Settings',
  };

  breadcrumb = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => {
        const segment = this.router.url.split('/')[1].split('?')[0];
        return this.labels[segment] ?? segment;
      }),
    ),
    { initialValue: 'Dashboard' },
  );
}
