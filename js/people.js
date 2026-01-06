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
        // adultCountの値を1つ増やす
        adultCount = Math.max(0, adultCount + 1);

        // adultConutの値をページに反映させる
        adultEl.textContent = adultCount;
    }
    else if (type === "child") {
        // childCountの値を1つ増やす
        childCount = Math.max(0, childCount + 1);

        // childConutの値をページに反映させる
        childEl.textContent = childCount;
    }

    updateStartButton();
}

function subCount(type) {
    if (type === "adult") {
        // adultCountの値を1つ減らす
        adultCount = Math.max(0, adultCount - 1);

        // adultConutの値をページに反映させる
        adultEl.textContent = adultCount;
    }
    else if (type === "child") {
        // childCountの値を1つ減らす
        childCount = Math.max(0, childCount - 1);

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

    // 自動遷移
    window.location.href = "index.html";
}