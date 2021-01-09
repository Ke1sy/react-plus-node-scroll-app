import axios from "axios";
import { RequestPhotosType } from "../types/types";

export const photosAPI = {
    getPhotos: ({type, page, text, maxDate}:RequestPhotosType) => {
        return axios.get(`/api/photos?type=${type}&page=${page}&text=${text}&maxDate=${maxDate}`)
            .then(response => response.data)
    },
};
