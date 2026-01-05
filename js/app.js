// ===== メニューデータ =====
// const data = {
//     "フード": [
//         { name: "ハンバーグ", price: 800 },
//         { name: "カレー", price: 700 },
//         { name: "オムライス", price: 800 },
//     ],
//     "ドリンク": [
//         { name: "コーラ", price: 300 },
//         { name: "コーヒー", price: 350 }
//     ]
// };

// js/app.js
import { MENU_DATA } from "./data.js";

let cart = {};
let currentCategory = MENU_DATA.categories[0];
let total = 0;

let cart_total;
let cart_history = [];

// ===== 初期表示 =====
const categoriesEl = document.getElementById("categories");
const menuEl = document.getElementById("menu");
const orderCounterEl = document.getElementById("order-counter");

const modal = document.getElementById("order-modal");
const orderList = document.getElementById("order-list");

// カテゴリ描画
MENU_DATA.categories.forEach(category => {
    const div = document.createElement("div");
    div.className = "category";
    div.textContent = category.name;
    div.onclick = () => selectCategory(category);
    categoriesEl.appendChild(div);
});

console.log("app.js loaded");

selectCategory(currentCategory);

// ===== カテゴリ切り替え =====
function selectCategory(category) {
    currentCategory = category;
    console.log(category);

    document.querySelectorAll(".category").forEach(c => {
        c.classList.toggle("active", c.textContent === category.name);
    });

    menuEl.innerHTML = "";

    category.items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}の画像を作ってください">
            <h3>${item.name}</h3>
            <p>¥${item.price}</p>
            <button class="add-menu">追加</button>
        `;
        div.querySelector("button").onclick = () => addToCart(item);
        menuEl.appendChild(div);
    });
}

// ===== カート処理 =====
function addToCart(item) {
    if (!cart[item.id]) {
        cart[item.id] = {
            name: item.name,
            price: item.price,
            qty: 0
        };
    }
    cart[item.id].qty++;
    renderCart();
    countCart();
    addHistory(item);
}

function addHistory(item) {
    cart_history.push(item);
    console.log(cart_history);
}

function countCart() {
    let cartItems = 0;

    for (const key in cart) {
        cartItems += cart[key].qty;
    }

    orderCounterEl.textContent = cartItems.toString();
}

function renderCart() {
    const cartItemsEl = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");

    cartItemsEl.innerHTML = "";

    cart_total = 0;

    Object.values(cart).forEach(item => {
        const itemTotal = item.price * item.qty;
        cart_total += itemTotal;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${item.name} × ${item.qty}</span>
            <span>¥${itemTotal}</span>
        `;
        cartItemsEl.appendChild(div);
    });

    totalEl.textContent = total + cart_total;
}

// モーダル関連
window.openOrderModal = function () {
    modal.classList.remove("hidden");
    renderOrderList();
}

// 金額が1多いかも
window.addLastCart = function (id) {
    cart[id].qty++;
    countCart();
    renderCart();
    renderOrderList();
}

window.subLastCart = function (id) {
    if (cart[id].qty < 1) {
        return;
    }

    cart[id].qty--;
    countCart();
    renderCart();
    renderOrderList();
}

function renderOrderList() {
    orderList.innerHTML = "";

    Object.entries(cart).forEach(([id, item]) => {
        const row = document.createElement("div");
        row.className = "order-item";

        row.innerHTML = `
            <span>${item.name}</span>
            <div class="qty-controls">
                <button onclick="subLastCart('${id}')">−</button>
                <span>${item.qty}</span>
                <button onclick="addLastCart('${id}')">＋</button>
            </div>
        `;

        orderList.appendChild(row);
    });
}

// 注文確定
window.confirmOrder = function () {
    modal.classList.add("hidden");
    calcTotal();
    resetCart();
    countCart();
    renderCart();
}

function calcTotal() {
    total += cart_total;
}

function resetCart() {
    cart = {};
}