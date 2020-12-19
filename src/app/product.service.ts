import { Injectable } from '@angular/core';
import PRODUCTS from '../assets/sample_products.json';
import moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {SearchService} from './search.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: any[] = [];
  filteredProducts: any[] = [];
  public filterEvent$ = new BehaviorSubject<any[]>(this.filteredProducts);
  constructor(private searchService: SearchService) {
    this.products = PRODUCTS
      .map(p => ({
        ...p,
        tagsCSV: p.tags.join(', '),
        formattedDate: moment(p.issue_date).format('DD MMM YYYY'),
      })
      );
    this.filteredProducts = [...this.products];
    this.filterEvent$.next(this.filteredProducts);

    searchService.searchEvent$.subscribe(needle => needle && this.applyFilter(needle));
  }

  applyFilter(needle: string): void {
    if (!needle) {
      this.filter([...this.products]);
    } else {
      const regexp = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
      this.filter(
        this.products
        .map(p => ({...p, tagMatch: ((p.tags && p.tags instanceof Array && p.tags.some(t => t.match(regexp))))}))
        .map(p => ({...p, isinMatch: (p.isin && !!p.isin.match(regexp))}))
        .filter(p => p.tagMatch || p.isinMatch)
      );
    }
  }

  private filter(filtered: any[]): void {
    if (filtered.length) {
      this.filteredProducts = filtered;
    } else {
      this.filteredProducts = [...this.products];
    }
    this.filterEvent$.next(this.filteredProducts);
  }
}
