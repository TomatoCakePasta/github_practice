import { cartState } from "../state/cartState.js";

export function addItemToCart(item) {
    if (!cartState.cartItems[item.id]) {
        cartState.cartItems[item.id] = {
            name: item.name,
            price: item.price,
            qty: 0
        };
    }
    cartState.cartItems[item.id].qty++;
}

export function addQty(id) {
    cartState.cartItems[id].qty++;
}

export function subQty(id) {
    if (cartState.cartItems[id].qty > 0) {
        cartState.cartItems[id].qty--;
    }
}

/**
 * 商品数が0のメニューを削除
 */
export function removeZeroQtyItems() {
    Object.keys(cartState.cartItems).forEach(id => {
        if (cartState.cartItems[id].qty === 0) {
            delete cartState.cartItems[id];
        }
    });
}