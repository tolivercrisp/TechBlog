const post = async (event) => {
    console.log("post")
    event.preventDefault();
    try {
        const title = document.querySelector("#postTitle").value.trim();
        const content = document.querySelector("#postContent").value.trim();
        console.log("title: " + title + " content: " + content)
        if (!title || !content) {
            alert("You must provide a title and content.");
            return;
        }
        const response = await fetch("/api/users/posts", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        });
        if (!response.ok) {
            alert("Failed to post.");
            return;
        }
        document.location.replace("/");
    }
    catch (error) {
        console.log(error);
    }
};
document
    .querySelector(".post-form")
    .addEventListener("submit", post);
