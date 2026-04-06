import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  keyword = '';
  results: any[] = [];

  constructor() {
    this.results = [];
  }

  searchItems() {
    // 空实现，先让项目跑起来
  }
}