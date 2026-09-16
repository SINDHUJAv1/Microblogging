let postCount = 1;


/* CREATE NEW POST */

function createPost() {

    const captionInput =
        document.getElementById("captionInput");

    const imageInput =
        document.getElementById("imageInput");


    const caption =
        captionInput.value.trim();


    if (caption === "") {

        alert("Please enter a caption");

        return;
    }


    const post =
        document.createElement("div");

    post.classList.add("post");


    let imageHTML = "";


    /* IMAGE UPLOAD */

    if (imageInput.files.length > 0) {

        const imageURL =
            URL.createObjectURL(imageInput.files[0]);


        imageHTML = `
            <img
                src="${imageURL}"
                class="post-image"
                alt="User Post">
        `;
    }


    /* CREATE POST HTML */

    post.innerHTML = `

        <div class="post-header">

            <div class="user-info">

                <div class="avatar">
                    U
                </div>

                <strong>User</strong>

            </div>

            <i class="fa-solid fa-ellipsis"></i>

        </div>


        ${imageHTML}


        <div class="post-actions">

            <div class="left-actions">

                <button
                    class="like-btn"
                    onclick="toggleLike(this)">

                    <i class="fa-regular fa-heart"></i>

                </button>


                <button>

                    <i class="fa-regular fa-comment"></i>

                </button>


                <button>

                    <i class="fa-regular fa-paper-plane"></i>

                </button>

            </div>


            <button
                class="save-btn"
                onclick="toggleSave(this)">

                <i class="fa-regular fa-bookmark"></i>

            </button>

        </div>


        <div class="likes">

            <span class="like-count">0</span>
            likes

        </div>


        <div class="caption">

            <strong>User</strong>

            <span>${caption}</span>

        </div>


        <div class="comments">

            <p class="view-comments">
                No comments yet
            </p>

            <div class="comment-list"></div>

        </div>


        <div class="add-comment">

            <input
                type="text"
                placeholder="Add a comment..."
                class="comment-input">


            <button
                onclick="addComment(this)">

                Post

            </button>

        </div>
    `;


    /* ADD POST TO TOP */

    document
        .getElementById("posts")
        .prepend(post);


    /* CLEAR INPUT */

    captionInput.value = "";

    imageInput.value = "";


    /* UPDATE POST COUNT */

    postCount++;

    document
        .getElementById("postCount")
        .innerText = postCount;
}



/* LIKE / UNLIKE */

function toggleLike(button) {

    const post =
        button.closest(".post");


    const likeCount =
        post.querySelector(".like-count");


    let likes =
        parseInt(likeCount.innerText);


    const icon =
        button.querySelector("i");


    if (button.classList.contains("liked")) {


        /* UNLIKE */

        likes--;

        button.classList.remove("liked");


        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");


    } else {


        /* LIKE */

        likes++;

        button.classList.add("liked");


        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

    }


    likeCount.innerText = likes;
}



/* SAVE POST */

function toggleSave(button) {

    const icon =
        button.querySelector("i");


    if (icon.classList.contains("fa-regular")) {

        icon.classList.remove("fa-regular");

        icon.classList.add("fa-solid");

    } else {

        icon.classList.remove("fa-solid");

        icon.classList.add("fa-regular");

    }

}



/* ADD COMMENT */

function addComment(button) {

    const post =
        button.closest(".post");


    const input =
        post.querySelector(".comment-input");


    const commentText =
        input.value.trim();


    if (commentText === "") {

        return;

    }


    const commentList =
        post.querySelector(".comment-list");


    const comment =
        document.createElement("p");


    comment.classList.add("comment");


    comment.innerHTML =
        `<strong>User</strong> ${commentText}`;


    commentList.appendChild(comment);


    input.value = "";


    /* UPDATE COMMENT MESSAGE */

    const viewComments =
        post.querySelector(".view-comments");


    const count =
        commentList.children.length;


    viewComments.innerText =
        count + " comment" +
        (count > 1 ? "s" : "");

}