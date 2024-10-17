import React from 'react';
import CampaignTable from '../components/CampaginTable';

const CampaignManagementPage = () => {
    return (
        <div className="campaign-management-page">
            <h1>캠페인 관리</h1>
            <CampaignTable />
        </div>
    );
};

export default CampaignManagementPage;