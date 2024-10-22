import axios from 'axios';

const API_URL = 'http://localhost:8080/api/campaigns';

export const fetchCampaignData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // json형식으로
    } catch (error) {
        console.error('Error fetching campaign data:', error);
        throw error;
    } 
};

const useCategoryData = () => {
    const [categories, setCategories] = useState({
        category1: [],
        category2: []
    });
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories'); // 실제 API 엔드포인트로 변경 필요
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching campaign data:', error);
                throw error;
            }
        };

        fetchCategories();
    }, []);

    return { categories, error};
};