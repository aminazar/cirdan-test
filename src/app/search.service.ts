import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public search$ = new BehaviorSubject<string>('');
  public searchEvent$ = new BehaviorSubject<string>('');
  constructor() {
    this.search$
      .pipe(debounceTime(100))
      .subscribe(needle => {
        if (needle && needle.length > 2) {
          this.searchEvent$.next(needle);
        } else {
          this.searchEvent$.next('');
        }
      });
  }
}
