import React from "react";
import FilterManagement from "../../components/filter/FilterManagement";
import { Layout } from "../../components/Layout";

const FilterManagementPage = () => {
  return (
    <Layout title="필터 관리">
      <FilterManagement />
    </Layout>
  );
};

export default FilterManagementPage;
