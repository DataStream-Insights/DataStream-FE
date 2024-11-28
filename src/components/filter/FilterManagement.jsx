import React, { useState, useMemo, useEffect } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import useFilterData from "../../hooks/filter/useFilterData";
import * as S from "../../styles/main/tableStyle";
import Loading from "../../components/Loading";

const FilterManagement = ({ onSelect, onCreate, isDetailVisible }) => {
  const { campaignId, formatId } = useParams();
  const { data, isLoading, loadFilters } = useFilterData();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCreateClick = () => {
    if (onCreate) {
      onCreate();
    }
  };

  const handleRowClick = (filter) => {
    if (onSelect) {
      onSelect(filter);
    }
  };

  useEffect(() => {
    loadFilters();
  }, [loadFilters, isDetailVisible]);

  const filteredData = useMemo(() => {
    return (data || []).filter(
      (filter) =>
        filter.filterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        filter.filterManageId?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <S.Title>필터 관리</S.Title>
          {!isDetailVisible && (
            <S.CreateButton onClick={handleCreateClick}>
              <Plus size={16} />
              생성하기
            </S.CreateButton>
          )}
        </S.HeaderTop>

        <S.SearchContainer>
          <S.SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="필터링명 검색"
          />
          <S.SearchButton>
            <Search size={20} />
          </S.SearchButton>
        </S.SearchContainer>
      </S.Header>

      <S.Table>
        <thead>
          <S.TableHeader>
            <th>필터링명</th>
            <th>필터 ID</th>
          </S.TableHeader>
        </thead>
        <tbody>
          {paginatedData.map((filter) => (
            <S.TableRow
              key={filter.filterManageId}
              onClick={() => handleRowClick(filter)}
            >
              <S.TableCell>{filter.filterName}</S.TableCell>
              <S.TableCell>
                <div className="id-cell">{filter.filterManageId}</div>
              </S.TableCell>
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

export default FilterManagement;
