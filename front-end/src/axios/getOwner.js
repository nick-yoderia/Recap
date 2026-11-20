import axiosClient from './apiClient'

let ownerRequest = null;

export const getOwner = () => {
    if (!ownerRequest) {
        ownerRequest = axiosClient.get('/api/owner')
            .then((response) => response.data)
            .catch((error) => {
                ownerRequest = null;
                console.error("Error fetching owner", error);
            });
    }
    return ownerRequest;
};
