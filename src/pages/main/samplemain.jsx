import React from 'react';
import { useNavigate } from 'react-router-dom';

const SamplemainPage =() =>{
    const navigate = useNavigate();

    return (
        <div>
            <h1>메인 샘플</h1>

            <div>
                <button
                    onClick={() => navigate('/campaignmanagement')}
                    className="px-16 py-8 bg-blue-500 text-white rounded hover:bg-blue-600"
                >/campaignmanagement page</button>
                <br />
                <br />
                <br />
                <button
                    onClick={() => navigate('/format')}
                    className="px-16 py-8 bg-blue-500 text-white rounded hover:bg-blue-600"
                >/format page</button>
                <br />
                <br />
                <br />
                <button
                    onClick={() => navigate('/filter')}
                    className="px-16 py-8 bg-blue-500 text-white rounded hover:bg-blue-600"
                >/filter page</button>

                <button
                    onClick={() => navigate('/filtermanagement')}
                    className="px-16 py-8 bg-blue-500 text-white rounded hover:bg-blue-600"
                >/filtermanagement</button>
                
            </div>
        </div>
    );
}

export default SamplemainPage;