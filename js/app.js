// js/app.js
import { MENU_DATA } from "./data.js";

/* =========================
   アプリ状態
========================= */
let cartItems = {};                 // 現在のカート（id: item）
let selectedCategory = MENU_DATA.categories[0];
let currentOrderTotal = 0;          // 今回の注文金額
let totalPaymentAmount = 0;         // 累計支払額
let orderHistoryList = [];          // 注文履歴

/* =========================
   DOM参照
========================= */
const categoriesEl = document.getElementById("categories");
const menuEl = document.getElementById("menu");
const cartCounterEl = document.getElementById("order-counter");

const orderModal = document.getElementById("order-modal");
const checkModal = document.getElementById("check-modal");

const orderTitleEl = document.getElementById("order-title");
const historyTitleEl = document.getElementById("history-title");

const confirmOrderBtn = document.getElementById("confirm-button");
const confirmCheckBtn = document.getElementById("confirm-check-button");

const orderListEl = document.getElementById("order-list");
const orderHistoryEl = document.getElementById("order-history");
const orderTotalEl = document.getElementById("order-total");

/* =========================
   初期化
========================= */
console.log("app.js loaded");
renderCategories();
selectCategory(selectedCategory);

/* =========================
   カテゴリ描画
========================= */
function renderCategories() {
    MENU_DATA.categories.forEach(category => {
        const div = document.createElement("div");
        div.className = "category";
        div.textContent = category.name;
        div.onclick = () => selectCategory(category);
        categoriesEl.appendChild(div);
    });
}

/* =========================
   メニュー表示
========================= */
function selectCategory(category) {
    selectedCategory = category;

    document.querySelectorAll(".category").forEach(el => {
        el.classList.toggle("active", el.textContent === category.name);
    });

    menuEl.innerHTML = "";

    category.items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>¥${item.price}</p>
            <button class="add-menu">追加</button>
        `;
        div.querySelector("button").onclick = () => addItemToCart(item);
        menuEl.appendChild(div);
    });
}

/* =========================
   カート操作
========================= */
function addItemToCart(item) {
    if (!cartItems[item.id]) {
        cartItems[item.id] = {
            name: item.name,
            price: item.price,
            qty: 0
        };
    }
    cartItems[item.id].qty++;
    updateCartView();
}

window.addLastCart = function (id) {
    cartItems[id].qty++;
    updateCartView();
};

window.subLastCart = function (id) {
    if (cartItems[id].qty < 1) {
        return;
    }
    cartItems[id].qty--;
    updateCartView();
};

/* =========================
   カート描画・計算
========================= */
function updateCartView() {
    renderCartItems();
    renderOrderList();
    updateCartCounter();
    updateConfirmOrderButton();
}

function renderCartItems() {
    const cartItemsEl = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");

    cartItemsEl.innerHTML = "";
    currentOrderTotal = 0;

    Object.values(cartItems).forEach(item => {
        const itemTotal = item.price * item.qty;
        currentOrderTotal += itemTotal;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <div class="order-item">
                <span class="item-name">${item.name}</span>
                <span>× ${item.qty}</span>
                <span class="item-price">¥${itemTotal}</span>
            </div>
        `;
        cartItemsEl.appendChild(div);
    });

    totalEl.textContent = currentOrderTotal;
}

function updateCartCounter() {
    const totalQty = Object.values(cartItems)
        .reduce((sum, item) => sum + item.qty, 0);

    cartCounterEl.textContent = totalQty;
}

/* =========================
   注文確認モーダル
========================= */
window.openOrderModal = function () {
    resetOrderMessage();
    updateConfirmOrderButton();
    orderModal.classList.remove("hidden");
    renderOrderList();
};

function renderOrderList() {
    orderListEl.innerHTML = "";

    Object.entries(cartItems).forEach(([id, item]) => {
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
        orderListEl.appendChild(row);
    });
}

/* =========================
   注文履歴
========================= */
function saveOrderHistory() {
    if (currentOrderTotal === 0) return;

    orderHistoryList.push({
        items: Object.values(cartItems).map(item => ({
            name: item.name,
            price: item.price,
            qty: item.qty,
            total: item.price * item.qty
        }))
    });
}

function renderOrderHistory() {
    orderHistoryEl.innerHTML = "";

    orderHistoryList.forEach((order, index) => {
        orderHistoryEl.innerHTML += `<h3>注文 ${index + 1}</h3>`;

        order.items.forEach(item => {
            orderHistoryEl.innerHTML += `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>数量: ${item.qty}</span>
                    <span>合計: ¥${item.total}</span>
                </div>
            `;
        });
    });

    orderTotalEl.textContent = `お支払い合計: ¥${totalPaymentAmount}`;
}

/* =========================
   注文・会計確定
========================= */
window.confirmOrder = function () {
    saveOrderHistory();
    totalPaymentAmount += currentOrderTotal;
    resetCart();

    orderTitleEl.textContent = "できあがりまで少々お待ちください";
    confirmOrderBtn.textContent = "注文が完了しました!";

    setTimeout(() => orderModal.classList.add("hidden"), 2000);
};

window.openCheckModal = function () {
    checkModal.classList.remove("hidden");
    renderOrderHistory();
};

window.confirmCheck = function () {
    historyTitleEl.textContent = "またのご来店お待ちしております";
    confirmCheckBtn.textContent = "お支払いが完了しました!";

    // ユーザ操作を無効化
    document.querySelector("body").inert = true;

    setTimeout(() => {
        // 操作無効化を解除
        document.querySelector("body").inert = false;

        window.location.href = "people.html";
    }, 3000);
};

/* =========================
   リセット・補助
========================= */
function resetCart() {
    cartItems = {};
    updateCartView();
}

function resetOrderMessage() {
    orderTitleEl.textContent = "注文内容の確認";
}

function updateConfirmOrderButton() {
    const disabled = currentOrderTotal === 0;
    confirmOrderBtn.disabled = disabled;
    confirmOrderBtn.textContent = disabled
        ? "メニューを選んでください"
        : "注文を確定する";
}

window.closeOrderModal = function () {
    // qty が 0 の商品を cartItems から削除
    Object.keys(cartItems).forEach(id => {
        console.log(cartItems[id]);
        if (cartItems[id].qty === 0) {
            delete cartItems[id];
        }
    });

    updateCartView();
    orderModal.classList.add("hidden");
}

window.closeCheckModal = function () {
    checkModal.classList.add("hidden");
} 