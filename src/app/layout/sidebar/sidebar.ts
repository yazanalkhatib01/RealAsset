import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

interface NavItem {
  label: string;
  route: string;
  icon: string;
  badge?: number;
}

interface NavSection {
  label?: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly sections: NavSection[] = [
    {
      items: [{ label: 'Dashboard', route: '/dashboard', icon: 'grid_view' }],
    },
    {
      label: 'Assets',
      items: [
        { label: 'All Assets', route: '/assets', icon: 'inventory_2', badge: 248 },
        { label: 'Import', route: '/import', icon: 'upload' },
        { label: 'Export', route: '/export', icon: 'download' },
      ],
    },
    {
      label: 'People',
      items: [
        { label: 'Users', route: '/users', icon: 'group' },
        { label: 'Employees', route: '/employees', icon: 'person' },
      ],
    },
    {
      label: 'Security',
      items: [{ label: 'Security Groups', route: '/groups', icon: 'shield' }],
    },
    {
      label: 'Analytics',
      items: [{ label: 'Reports', route: '/reports', icon: 'bar_chart' }],
    },
    {
      label: 'System',
      items: [{ label: 'Settings', route: '/settings', icon: 'settings' }],
    },
  ];
}
