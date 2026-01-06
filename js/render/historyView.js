import { cartState } from "../state/cartState.js";

/**
 * 会計画面の描画
 * @param {HTMLElement} containerEl 
 * @param {HTMLElement} totalEl 
 */
export function renderOrderHistory(containerEl, totalEl) {
    containerEl.innerHTML = "";

    cartState.orderHistoryList.forEach((order, index) => {
        containerEl.insertAdjacentHTML(
            "beforeend",
            `<h3>注文 ${index + 1}</h3>`
        );

        order.items.forEach(item => {
            containerEl.insertAdjacentHTML(
                "beforeend",
                `
                <div class="order-item">
                    <span>${item.name}</span>
                    <span>数量: ${item.qty}</span>
                    <span>合計: ¥${item.total}</span>
                </div>
                `
            );
        });
    });

    totalEl.textContent = `お支払い合計: ¥${cartState.totalPaymentAmount}`;
}