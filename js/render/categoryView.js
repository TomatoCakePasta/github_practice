export function renderCategories(categories, containerEl, onSelect) {
    containerEl.innerHTML = "";

    categories.forEach(category => {
        const div = document.createElement("div");
        div.className = "category";
        div.textContent = category.name;
        div.onclick = () => onSelect(category);
        containerEl.appendChild(div);
    });
}

/**
 * 選択中のカテゴリを強調
 * @param {string} categoryName 選択中のカテゴリ名
 */
export function updateActiveCategory(categoryName) {
    document.querySelectorAll(".category").forEach(el => {
        el.classList.toggle("active", el.textContent === categoryName);
    });
}