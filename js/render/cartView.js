import { cartState } from "../state/cartState.js";

/**
 * メニューの描画
 * @param {HTMLElement} cartItemsEl 
 * @param {HTMLElement} totalEl 
 * @param {HTMLElement} counterEl 
 */
export function renderCart(cartItemsEl, totalEl, counterEl) {
    cartItemsEl.innerHTML = "";
    cartState.currentOrderTotal = 0;

    let totalQty = 0;

    /* =========================
        D. デザインタスク: 金額表記の統一
        カート金額と合計金額の表記を ¥ で統一しましょう
        変更は1箇所のみです
    ========================= */
    Object.values(cartState.cartItems).forEach(item => {
        const itemTotal = item.price * item.qty;
        cartState.currentOrderTotal += itemTotal;
        totalQty += item.qty;

        cartItemsEl.insertAdjacentHTML(
            "beforeend",
            `
            <div class="cart-item">
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>× ${item.qty}</span>
                    <span>${itemTotal}円</span>
                </div>
            </div>
            `
        );
    });

    totalEl.textContent = cartState.currentOrderTotal;


    /* =========================
        J. 実装タスク: カート商品数の表示
        カートに追加された商品の個数を正しく表示しましょう
        商品個数を表す変数を代入してください
    ========================= */
    counterEl.textContent = 0;
}

/**
 * 注文内容の描画
 * @param {HTMLElement} orderListEl 
 * @param {Function} onAdd 
 * @param {Function} onSub 
 */
export function renderOrderList(orderListEl, onAdd, onSub) {
    orderListEl.innerHTML = "";

    Object.entries(cartState.cartItems).forEach(([id, item]) => {
        orderListEl.insertAdjacentHTML(
            "beforeend",
            `
            <div class="order-item">
                <span>${item.name}</span>
                <div class="qty-controls">
                    <button data-sub="${id}">−</button>
                    <span>${item.qty}</span>
                    <button data-add="${id}">＋</button>
                </div>
            </div>
            `
        );
    });

    orderListEl.querySelectorAll("[data-add]").forEach(btn =>
        btn.onclick = () => onAdd(btn.dataset.add)
    );

    orderListEl.querySelectorAll("[data-sub]").forEach(btn =>
        btn.onclick = () => onSub(btn.dataset.sub)
    );
}