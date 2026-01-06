/**
 * 選択中カテゴリのメニュー描画
 * @param {*} category 
 * @param {*} menuEl 
 * @param {*} onAdd 
 */
export function renderMenu(category, menuEl, onAdd) {
    menuEl.innerHTML = "";

    category.items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>¥${item.price}</p>
            <button class="add-menu">追加</button>
        `;
        div.querySelector("button").onclick = () => onAdd(item);
        menuEl.appendChild(div);
    });
}