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

// ===== 初期表示 =====
const categoriesEl = document.getElementById("categories");
const menuEl = document.getElementById("menu");

// カテゴリ描画
MENU_DATA.categories.forEach(category => {
    const div = document.createElement("div");
    div.className = "category";
    div.textContent = category.name;
    div.onclick = () => selectCategory(category);
    categoriesEl.appendChild(div);
});

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
            <button>追加</button>
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
}

function renderCart() {
    const cartItemsEl = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");

    cartItemsEl.innerHTML = "";
    let total = 0;

    Object.values(cart).forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span>${item.name} × ${item.qty}</span>
            <span>¥${itemTotal}</span>
        `;
        cartItemsEl.appendChild(div);
    });

    totalEl.textContent = total;
}