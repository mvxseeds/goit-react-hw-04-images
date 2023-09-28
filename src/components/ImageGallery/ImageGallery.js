import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';

import Loader from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import api from 'services/pixabay-api';

export default class ImageGallery extends Component {
  state = {
    data: null,
    error: null,
    page: 1,
    status: 'idle',
    scrollPosition: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log(this.state.scrollPosition, typeof(this.state.scrollPosition));
    window.scrollTo(0, this.state.scrollPosition);

    const prevQuery = prevProps.query;
    const query = this.props.query;
    const prevPage = prevState.page;
    const page = this.state.page;

    if (prevQuery !== query) {
      this.setState({ status: 'pending', page: 1, scrollPosition: 0 });
      const parsedData = await this.loadImages(query, page);

      if (parsedData) {
        this.setState({ data: parsedData, status: 'resolved' });
      }
    }

    if (prevPage !== page) {
      // replace this + conditional rendering with specific state (resolved - last page) ?
      if (page === 'last') {
        return;
      }

      this.setState({ status: 'pending' });
      const parsedData = await this.loadImages(query, page);

      if (parsedData) {
        this.setState(state => ({
          data: [...state.data, ...parsedData],
          status: 'resolved',
        }));
      }
    }
  }

  async loadImages(query, page) {
    try {
      const data = await api.getImages(query, page);

      if (data.totalHits < page * 12) {
        this.setState({ page: 'last' });
      }

      return data.hits.map(({ id, webformatURL, largeImageURL }) => {
        return { id, webformatURL, largeImageURL };
      });
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  }

  onLoadMore() {
    this.setState({
      page: this.state.page + 1,
      scrollPosition: window.pageYOffset,
    });
  }

  render() {
    const { data, page, error, status } = this.state;

    if (status === 'idle') {
      return;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }

    if (status === 'resolved') {
      return (
        <>
          <Gallery>
            {data.map(({ id, webformatURL, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  previewUrl={webformatURL}
                  imageUrl={largeImageURL}
                />
              );
            })}
          </Gallery>
          {!(page === 'last') && <Button onClick={() => this.onLoadMore()} />}
        </>
      );
    }
  }
}
