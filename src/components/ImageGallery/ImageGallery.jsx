import PropTypes from 'prop-types';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ photos, showModal }) {
  return (
    <>
      <ul className="ImageGallery">
        {photos.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              tags={tags}
              largeImage={largeImageURL}
              showModal={() => showModal(largeImageURL)}
            />
          );
        })}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};
