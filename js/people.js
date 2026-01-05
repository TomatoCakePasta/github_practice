let adultCount = 0;
let childCount = 0;

let adultEl = document.getElementById("adult");
let childEl = document.getElementById("child");

function changeCount(type, delta) {
    if (type === "adult") {
        adultCount = Math.max(0, adultCount + delta);
        adultEl.textContent = adultCount;
    } else {
        childCount = Math.max(0, childCount + delta);
        childEl.textContent = childCount;
    }
}

function addCount(type) {
    if (type === "adult") {
        adultCount = Math.max(0, adultCount + 1);
        adultEl.textContent = adultCount;
    }
    else if (type === "child") {
        childCount = Math.max(0, childCount + 1);
        childEl.textContent = childCount;
    }
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
}

function startOrder() {
    // 人数を保存（index.html で使用可能）
    localStorage.setItem("adult", adultCount);
    localStorage.setItem("child", childCount);

    // 自動遷移
    window.location.href = "index.html";
}