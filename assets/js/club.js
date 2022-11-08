const image_input = document.querySelector("#club-img");
image_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        document.getElementById("display-image").src = uploaded_image;
    });
    reader.readAsDataURL(this.files[0]);
});