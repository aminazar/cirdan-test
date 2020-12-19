import { Component, OnInit } from '@angular/core';
import PRODUCTS from '../../sample_products.json';
import moment from 'moment';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = [];
  constructor() {
    this.products = PRODUCTS.map(p => ({...p, tagsCSV: p.tags.join(', '), formattedDate: moment(p.issue_date).format('DD MMM YYYY')}));
  }

  ngOnInit(): void {
  }

}
