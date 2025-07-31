import axios from 'axios';

const API_KEY = '51414805-32578d6fb6ee3cb7948c7bdf3';


export async function getImagesByQuery(query, page = 1) {
    const { data } = await axios('https://pixabay.com/api/', {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 15,
        },
    });
    return data;
}
