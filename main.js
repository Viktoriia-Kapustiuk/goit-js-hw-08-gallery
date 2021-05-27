import imageArray from "./gallery-items.js"

console.log(imageArray[3].preview);

const gallery = document.querySelector('.js-gallery'),

    modalBox = document.querySelector('.js-lightbox'),

    image = document.querySelector('.lightbox__image'),

    closeModalBtn = document.querySelector("button[data-action='close-lightbox']"),

    overlay = document.querySelector('.lightbox__overlay');


gallery.insertAdjacentHTML('afterbegin', createGallery(imageArray));

function createGallery(imageArray) {
    return imageArray.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}"
 alt="${description}"></a></li>`;
        
    }).join('');
}

gallery.addEventListener('click', onClickImgOpen);
closeModalBtn.addEventListener('click', onClickCloseModal);
overlay.addEventListener('click', onClickOverlayClose);
window.addEventListener('keydown', onClickEscClose);

function onClickImgOpen(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const imgEl = event.target;
    image.src = imgEl.dataset.source;
    image.alt = imgEl.alt;

    modalBox.classList.add('is-open');

}

function onClickCloseModal(event) {
   modalBox.classList.remove('is-open');
}

function onClickOverlayClose(e) {
    if (e.target === e.currentTarget) {
        onClickCloseModal();
    }
    image.src = "";
    image.alt = "";
}

function onClickEscClose(e) {
    if (e.key === 'Escape') {
        onClickCloseModal();
    }
}

document.addEventListener('keydown', (e) => {

    let newIndex = imageArray.indexOf(image.src);
    if (e.key === 'ArrowLeft') {
        newIndex -= 1;
        if (newIndex === -1) {
            newIndex = imageArray.length - 1;
        }
    } else if (e.key === 'ArrowRight') {
        newIndex += 1;
        if (newIndex === imageArray.length) {
            newIndex = 0;
        }
    }
    image.src = imageArray[newIndex];
});