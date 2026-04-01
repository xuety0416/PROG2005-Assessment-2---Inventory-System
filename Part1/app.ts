// Student Name: Tianyu Xue
// Student ID: 24832957
// Course: PROG2005 - Programming Mobile Systems
// Assessment 2 - Part 1 (Inventory Management System)

interface InventoryItem {
  itemId: string;
  itemName: string;
  category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Misc';
  quantity: number;
  price: number;
  supplierName: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  isPopular: boolean;
  comment?: string;
}

let inventory: InventoryItem[] = [];

// DOM 元素（用 ! 告诉 TypeScript 这些元素一定存在）
const itemForm = document.getElementById('itemForm')! as HTMLFormElement;
const outputDiv = document.getElementById('output')! as HTMLDivElement;
const searchNameInput = document.getElementById('searchName')! as HTMLInputElement;

// 表单提交事件
itemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const itemId = (document.getElementById('itemId')! as HTMLInputElement).value.trim();
  const itemName = (document.getElementById('itemName')! as HTMLInputElement).value.trim();
  const category = (document.getElementById('category')! as HTMLSelectElement).value as InventoryItem['category'];
  const quantity = Number((document.getElementById('quantity')! as HTMLInputElement).value);
  const price = Number((document.getElementById('price')! as HTMLInputElement).value);
  const supplierName = (document.getElementById('supplierName')! as HTMLInputElement).value.trim();
  const isPopular = (document.getElementById('isPopular')! as HTMLInputElement).checked;
  const comment = (document.getElementById('comment')! as HTMLInputElement).value.trim();

  // 校验
  if (!itemId || !itemName || isNaN(quantity) || quantity < 0 || isNaN(price) || price < 0 || !supplierName) {
    showMessage('Please fill all required fields correctly!', 'red');
    return;
  }
  if (inventory.some(i => i.itemId === itemId)) {
    showMessage('Item ID already exists!', 'red');
    return;
  }

  // 计算库存状态
  let stockStatus: InventoryItem['stockStatus'] = 'Out of Stock';
  if (quantity > 10) stockStatus = 'In Stock';
  else if (quantity > 0) stockStatus = 'Low Stock';

  const newItem: InventoryItem = {
    itemId, itemName, category, quantity, price, supplierName, stockStatus, isPopular, comment
  };

  inventory.push(newItem);
  showMessage('Item added successfully!', 'green');
  itemForm.reset();
  displayAllItems();
});

// 显示所有商品
function displayAllItems() {
  if (inventory.length === 0) {
    outputDiv.innerHTML = '<p>No items in inventory.</p>';
    return;
  }

  let html = `<h3>All Inventory Items (${inventory.length})</h3><div class='grid'>`;
  inventory.forEach(item => {
    html += `
      <div class='card'>
        <h4>${item.itemName}</h4>
        <p>ID: ${item.itemId}</p>
        <p>Category: ${item.category}</p>
        <p>Qty: ${item.quantity} | Price: $${item.price.toFixed(2)}</p>
        <p>Supplier: ${item.supplierName}</p>
        <p>Status: <span class='${item.stockStatus.toLowerCase()}'>${item.stockStatus}</span></p>
        <p>Popular: ${item.isPopular ? 'Yes' : 'No'}</p>
        ${item.comment ? `<p>Note: ${item.comment}</p>` : ''}
        <button onclick="deleteItem('${item.itemId}')">Delete</button>
      </div>
    `;
  });
  html += '</div>';
  outputDiv.innerHTML = html;
}

// 挂载到 window
(window as any).displayAllItems = displayAllItems;

// 显示热门商品
(window as any).showPopular = function () {
  const popular = inventory.filter(i => i.isPopular);
  if (popular.length === 0) {
    outputDiv.innerHTML = '<p>No popular items.</p>';
    return;
  }

  let html = `<h3>Popular Items (${popular.length})</h3><div class='grid'>`;
  popular.forEach(item => {
    html += `
      <div class='card'>
        <h4>${item.itemName}</h4>
        <p>ID: ${item.itemId}</p>
        <p>Status: <span class='${item.stockStatus.toLowerCase()}'>${item.stockStatus}</span></p>
      </div>
    `;
  });
  html += '</div>';
  outputDiv.innerHTML = html;
};

// 按名称搜索
(window as any).searchItem = function () {
  const keyword = searchNameInput.value.toLowerCase().trim();
  if (!keyword) {
    showMessage('Enter a name to search.', 'red');
    return;
  }

  const results = inventory.filter(i => i.itemName.toLowerCase().includes(keyword));
  if (results.length === 0) {
    outputDiv.innerHTML = `<p>No results for "${keyword}".</p>`;
    return;
  }

  let html = `<h3>Search Results (${results.length})</h3><div class='grid'>`;
  results.forEach(item => {
    html += `
      <div class='card'>
        <h4>${item.itemName}</h4>
        <p>ID: ${item.itemId}</p>
        <p>Status: <span class='${item.stockStatus.toLowerCase()}'>${item.stockStatus}</span></p>
      </div>
    `;
  });
  html += '</div>';
  outputDiv.innerHTML = html;
};

// 删除商品
(window as any).deleteItem = function (id: string) {
  if (!confirm('Confirm delete?')) return;
  inventory = inventory.filter(i => i.itemId !== id);
  showMessage('Item deleted', 'green');
  displayAllItems();
};

// 消息提示
function showMessage(text: string, color: string) {
  const msg = document.createElement('p');
  msg.textContent = text;
  msg.style.color = color;
  msg.style.margin = '10px 0';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2500);
}

// 初始化
displayAllItems();