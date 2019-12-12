import axios from "axios";

class Auth {
  constructor() {
    this.paintings = axios.create({
      baseURL: "http://localhost:5000/paintings",
      withCredentials: true //<-- Goes with CORS credentials
    });
  }

  imageUpload(file) {
    console.log(file);
    return this.paintings.post("/image", file).then(({ data }) => {
      return data;
    });
  }

  getDetails(id) {
    return this.paintings.get(`/${id}`).then(({ data }) => {
      return data;
    });
  }

  postPainting(painting) {
    return this.paintings.post("/", painting).then(({ data }) => {
      return data;
    });
  }

  delete(paintingId){
    return this.paintings.delete(`/${paintingId}`)
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;