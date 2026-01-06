export const cartState = {
    // 現在カートに入れてる商品
    cartItems: {},
    // 現在選択してるメニューカテゴリ
    selectedCategory: null,
    // 現在カートに入れている商品合計
    currentOrderTotal: 0,
    // 今までに注文した商品全ての合計
    totalPaymentAmount: 0,
    // 今まで注文した商品の履歴
    orderHistoryList: []
};

export function resetCartState() {
    // 現在のカートを空にする
    cartState.cartItems = {};
    // 現在カートに入れてる商品の合計を0円にする
    cartState.currentOrderTotal = 0;
}