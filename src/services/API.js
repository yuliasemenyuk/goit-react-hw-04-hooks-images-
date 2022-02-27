import axios from "axios";

const BASE_URL = "https://pixabay.com/api";
const KEY = "24549161-d9016794db06e42eaadc07c38";

const getAPI = (imageName, page) => {
  return axios.get(
    `${BASE_URL}/?q=${imageName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default getAPI;