
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("puzzle");
    const message = document.getElementById("message");
    const size = 3;
    const total = size * size;
    const order = [...Array(total).keys()];
    const correct = [...order];

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    function createTile(index) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.draggable = true;
        tile.dataset.index = index;
        const row = Math.floor(index / size);
        const col = index % size;
        tile.style.backgroundImage = "url('images/love1.jpg')";
        tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        return tile;
    }

    function init() {
        shuffle(order);
        order.forEach(i => container.appendChild(createTile(i)));
    }

    let dragged;

    container.addEventListener("dragstart", e => {
        if (e.target.classList.contains("tile")) {
            dragged = e.target;
        }
    });

    container.addEventListener("dragover", e => e.preventDefault());

    container.addEventListener("drop", e => {
        if (e.target.classList.contains("tile") && e.target !== dragged) {
            const from = [...container.children].indexOf(dragged);
            const to = [...container.children].indexOf(e.target);
            container.insertBefore(dragged, container.children[to]);
            container.insertBefore(e.target, container.children[from]);
            checkWin();
        }
    });

    function checkWin() {
        const tiles = [...container.children];
        const current = tiles.map(t => parseInt(t.dataset.index));
        if (current.every((v, i) => v === correct[i])) {
            message.style.display = "block";
        }
    }

    init();
});
