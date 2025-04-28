let posts = [];

function savePosts() {
    localStorage.setItem("miniInstagramPosts", JSON.stringify(posts));
}

function loadPosts() {
    const savedPosts = localStorage.getItem("miniInstagramPosts");
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
        displayPosts();
    }
}

function createPost() {
    let author = document.getElementById("author").value.trim();
    let content = document.getElementById("content").value.trim();

    if (author && content) {
        posts.unshift({ author, content, likes: 0, comments: [] });
        document.getElementById("author").value = "";
        document.getElementById("content").value = "";
        savePosts();
        displayPosts();
    } else {
        alert("Bitte Name und Beitrag ausfüllen!");
    }
}

function likePost(index) {
    posts[index].likes++;
    savePosts();
    displayPosts();
}

function addComment(index) {
    let commentText = prompt("Dein Kommentar:");
    if (commentText && commentText.trim() !== "") {
        posts[index].comments.push(commentText.trim());
        savePosts();
        displayPosts();
    }
}

function deletePost(index) {
    if (confirm("Willst du diesen Beitrag wirklich löschen?")) {
        posts.splice(index, 1);
        savePosts();
        displayPosts();
    }
}

function displayPosts() {
    let postContainer = document.getElementById("posts");
    postContainer.innerHTML = "";

    posts.forEach((post, index) => {
        let postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <h3>${post.author}</h3>
            <p>${post.content}</p>
            <div class="likes">
                ❤️ ${post.likes} Likes 
                <button onclick="likePost(${index})">Like</button>
            </div>
            <div class="comments">
                <strong>💬 Kommentare:</strong>
                ${post.comments.length === 0 ? "<p class='comment'>Noch keine Kommentare.</p>" : ""}
                ${post.comments.map(comment => `<p class="comment">– ${comment}</p>`).join("")}
                <button onclick="addComment(${index})">Kommentieren</button>
            </div>
            <div style="margin-top: 10px;">
                <button style="background:#e74c3c;" onclick="deletePost(${index})">🗑️ Löschen</button>
            </div>
        `;
        postContainer.appendChild(postElement);
    });
}

// Mini-Game Variablen
let score = 0;
let gameActive = false;
let timer;

function startGame() {
    if (gameActive) return;
    score = 0;
    gameActive = true;
    document.getElementById("gameScore").innerText = score;
    document.getElementById("clickButton").disabled = false;
    timer = setTimeout(endGame, 10000); // 10 Sekunden
}

function clickEmoji() {
    if (gameActive) {
        score++;
        document.getElementById("gameScore").innerText = score;
    }
}

function endGame() {
    gameActive = false;
    document.getElementById("clickButton").disabled = true;
    alert(`Zeit abgelaufen! Du hast ${score} Punkte erreicht.`);
}

window.onload = loadPosts;
