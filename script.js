document.addEventListener("DOMContentLoaded", function () {
    console.log("Trang web đã tải xong!");

    // Tạo hiệu ứng di chuyển nền
    let background = document.querySelector(".background-animation");
    let speed = 0.02;
    let pos = 0;

    function animateBackground() {
        pos += speed;
        background.style.transform = `scale(${1 + Math.sin(pos) * 0.05})`;
        requestAnimationFrame(animateBackground);
    }
    
    animateBackground();
});
