import { useState, useEffect } from 'react';
import {categoryAPI} from '../api/CampaignApi.jsx';

const useCategoryData = () => {
    const [categories1, setcategories1] = useState([]);
    const [categories2, setcategories2] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCategory1Data = async () => {
            try {
                const response = await categoryAPI.getCategory1List();
                const parsedCategories1 = response.map(category => ({
                    id: category.id,
                    name: category.category1,
                }));
                setcategories1(parsedCategories1);
            } catch (error) {
                console.error('Failed to fetch campaign data:', error);
            } finally {
                setIsLoading(false);
            }
        };


        loadCategory1Data();
    }, []);

    const loadCategory2Data = async (category1Id) => {
        if (!category1Id) {
            setCategories2([]);
            return;
        }

        try {
            const response = await categoryAPI.getCategory2List(category1Id);
            console.log('Raw API Response:', response);
            const parsedCategories2 = response.map(category => ({
                id: category.id,
                name: category.category2,
            }));
            console.log('Category2 Data:', response.data);
            setcategories2(parsedCategories2);
        } catch (error) {
            console.error('Failed to fetch category2 data:', error);
            setcategories2([]);
        }
    };

    return { categories1,categories2, loadCategory2Data, isLoading };
};

export default useCategoryData;