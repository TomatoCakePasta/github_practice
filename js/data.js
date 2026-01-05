// js/data.js

export const MENU_DATA = {
    categories: [
        {
            id: "food",
            name: "フード",
            items: [
                {
                    id: "steak",
                    name: "ステーキ",
                    price: 800,
                    image: "images/menus/steak.png"
                },
                {
                    id: "curry",
                    name: "カレー",
                    price: 700,
                    image: "images/menus/curry.png"
                }
            ]
        },
        {
            id: "drink",
            name: "ドリンク",
            items: [
                {
                    id: "cola",
                    name: "コーラ",
                    price: 300,
                    image: "images/menus/cola.png"
                },
                {
                    id: "coffee",
                    name: "コーヒー",
                    price: 350,
                    image: "../images/menus/coffee.png"
                }
            ]
        }
    ]
};
