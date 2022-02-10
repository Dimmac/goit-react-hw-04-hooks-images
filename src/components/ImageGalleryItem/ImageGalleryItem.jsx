import PropTypes from 'prop-types';
import {GalleryItem,ImageGalleryItemImage} from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ data, largePicture }) => {
  const { webformatURL, tags, largeImageURL } = data;
  return (
    <GalleryItem onClick={() => largePicture(largeImageURL)}>
      <ImageGalleryItemImage src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  largePicture: PropTypes.func.isRequired,
};