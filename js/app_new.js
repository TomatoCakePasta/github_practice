import { MENU_DATA } from "./data.js";
import { cartState } from "./state/cartState.js";
import { addItemToCart, addQty, subQty, removeZeroQtyItems } from "./actions/cartActions.js";
import { saveOrderHistory } from "./actions/orderActions.js";
import { renderCategories, updateActiveCategory } from "./render/categoryView.js";
import { renderMenu } from "./render/menuView.js";
import { renderCart, renderOrderList } from "./render/cartView.js";
import { renderOrderHistory } from "./render/historyView.js";
import { openModal, closeModal } from "./ui/modal.js";

/* DOM */
// カテゴリの描画範囲
const categoriesEl = document.getElementById("categories");
// メニューの描画範囲
const menuEl = document.getElementById("menu");
// 現在カートに入れている商品の描画範囲
const cartItemsEl = document.getElementById("cartItems");
// 現在カートに入れている商品の合計金額を描画する範囲
const totalEl = document.getElementById("total");
// カートに入れた商品個数の描画範囲
const counterEl = document.getElementById("order-counter");
// 現在カートに入れている商品の描画範囲 (注文内容の確認画面)
const orderListEl = document.getElementById("order-list");
// 注文済み商品履歴の描画範囲
const orderHistoryEl = document.getElementById("order-history");
// 注文済み商品の合計金額描画範囲
const orderTotalEl = document.getElementById("order-total");

const orderTitleEl = document.getElementById("order-title");
const historyTitleEl = document.getElementById("history-title");
const confirmOrderBtn = document.getElementById("confirm-button");
const confirmCheckBtn = document.getElementById("confirm-check-button");

const orderModal = document.getElementById("order-modal");
const checkModal = document.getElementById("check-modal");

/* 初期化 */
cartState.selectedCategory = MENU_DATA.categories[0];

// カテゴリの描画
renderCategories(MENU_DATA.categories, categoriesEl, selectCategory);
// 選択中のカテゴリのメニュー表示
selectCategory(cartState.selectedCategory);

/**
 * 選択中のカテゴリのメニュー表示
 * @param {object} category 選択中のカテゴリとメニュー
 */
function selectCategory(category) {
    // 現在選択中のカテゴリを更新
    cartState.selectedCategory = category;
    // 選択中のカテゴリを強調
    updateActiveCategory(category.name);
    // 選択中カテゴリのメニュー描画
    renderMenu(category, menuEl, onAddItem);
}

function onAddItem(item) {
    addItemToCart(item);
    updateUI();
}

function updateUI() {
    renderCart(cartItemsEl, totalEl, counterEl);
    renderOrderList(orderListEl, onAddQty, onSubQty);
    updateConfirmOrderButton();
}

function onAddQty(id) {
    addQty(id);
    updateUI();
}

function onSubQty(id) {
    subQty(id);
    updateUI();
}

function updateConfirmOrderButton() {
    const disabled = cartState.currentOrderTotal === 0;

    confirmOrderBtn.disabled = disabled;
    confirmOrderBtn.textContent = disabled
        ? "メニューを選んでください"
        : "注文を確定する";
}



/* グローバル公開（HTML用） */
window.openOrderModal = () => {
    resetOrderMessage();
    updateUI();
    openModal(orderModal);
};

window.closeOrderModal = () => {
    removeZeroQtyItems();
    updateUI();
    closeModal(orderModal);
};

window.confirmOrder = function () {
    saveOrderHistory();
    updateUI();

    orderTitleEl.textContent = "できあがりまで少々お待ちください";
    confirmOrderBtn.textContent = "注文が完了しました!";
    confirmOrderBtn.disabled = true;

    setTimeout(() => {
        closeModal(orderModal);
        resetOrderMessage();
        updateConfirmOrderButton();
    }, 2000);
};

window.confirmCheck = function () {
    historyTitleEl.textContent = "またのご来店お待ちしております";
    confirmCheckBtn.textContent = "お支払いが完了しました!";
    confirmCheckBtn.disabled = true;

    // 一時的に操作無効化
    document.body.inert = true;

    setTimeout(() => {
        document.body.inert = false;
        window.location.href = "people.html";
    }, 3000);
};

function resetOrderMessage() {
    orderTitleEl.textContent = "注文内容の確認";
}

window.openCheckModal = () => {
    renderOrderHistory(orderHistoryEl, orderTotalEl);
    openModal(checkModal);
};

window.closeCheckModal = () => closeModal(checkModal);