import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { PixabayPlug } from 'components/PixabayPlug/PixabayPlug';
import FindError from 'components/FindError/FindError';
import { IsLoading } from 'components/IsLoading/IsLoading';
import { fetchPhotos } from 'services/pixabay-api';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [photoList, setPhotoList] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function fetchImages() {
      try {
        const nextPhotos = await fetchPhotos(searchQuery, page);

        if (nextPhotos.hits.length === 0) {
          setStatus('rejected');
        } else {
          const totalPage = Math.ceil(nextPhotos.totalHits / 12);

          setPhotoList(prev => [...prev, ...nextPhotos.hits]);
          setStatus('resolved');
          setIsShowBtn(page !== totalPage);
          setIsShowModal(false);
        }

        if (page !== 1) {
          handleScrollToBottom();
        }
      } catch (error) {
        setError('Sorry, search error. Try reloading the page!');
        setStatus('');
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    fetchImages();
  }, [searchQuery, page]);

  const handleScrollToBottom = () => {
    scroll.scrollToBottom();
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPhotoList([]);
    setPage(1);
    setIsShowBtn(false);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleShowLargeImg = largeImage => {
    setLargeImage(largeImage);
    setIsShowModal(true);
  };

  const togleModal = () => {
    setIsShowModal(prev => !prev);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'idle' && <PixabayPlug />}
      {status === 'rejected' && <FindError />}
      <ImageGallery photos={photoList} showModal={handleShowLargeImg} />
      {error && <h1 style={{ margin: '0 auto' }}>{error}</h1>}
      {isLoading && <IsLoading />}
      {isShowBtn && <Button load={handleLoadMore} />}
      {isShowModal && <Modal togleModal={togleModal} largeImage={largeImage} />}
      <ToastContainer autoClose={2000} />
    </div>
  );
}
