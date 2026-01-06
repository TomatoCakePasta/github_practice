let adultCount = 0;
let childCount = 0;

/* =========================
   Elements
========================= */
let adultEl = document.getElementById("adult");
let childEl = document.getElementById("child");
let startBtnEl = document.getElementById("start-button");

/* =========================
   Count Control
========================= */
function addCount(type) {
    if (type === "adult") {
        /*  =========================
            F. 実装タスク: 人数追加機能 
            adultCountの値を1つ増やすコードを書いてください
            1行かけます
        ========================= */

        // adultConutの値をページに反映させる
        adultEl.textContent = adultCount;
    }
    else if (type === "child") {
        /*  =========================
            F. 実装タスク: 人数追加機能 
            childCountの値を1つ増やすコードを書いてください
            1行でかけます
        ========================= */

        // childConutの値をページに反映させる
        childEl.textContent = childCount;
    }

    updateStartButton();
}

function subCount(type) {
    if (type === "adult") {
        /*  =========================
            G. 実装タスク: 人数修正機能 
            adultCountの値を1つ減らすコードを書いてください
            負の数になる場合は0を代入すること
            Mathを使うと1行でもかけます
        ========================= */

        // adultConutの値をページに反映させる
        adultEl.textContent = adultCount;
    }
    else if (type === "child") {
        /*  =========================
            G. 実装タスク: 人数修正機能 
            childCountの値を1つ増やすコードを書いてください
            負の数になる場合は0を代入すること
            Mathを使うと1行でもかけます
        ========================= */

        // childConutの値をページに反映させる
        childEl.textContent = childCount;
    }

    updateStartButton();
}

/* =========================
   UI Update
========================= */
function updateStartButton() {
    const total = adultCount + childCount;

    if (total < 1) {
        startBtnEl.textContent = "人数を入力してください";
        startBtnEl.disabled = true;
    }
    else {
        startBtnEl.textContent = "注文を開始する"
        startBtnEl.disabled = false;
    }
}

/* =========================
   Start Order
========================= */
function startOrder() {
    // 人数を保存（index.html で使用可能）
    localStorage.setItem("adult", adultCount);
    localStorage.setItem("child", childCount);

    /* =========================
        I. 実装タスク: ページ遷移機能
        index.htmlページに遷移するコードを書いてください
        1行でかけます
    ========================= */

}