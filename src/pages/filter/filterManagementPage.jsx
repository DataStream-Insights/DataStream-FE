import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import FilterManagement from "../../components/filter/FilterManagement";
import FilterDetail from "../../components/filter/FilterDetail";
import LogFilter from "../../components/filter/LogFilter";
import Loading from "../../components/Loading";
import * as S from "../../styles/filter/filterPageStyle";
import useFilterData from "../../hooks/filter/useFilterData";

const FilterManagementPage = () => {
  const { campaignId, formatId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const filterHook = useFilterData(); // 커스텀 훅 사용

  const isDetailVisible = selectedFilter || isCreating;

  const handleFilterSelect = async (filter) => {
    setSelectedFilter(filter);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setSelectedFilter(null);
    setIsCreating(true);
  };

  const handleClose = async () => {
    setSelectedFilter(null);
    setIsCreating(false);
    await filterHook.loadFilters(); // 목록 새로고침
  };

  // 전역 로딩 상태 확인
  const isLoading = filterHook.isLoading;

  return (
    <Layout>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Loading />
        </div>
      )}
      <S.Container>
        <S.ListContainer className={!isDetailVisible ? "expanded" : ""}>
          <FilterManagement
            filters={filterHook.data}
            onSelect={handleFilterSelect}
            onCreate={handleCreate}
            isDetailVisible={isDetailVisible}
            onRefresh={filterHook.loadFilters}
          />
        </S.ListContainer>
        {isDetailVisible && (
          <S.DetailContainer className="visible">
            {isCreating ? (
              <LogFilter
                onClose={handleClose}
                campaignIdProp={campaignId}
                formatIdProp={formatId}
                onSuccess={filterHook.loadFilters}
                setGlobalLoading={(loading) => filterHook.setIsLoading(loading)}
              />
            ) : (
              <FilterDetail
                isOpen={true}
                onClose={handleClose}
                filterId={selectedFilter?.id}
                setGlobalLoading={(loading) => filterHook.setIsLoading(loading)}
              />
            )}
          </S.DetailContainer>
        )}
      </S.Container>
    </Layout>
  );
};

export default FilterManagementPage;
