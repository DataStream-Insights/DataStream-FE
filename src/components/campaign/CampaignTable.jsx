import React, { useState, useMemo, useEffect } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCampaignData from "../../hooks/campaign/useCampaginData";
import * as S from "../../styles/main/tableStyle";
import Loading from "../Loading";

const CampaignTable = ({ onCreate, isDetailVisible }) => {
  const navigate = useNavigate();
  const { data, isLoading, refreshCampaigns } = useCampaignData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCreateClick = () => {
    if (onCreate) {
      onCreate();
    }
  };

  // const handleRowClick = (campaignId) => {
  //   navigate(`/format/${campaignId}/management`);
  // };

  useEffect(() => {
    if (!isDetailVisible) {
      refreshCampaigns();
    }
  }, [isDetailVisible, refreshCampaigns]);

  const filteredData = useMemo(() => {
    return (data || []).filter((campaign) =>
      Object.values(campaign).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTop>
          <S.Title>캠페인 관리</S.Title>
          <S.CreateButton onClick={handleCreateClick}>
            <Plus size={16} />
            생성하기
          </S.CreateButton>
        </S.HeaderTop>

        <S.SearchContainer>
          <S.SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="캠페인 정보"
          />
          <S.SearchButton>
            <Search size={18} />
          </S.SearchButton>
        </S.SearchContainer>
      </S.Header>

      <S.Table>
        <thead>
          <S.TableHeader>
            <th>캠페인명</th>
            <th>캠페인 ID</th>
            <th>분류1</th>
            <th>분류2</th>
            <th>상태</th>
            <th>시작일자</th>
            <th>종료일자</th>
            <th>기안부서</th>
            <th>기안자</th>
          </S.TableHeader>
        </thead>
        <tbody>
          {paginatedData.map((campaign) => (
            <S.TableRow
              key={campaign.campaignId}
              // onClick={() => handleRowClick(campaign.campaignId)}
            >
              <S.TableCell>{campaign.campaignName}</S.TableCell>
              <S.TableCell>{campaign.campaignId}</S.TableCell>
              <S.TableCell>{campaign.campaignClassification1}</S.TableCell>
              <S.TableCell>{campaign.campaignClassification2}</S.TableCell>
              <S.TableCell>{campaign.status}</S.TableCell>
              <S.TableCell>{campaign.startDate}</S.TableCell>
              <S.TableCell>{campaign.endDate}</S.TableCell>
              <S.TableCell>{campaign.department}</S.TableCell>
              <S.TableCell>{campaign.author}</S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>

      <S.PaginationContainer>
        <S.PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </S.PaginationButton>

        {Array.from({ length: totalPages }, (_, index) => (
          <S.PageNumber
            key={index + 1}
            $isActive={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </S.PageNumber>
        ))}

        <S.PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </S.PaginationButton>
      </S.PaginationContainer>
    </S.Container>
  );
};

export default CampaignTable;
