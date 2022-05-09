document.addEventListener('DOMContentLoaded', function () {

    const screenWidth = window.screen.width;

    const post = document.querySelector('.post');
    const postImgs = post.querySelectorAll('img.shadow');

    for (const postImg of postImgs) {
        postImg.parentElement.style.padding = screenWidth <= 670 ? '0 0.72rem' : '0 1.5rem';
    }

});