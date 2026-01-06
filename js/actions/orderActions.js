import { cartState, resetCartState } from "../state/cartState.js";

export function saveOrderHistory() {
    if (cartState.currentOrderTotal === 0) return;

    cartState.orderHistoryList.push({
        items: Object.values(cartState.cartItems).map(item => ({
            name: item.name,
            price: item.price,
            qty: item.qty,
            total: item.price * item.qty
        }))
    });

    cartState.totalPaymentAmount += cartState.currentOrderTotal;
    resetCartState();
}