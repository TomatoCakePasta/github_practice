/**
 * モーダルを開く
 * @param {HTMLElement} modalEl 
 */
export function openModal(modalEl) {
    modalEl.classList.remove("hidden");
}

/**
 * モーダルを閉じる
 * @param {HTMLElement} modalEl 
 */
export function closeModal(modalEl) {
    modalEl.classList.add("hidden");
}