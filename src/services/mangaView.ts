import axios from "axios";

const EPISODE_URL = '/episode/getEpisodeList';

interface params {
    book_id: number,
    chapter_id: number,
    page_size: number,
    current_page: number,
}

export async function getEpisode(params: params) {
    return axios.get(EPISODE_URL, {
        params
    });
}

export default {
    getEpisode,
};
