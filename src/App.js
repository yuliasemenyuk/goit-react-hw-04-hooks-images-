import {useState, useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import getAPI from "./services/API";
import style from "./App.css";
import "react-toastify/dist/ReactToastify.css";

export default function App ({}) {
    const [imageName, setImageName] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

//   state = {
//     imageName: "",
//     images: [],
//     loading: false,
//     page: 1,
//   };

  const searchImages = () => {
      console.log('ky');
    setLoading(true);

    getAPI(imageName, page).then((res) => {
      const images = res.data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => {
          return { id, tags, webformatURL, largeImageURL };
        }
      );

      if (images.length === 0) {
        this.setState({ loading: false });
        return toast.error("There is no picture with that name!");
      }

      setImages((newImages) => [...newImages, ...images]);
      setLoading(false);
    });
  };


  useEffect(() => {
    setImages([]);
    setPage(1);
    searchImages()
  }, [imageName, page]);
//   componentDidUpdate(prewProps, prevState) {
//     if (prevState.imageName !== this.state.imageName) {
//       this.setState({ images: [], page: 1 });
//       this.searchImages();
//     }

    // if (prevState.page !== this.state.page && this.state.page !== 1) {
    //   this.searchImages();
    // }
  
  const handleFormSubmit = (imageName) => {
    setImageName(imageName);
  };

  const loadMoreBtn = () => {
    setPage((page) => page + 1)

    // this.setState((prevState) => ({
    //   page: prevState.page + 1,
    // }))
    }

    return (
        <div className={style.App}>
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