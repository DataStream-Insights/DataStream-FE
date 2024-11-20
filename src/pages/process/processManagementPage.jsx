import React from "react";
import { Layout } from "../../components/Layout";
import ProcessList from "../../components/process/processList";

const ProcessManagementPage = () => {
  return (
    <Layout title="프로세스 관리">
      <ProcessList />
    </Layout>
  );
};

export default ProcessManagementPage;
