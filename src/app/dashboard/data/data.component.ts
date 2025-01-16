import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [SharedModule, MatProgressSpinnerModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  loading: boolean[] = [];
  public page: number = 0;

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
        res.push(i + 1);
      }
    return res;
  }

  getNumericId(id: string | number): number {
    return typeof id === 'string' ? parseInt(id, 10) : id;
  }

  cancelRegistration(registrationId: number, index: number) {
    this.loading[index] = true;
    this.backendService.deleteRegistration(registrationId).subscribe({
      next: () => {
        this.storeService.registrations.splice(index, 1);
        this.loading[index] = false;
      },
      error: (err) => {
        console.error('Hiba a törlés során:', err);
        this.loading[index] = false;
      }
    });
  }

  sortRegistrations(order: 'asc' | 'desc') {
    this.storeService.registrations.sort((a, b) => {
      const dateA = new Date(a.registrationDate).getTime();
      const dateB = new Date(b.registrationDate).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}
