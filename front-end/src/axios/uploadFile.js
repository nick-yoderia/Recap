import {axiosClient} from './apiClient'


//get the file upload and wrap it in formData
const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axiosClient.post('server_api', formData);
        console.log(response.data);

    } catch (error) {
        console.error(error);
    }

    

};