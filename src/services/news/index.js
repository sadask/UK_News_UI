import axios from "axios";
import { newsUrl, newsSearchUrl } from "../../config";

export const getLatestNews = async () => {
    try {
        let response = await axios.get(newsUrl);
        return response.data;
    } catch (e) {
        throw new Error();
    }
}


export const searchNewsByKeyword = async (keyword) => {
    try {
        let response = await axios.get(newsSearchUrl, { params: { keyword } });
        return response.data;
    } catch (e) {
        throw new Error();
    }
}