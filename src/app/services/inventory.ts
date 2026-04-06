import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private items: Item[] = [
    {
      id: 1,
      name: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      price: 999,
      supplier: 'Dell',
      stockStatus: 'In Stock',
      isPopular: true,
      comment: 'Business laptop'
    }
  ];

  getItems(): Item[] {
    return [...this.items];
  }

  getPopularItems(): Item[] {
    return this.items.filter(i => i.isPopular);
  }

  addItem(item: Item): void {
    if (this.items.some(i => i.id === item.id)) return;
    this.items.push(item);
  }

  updateItemByName(name: string, updated: Partial<Item>): void {
    const index = this.items.findIndex(i => i.name === name);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updated };
    }
  }

  deleteItemByName(name: string): void {
    this.items = this.items.filter(i => i.name !== name);
  }

  searchByName(keyword: string): Item[] {
    return this.items.filter(i =>
      i.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}