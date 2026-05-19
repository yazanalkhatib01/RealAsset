import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asset } from '../models/asset.model';

@Injectable({ providedIn: 'root' })
export class AssetService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:3000';

  assets = signal<Asset[]>([]);
  loading = signal(false);

  totalAssets = computed(() => this.assets().length);
  activeAssets = computed(() => this.assets().filter((a) => a.status === 'Active').length);
  availableAssets = computed(() => this.assets().filter((a) => a.status === 'Available').length);
  checkedOut = computed(() => this.assets().filter((a) => a.status === 'Checked Out').length);
  inMaintenance = computed(() => this.assets().filter((a) => a.status === 'Maintenance').length);
  sold = computed(() => this.assets().filter((a) => a.status === 'Sold').length);
  totalValue = computed(() => this.assets().reduce((sum, a) => sum + (a.purchasePrice ?? 0), 0));
  categoryData = computed(() => {
    const counts: Record<string, number> = {};
    this.assets().forEach((a) => {
      counts[a.category] = (counts[a.category] ?? 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  });

  loadAssets() {
    this.loading.set(true);
    this.http.get<Asset[]>(`${this.API}/assets`).subscribe({
      next: (assets) => {
        this.assets.set(assets);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }
}
