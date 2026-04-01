"use strict";
// 库存数组
let inventory = [];
// DOM 元素
const itemForm = document.getElementById('itemForm');
const outputDiv = document.getElementById('output');
// 表单提交 → 添加商品
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // 获取表单值
    const itemId = document.getElementById('itemId').value.trim();
    const itemName = document.getElementById('itemName').value.trim();
    const category = document.getElementById('category').value;
    const quantity = Number(document.getElementById('quantity').value);
    const price = Number(document.getElementById('price').value);
    const supplierName = document.getElementById('supplierName').value.trim();
    const isPopular = document.getElementById('isPopular').checked;
    const comment = document.getElementById('comment').value.trim();
    // 数据校验
    if (!itemId || !itemName || isNaN(quantity) || isNaN(price) || !supplierName) {
        showMessage('Please fill all required fields!', 'red');
        return;
    }
    if (inventory.some(i => i.itemId === itemId)) {
        showMessage('Item ID already exists!', 'red');
        return;
    }
    // 自动计算库存状态
    let stockStatus = 'Out of Stock';
    if (quantity > 10)
        stockStatus = 'In Stock';
    else if (quantity > 0)
        stockStatus = 'Low Stock';
    // 创建商品
    const newItem = {
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
// 显示热门商品
window.showPopular = function () {
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
window.searchItem = function () {
    const keyword = document.getElementById('searchName').value.toLowerCase().trim();
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
window.deleteItem = function (id) {
    if (!confirm('Confirm delete?'))
        return;
    inventory = inventory.filter(i => i.itemId !== id);
    showMessage('Item deleted', 'green');
    displayAllItems();
};
// 消息提示
function showMessage(text, color) {
    const msg = document.createElement('p');
    msg.textContent = text;
    msg.style.color = color;
    msg.style.margin = '10px 0';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2500);
}
// 初始化
displayAllItems();