import PropTypes from 'prop-types';

export default function ImageGalleryItem({ largeImage, url, tags, showModal }) {
  return (
    <li className="ImageGalleryItem" onClick={() => showModal(largeImage)}>
      <img className="ImageGalleryItem-image" src={url} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImage: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
