
import axios from 'axios';

axios.defaults.baseURL = 'http://pixabay.com';

const getImages = async (searchQuery, page=1) => {
  const perPage = 12;

  try {
    const response = await axios.get('/api', {
      params: {
        q: searchQuery,
        page: page,
        key: '33013185-bcf0c4849b088c5c00f112ab1',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: perPage,
      },
    });

    if (response.data.total === 0) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    // } else if (response.data.totalHits < page * perPage) {
    //   throw new Error("We're sorry, but you've reached the end of search results.");
    } else {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};


/*
// FETCH API

const getImages = (searchQuery, page=1) => {
	fetch(`https://pixabay.com/api/?q=${searchQuery}&key=33013185-bcf0c4849b088c5c00f112ab1&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
		.then(res => res.json())
		.then(data => {
			// processing of empty result: {"total":0,"totalHits":0,"hits":[]}
			if (data.total === 0) {
				return Promise.reject(
					new Error(`No result found for request: ${searchQuery}`),
				);
				// this also works:
				// //throw "ErrorNoResult";
			}
			
			const parsedData = data.hits.map(({id, webformatURL, largeImageURL}) => { return { id, webformatURL, largeImageURL } });
			this.setState({ data: parsedData, status: 'resolved' })
		})
		.catch(error => this.setState({ error, status: 'rejected' }));
}
*/

const api = { getImages };

export default api;
