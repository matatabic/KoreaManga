import axios from "axios";
import {COLLECTION_URL} from "@/config/api";


export async function getCollection(params: any) {
    return axios.get(COLLECTION_URL, {
        params
    });
}


export default {
    getCollection
};
