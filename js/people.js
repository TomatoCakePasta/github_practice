let adultCount = 0;
let childCount = 0;

let adultEl = document.getElementById("adult");
let childEl = document.getElementById("child");
let startBtnEl = document.getElementById("start-button");

function addCount(type) {
    if (type === "adult") {
        adultCount = Math.max(0, adultCount + 1);
        adultEl.textContent = adultCount;
    }
    else if (type === "child") {
        childCount = Math.max(0, childCount + 1);
        childEl.textContent = childCount;
    }

    updateStartButton();
}

function subCount(type) {
    if (type === "adult") {
        adultCount = Math.max(0, adultCount - 1);
        adultEl.textContent = adultCount;
    }
    else if (type === "child") {
        childCount = Math.max(0, childCount - 1);
        childEl.textContent = childCount;
    }

    updateStartButton();
}

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

function startOrder() {
    // 人数を保存（index.html で使用可能）
    localStorage.setItem("adult", adultCount);
    localStorage.setItem("child", childCount);

    // 自動遷移
    window.location.href = "index.html";
}