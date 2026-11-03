import {axiosClient} from './apiClient';

async function getData() {
    try {
        const response = await axiosClient.get('server_api');
        return response.data;

    } catch (error) {
        console.error(error.response.data.message);
    }
}


