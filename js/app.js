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

let cart_total = 0;
let cart_history = [];

// ===== 初期表示 =====
const categoriesEl = document.getElementById("categories");
const menuEl = document.getElementById("menu");
const orderCounterEl = document.getElementById("order-counter");

const orderTitleEl = document.getElementById("order-title");
const historyTitleEl = document.getElementById("history-title");
const confirmOrderBtn = document.getElementById("confirm-button");
const confirmCheckBtn = document.getElementById("confirm-check-button");
const modal = document.getElementById("order-modal");
const orderList = document.getElementById("order-list");
const orderHistory = document.getElementById("order-history");
const checkModal = document.getElementById("check-modal");
const orderTotal = document.getElementById("order-total");

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
            <img src="${item.image}" alt="${item.name}の画像">
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
        div.innerHTML += `
            <div class="order-item">
                <span class="item-name">${item.name}</span>
                <span>× ${item.qty}</span>
                <span class="item-price">¥${itemTotal}</span>
            </div>
        `;
        cartItemsEl.appendChild(div);
    });

    totalEl.textContent = total + cart_total;
}

// カートを履歴に追加する関数
function updateCartHistory(cart) {
    const timestamp = new Date().toISOString(); // いつの履歴か記録
    if (cart_total === 0) return; // カートが空なら履歴に追加しない

    // historyEntry に timestamp を持たせる
    const historyEntry = {
        // timestamp: timestamp,
        items: Object.values(cart).map(item => ({
            name: item.name,
            price: item.price,
            qty: item.qty,
            total: item.price * item.qty
        }))
    };

    cart_history.push(historyEntry);

    console.log("cart_history");
    console.log(cart_history);
}

// モーダル関連
window.openOrderModal = function () {
    resetOrderMsg();
    modal.classList.remove("hidden");
    renderOrderList();
    updateConfirmOrderButton();
}

window.openCheckModal = function () {
    checkModal.classList.remove("hidden");
    renderOrderHistory();
}

// 金額が1多いかも
window.addLastCart = function (id) {
    cart[id].qty++;
    countCart();
    renderCart();
    renderOrderList();
    updateConfirmOrderButton();
}

window.subLastCart = function (id) {
    if (cart[id].qty < 1) {
        return;
    }

    cart[id].qty--;
    countCart();
    renderCart();
    renderOrderList();
    updateConfirmOrderButton();
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

function renderOrderHistory() {
    orderHistory.innerHTML = ""; // まず既存の履歴をクリア

    cart_history.forEach((order, orderIndex) => {
        // 1件の注文ごとに見出しを作る
        orderHistory.innerHTML += `<h3>注文 ${orderIndex + 1}</h3>`;

        // その注文の items を回す
        order.items.forEach((item, itemIndex) => {
            if (item.qty < 1) {
                return;
            }
            orderHistory.innerHTML += `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>数量: ${item.qty}</span>
                    <span>合計: ¥${item.total}</span>
                </div>
            `;
        });
    });

    orderTotal.textContent = `お支払い合計:  ¥${total}`;
}

// 注文確定
window.confirmOrder = function () {

    updateCartHistory(cart);
    calcTotal();
    resetCart();
    countCart();
    renderCart();
    renderOrderList();

    orderTitleEl.textContent = "できあがりまで少々お待ちください"
    confirmOrderBtn.textContent = "注文が完了しました!"

    // 2秒後に自動で閉じる
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 2000);
}

// 支払い確定
window.confirmCheck = function () {

    updateCartHistory(cart);
    calcTotal();
    resetCart();
    countCart();
    renderCart();
    renderOrderList();

    historyTitleEl.textContent = "またのご来店お待ちしております"
    confirmCheckBtn.textContent = "お支払いが完了しました!"

    // 2秒後に自動で閉じる
    setTimeout(() => {
        // 自動遷移
        window.location.href = "people.html";
    }, 3000);
}

window.closeOrderModal = function () {
    modal.classList.add("hidden");
    if (cart_total == 0) {
        resetCart();
        countCart();
        renderCart();
        renderOrderList();
    }
}

window.closeCheckModal = function () {
    checkModal.classList.add("hidden");
}

function calcTotal() {
    total += cart_total;
}

function resetCart() {
    cart = {};
}

function resetOrderMsg() {
    orderTitleEl.textContent = "注文内容の確認"
    confirmOrderBtn.textContent = "注文を確定"
}

function updateConfirmOrderButton() {
    if (cart_total < 1) {
        confirmOrderBtn.disabled = true;
        confirmOrderBtn.textContent = "メニューを選んでください";
    }
    else {
        confirmOrderBtn.disabled = false;
        confirmOrderBtn.textContent = "注文を確定する"
    }
}