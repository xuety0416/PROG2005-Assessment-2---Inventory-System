import { Component } from '@angular/core';
// 路径改为匹配无后缀的文件名
import { InventoryService } from '../../services/inventory';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-inventory',
  standalone: false,
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {
  items: Item[] = [];
  newItem: Item = {
    id: 0,
    name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier: '',
    stockStatus: 'In Stock',
    isPopular: false
  };
  editName = '';

  constructor(private service: InventoryService) {
    this.items = this.service.getItems();
  }

  // 新增商品
  addItem() {
    if (!this.newItem.name || !this.newItem.id) return;
    this.service.addItem({ ...this.newItem });
    this.items = this.service.getItems();
    // 重置表单
    this.newItem = {
      id: 0,
      name: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplier: '',
      stockStatus: 'In Stock',
      isPopular: false
    };
  }

  // 更新商品（按名称匹配）
  updateItem() {
    this.service.updateItemByName(this.editName, this.newItem);
    this.items = this.service.getItems();
  }

  // 删除商品
  deleteItem(name: string) {
    if (confirm(`确认删除 ${name} 吗？`)) {
      this.service.deleteItemByName(name);
      this.items = this.service.getItems();
    }
  }
}