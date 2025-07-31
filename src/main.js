import axios from 'axios';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const loadMoreButton = document.querySelector(".js-load-more");
const perPage = 15;

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let totalPages = 0;

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

async function handleSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();


  try {
    const data = await getImagesByQuery(currentQuery, currentPage = 1);
    totalHits = data.totalHits;
    const totalPages = Math.ceil(data.totalHits / perPage);
    
      if (data.hits.length === 0) {
        iziToast.info({
          message: 'No images found. Try a different search term.',
          position: 'topRight',
        });
        return;
    } 
    
    createGallery(data.hits);
    

        if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
        }
      } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
  
  async function handleLoadMore() {
    currentPage++;
    showLoader();
   
 try {
 const data = await getImagesByQuery(currentQuery, currentPage);
   createGallery(data.hits);

   
   
    
if (currentPage >= totalPages) {
      hideLoadMoreButton();
}
   
   const card = document.querySelector(".gallery-item");
   if (card) {
     const cardHeight = card.getBoundingClientRect().height;

     window.scrollBy({
       left: 0,
       top: cardHeight * 2,
       behavior: "smooth",
     });
   }

   
  } catch (error) {
   iziToast.error({
     message: error.message,
     position: 'topRight',
   });
  } finally {
    hideLoader();
  }
}

