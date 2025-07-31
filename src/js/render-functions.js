import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.js-load-more');


let lightbox = null;

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}"/>
            </a>
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
        </li >
        `
    )
    .join('');
  

  gallery.insertAdjacentHTML('beforeend', markup);
  loadMoreButton.classList.replace("load-more-hidden", "load-more");

    if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('load-more-hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('load-more-hidden');
}

//loadMore.addEventListener("click", onLoadMore);

//async function onLoadMore() {
//  page++;
   
//  try {
//    const data = await getImagesByQuery(page);
//    console.log(data);
    

//  } catch (error) {
//    alert(error.message);
//  }
  
//}
