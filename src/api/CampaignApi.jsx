import axios from 'axios';

const Campaign_URL = 'http://localhost:8080/api/campaigns';
const Category_URL = 'http://localhost:8080/api/categories';



// 캠페인 목록 뽑아오는
export const axiosCampaignData = async () => {
    try {
        const response = await axios.get(Campaign_URL);
        return response.data; // json형식으로
    } catch (error) {
        console.error('Error fetching campaign data:', error);
        throw error;
    } 
};

export const axioscategoryData = {
    // Category1 목록 조회
    async getCategory1List() {
        try {
            const response = await axios.get(Category_URL+'/category1');
            return response.data;
        } catch (error) {
            console.error('Error in getCategory1List:', error);
            throw error;
        }
    },

    // Category2 목록 조회
    async getCategory2List(category1Id) {
        try {
            if (!category1Id) return [];
            return await axios.get(Category_URL+`/category2/${category1Id}`);
        } catch (error) {
            console.error('Error in getCategory2List:', error);
            throw error;
        }
    }
};