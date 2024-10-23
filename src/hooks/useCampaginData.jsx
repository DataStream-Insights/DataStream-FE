import { useState, useEffect } from 'react';
import { axiosCampaignData } from '../api/CampaignApi.jsx';

const useCampaignData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const campaignData = await axiosCampaignData();
                setData(campaignData);
            } catch (error) {
                console.error('Failed to fetch campaign data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return { data, isLoading };
};

export default useCampaignData;