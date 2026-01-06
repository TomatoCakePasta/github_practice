/* =========================
   外部ファイルに定義した関数などを読み込む
========================= */
import { MENU_DATA } from "./data.js";
import { cartState } from "./state/cartState.js";
import { addItemToCart, addQty, subQty, removeZeroQtyItems } from "./actions/cartActions.js";
import { saveOrderHistory } from "./actions/orderActions.js";
import { renderCategories, updateActiveCategory } from "./render/categoryView.js";
import { renderMenu } from "./render/menuView.js";
import { renderCart, renderOrderList } from "./render/cartView.js";
import { renderOrderHistory } from "./render/historyView.js";
import { openModal, closeModal } from "./ui/modal.js";

/* =========================
   DOM参照 (HTMLのクラス名を指定して要素を取得する)
========================= */
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

// 注文内容の確認画面テキスト描画範囲
const orderTitleEl = document.getElementById("order-title");
// 会計画面テキスト描画範囲
const historyTitleEl = document.getElementById("history-title");
// 注文確定ボタン要素
const confirmOrderBtn = document.getElementById("confirm-button");
// ご精算ボタン要素
const confirmCheckBtn = document.getElementById("confirm-check-button");

// 注文確認モーダル
const orderModal = document.getElementById("order-modal");
// 会計モーダル
const checkModal = document.getElementById("check-modal");

/* =========================
   初期化
========================= */
cartState.selectedCategory = MENU_DATA.categories[0];
// カテゴリの描画
renderCategories(MENU_DATA.categories, categoriesEl, selectCategory);
// 選択中のカテゴリのメニュー表示
selectCategory(cartState.selectedCategory);

/* =========================
   関数
========================= */
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

/**
 * カートに商品を追加
 * @param {object} item 
 */
function onAddItem(item) {
    // カートに商品を追加 (データ状態変更)
    addItemToCart(item);
    // UIを更新 (表示反映)
    updateUI();
}

/**
 * UIの更新
 */
function updateUI() {
    // カートの商品を描画
    renderCart(cartItemsEl, totalEl, counterEl);
    // 注文内容確認画面の商品を描画
    renderOrderList(orderListEl, onAddQty, onSubQty);
    // 注文確定ボタンの描画
    updateConfirmOrderButton();
}

/**
 * 選択商品の追加
 * @param {number} id 
 */
function onAddQty(id) {
    // 商品を追加
    addQty(id);
    // UIを更新
    updateUI();
}

/**
 * 選択商品の削除
 * @param {number} id 
 */
function onSubQty(id) {
    // 商品を削除
    subQty(id);
    // UIを更新
    updateUI();
}

/**
 * 商品数によって注文確定ボタンのメッセージを変更
 */
function updateConfirmOrderButton() {
    const disabled = cartState.currentOrderTotal === 0;

    confirmOrderBtn.disabled = disabled;
    confirmOrderBtn.textContent = disabled
        ? "メニューを選んでください"
        : "注文を確定する";
}



/* =========================
   グローバル公開: HTMLから呼び出す用
========================= */

/**
 * 注文確認モーダルを開く
 */
window.openOrderModal = () => {
    // ボタンメッセージの初期化
    resetOrderMessage();
    // UIの更新
    updateUI();
    // モーダルの表示
    openModal(orderModal);
};

/**
 * 注文確認モーダルを閉じる
 */
window.closeOrderModal = () => {
    // 商品数0のメニューを削除
    removeZeroQtyItems();
    // UIの更新
    updateUI();
    // モーダルを閉じる
    closeModal(orderModal);
};

/**
 * 会計モーダルを開く
 */
window.openCheckModal = () => {
    // 会計画面の描画
    renderOrderHistory(orderHistoryEl, orderTotalEl);
    // モーダルを開く
    openModal(checkModal);
};

/**
 * 会計モーダルを閉じる
 */
window.closeCheckModal = () => {
    closeModal(checkModal);
}

/**
 * 注文を確定する
 */
window.confirmOrder = function () {
    saveOrderHistory();
    updateUI();

    // 注文完了メッセージの変更
    orderTitleEl.textContent = "できあがりまで少々お待ちください";
    confirmOrderBtn.textContent = "注文が完了しました!";
    // 注文ボタンの無効化
    confirmOrderBtn.disabled = true;

    setTimeout(() => {
        closeModal(orderModal);
        resetOrderMessage();
        updateConfirmOrderButton();
    }, 2000);
};

/**
 * 会計確定 精算をする
 */
window.confirmCheck = function () {
    // 退店メッセージの変更
    historyTitleEl.textContent = "またのご来店お待ちしております";
    confirmCheckBtn.textContent = "お支払いが完了しました!";
    // 精算ボタンの無効化
    confirmCheckBtn.disabled = true;

    // 一時的に操作無効化
    document.body.inert = true;

    setTimeout(() => {
        document.body.inert = false;
        // 人数入力タイトル画面へ遷移
        window.location.href = "people.html";
    }, 3000);
};

function resetOrderMessage() {
    orderTitleEl.textContent = "注文内容の確認";
}