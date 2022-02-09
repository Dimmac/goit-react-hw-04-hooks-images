import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import {ImageGallery} from './ImageGallery.styled'
import PropTypes from 'prop-types';

const ImageGalleryPictures = ({ picture, onClick }) => {
  return (
    <ImageGallery>
      {picture.map(({ largeImageURL, webformatURL, tags }, index) => {
        return (
          <ImageGalleryItem
            key={index}
            data={{ largeImageURL, webformatURL, tags }}
            largePicture={onClick}
          />
        );
      })}
    </ImageGallery>
  );
};

export default ImageGalleryPictures;

ImageGalleryPictures.propTypes = {
  picture: PropTypes.arrayOf.isRequired,
  onClick: PropTypes.func.isRequired,
};