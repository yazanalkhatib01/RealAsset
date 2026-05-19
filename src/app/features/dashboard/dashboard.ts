import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NgxChartsModule, Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { AssetService } from '../../core/services/asset';

type FeedTab = 'new' | 'checked_out' | 'checked_in' | 'maintenance' | 'broken' | 'sold';

interface FeedItem {
  tag: string;
  name: string;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MatIcon, NgxChartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private assetSvc = inject(AssetService);

  legendPosition = LegendPosition.Right;

  activeTab = signal<FeedTab>('new');

  readonly tabs: { key: FeedTab; label: string }[] = [
    { key: 'new', label: 'New Assets' },
    { key: 'checked_out', label: 'Checked Out' },
    { key: 'checked_in', label: 'Checked In' },
    { key: 'maintenance', label: 'Under Repair' },
    { key: 'broken', label: 'Broken' },
    { key: 'sold', label: 'Sold' },
  ];

  // ─ KPI Cards (from company doc) ─
  kpis = computed(() => [
    {
      label: 'Active Assets',
      value: this.assetSvc.activeAssets(),
      icon: 'inventory_2',
      bg: '#eef0ff',
      color: '#4361ee',
      change: '+12.3%',
      up: true,
    },
    {
      label: 'Total Value',
      value: '$' + this.assetSvc.totalValue().toLocaleString(),
      icon: 'payments',
      bg: '#ecfdf5',
      color: '#059669',
      change: '+5.1%',
      up: true,
    },
    {
      label: 'Available',
      value: this.assetSvc.availableAssets(),
      icon: 'check_circle',
      bg: '#ecfdf5',
      color: '#059669',
      change: '+8.2%',
      up: true,
    },
    {
      label: 'Checked Out',
      value: this.assetSvc.checkedOut(),
      icon: 'person_check',
      bg: '#fffbeb',
      color: '#d97706',
      change: '-2.4%',
      up: false,
    },
    {
      label: 'Under Repair',
      value: this.assetSvc.inMaintenance(),
      icon: 'build',
      bg: '#fef2f2',
      color: '#dc2626',
      change: '+3 this week',
      up: false,
    },
    {
      label: 'Total Assets',
      value: this.assetSvc.totalAssets(),
      icon: 'category',
      bg: '#f0f9ff',
      color: '#0284c7',
      change: '+12.3%',
      up: true,
    },
  ]);

  // ─ Mock feed data (Phase 2: from API) ─
  private feedData: Record<FeedTab, FeedItem[]> = {
    new: [
      { tag: 'AST-0249', name: 'Laptop Dell XPS 13', date: '2 min ago' },
      { tag: 'AST-0248', name: 'HP Monitor 27"', date: '1 hour ago' },
      { tag: 'AST-0247', name: 'Herman Miller Aeron', date: '3 hours ago' },
      { tag: 'AST-0246', name: 'iPad Pro 12.9"', date: 'Yesterday' },
      { tag: 'AST-0245', name: 'Canon EOS R6', date: 'Yesterday' },
    ],
    checked_out: [
      { tag: 'AST-0042', name: 'MacBook Pro 14" M3', date: 'Apr 28, 2025' },
      { tag: 'AST-0088', name: 'Canon EOS R6', date: 'Apr 5, 2025' },
    ],
    checked_in: [{ tag: 'AST-0031', name: 'MacBook Air M2', date: 'Apr 10, 2025' }],
    maintenance: [
      { tag: 'AST-0118', name: 'Herman Miller Aeron', date: 'Apr 15, 2025' },
      { tag: 'AST-0175', name: 'Canon ImageRunner 2630', date: 'Apr 20, 2025' },
    ],
    broken: [],
    sold: [{ tag: 'AST-0012', name: 'Dell Latitude 5520', date: 'Mar 1, 2025' }],
  };

  feedItems = computed(() => this.feedData[this.activeTab()]);
  setTab(t: FeedTab) {
    this.activeTab.set(t);
  }

  // ─ Charts ─
  colorScheme: Color = {
    name: 'realasset',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4361ee', '#818cf8', '#c5caff', '#e0e7ff', '#059669', '#d97706'],
  };

  categoryData = computed(() =>
    this.assetSvc.categoryData().length
      ? this.assetSvc.categoryData()
      : [
          { name: 'Electronics', value: 38 },
          { name: 'Furniture', value: 22 },
          { name: 'Vehicles', value: 17 },
          { name: 'Equipment', value: 23 },
        ],
  );

  monthlyData = [
    { name: 'Nov', value: 51 },
    { name: 'Dec', value: 65 },
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 97 },
    { name: 'Mar', value: 75 },
    { name: 'Apr', value: 87 },
  ];

  // ─ Overdue table ─
  overdueItems = [
    { name: 'MacBook Pro 14"', employee: 'Omar Y.', due: 'May 1', status: 'overdue' },
    { name: 'Canon EOS R6', employee: 'Layla M.', due: 'May 8', status: 'due-soon' },
    { name: 'iPad Pro 12.9"', employee: 'Ali H.', due: 'May 15', status: 'out' },
    { name: 'Nikon D850', employee: 'Nora S.', due: 'May 20', status: 'out' },
  ];

  ngOnInit() {
    this.assetSvc.loadAssets();
  }
}
