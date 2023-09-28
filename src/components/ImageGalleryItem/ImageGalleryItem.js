import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import Modal  from '../Modal'

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = (e) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { imageUrl, previewUrl } = this.props;
    const { showModal } = this.state;

    return (
      <GalleryItem>
        <GalleryItemImage onClick={this.toggleModal} src={previewUrl} alt="image-fallback" />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={imageUrl} alt="" />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}
