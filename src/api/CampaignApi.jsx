import axios from 'axios';

const API_URL = 'http://localhost:8080/api/campaigns';

export const fetchCampaignData = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('API Response:', response.data);
        return response.data; // json형식으로
    } catch (error) {
        console.error('Error fetching campaign data:', error);
        throw error;
    } 
};