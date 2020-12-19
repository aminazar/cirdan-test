import {Component, ViewChild} from '@angular/core';
import {SearchService} from './search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('search') search;

  constructor(private searchService: SearchService) {}
  changeSearch(): void {
    this.searchService.search$.next(this.search.nativeElement.value);
  }
}
