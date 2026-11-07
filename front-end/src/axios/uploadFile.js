import axiosClient from './apiClient'


//get the file upload and wrap it in formData
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axiosClient.post('/api/summary', formData);
        return response.data

    } catch (error) {
        console.error(error);
    }

    

};