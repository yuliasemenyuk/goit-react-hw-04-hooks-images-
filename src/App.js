import {useState, useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import getAPI from "./services/API";
import "react-toastify/dist/ReactToastify.css";

export default function App () {
    const [imageName, setImageName] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

  useEffect(() => {
    if (imageName === "") {
      return
    }
    setLoading(true);

    getAPI(imageName, page).then((res) => {
      const NewImages = res.data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => {
          return { id, tags, webformatURL, largeImageURL };
        }
      );

      if (NewImages.length === 0) {
        setLoading(false);
        return toast.error("There is no picture with that name!");
      }

      setImages((prevImages) => [...prevImages, ...NewImages]);
      setLoading(false);
    })
  }, [page, imageName]);

  const handleFormSubmit = (imageName) => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  const loadMoreBtn = () => {
    setPage((page) => page + 1)
    }

    return (
        <div>
          <Searchbar onSubmit={handleFormSubmit} />
          {images.length > 0 && <ImageGallery images={images} />}
          {loading ? (
            <Loader />
          ) : (
            images.length > 0 &&
            images.length % 12 === 0 && <Button more={loadMoreBtn} />
          )}
          <ToastContainer autoClose={2000} />
        </div>
      );
  }