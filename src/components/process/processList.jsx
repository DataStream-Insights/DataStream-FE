import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "../../styles/process/processListStyle.js";
import Loading from "../../components/Loading";

const ProcessList = ({ processes, onSelect, isDetailVisible }) => {
  // onCreate prop 제거
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredProcesses = useMemo(() => {
    return (processes || []).filter(
      (process) =>
        process.pipelineName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        process.pipelineId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [processes, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProcesses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProcesses, currentPage]);

  const totalPages = Math.ceil(filteredProcesses.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreate = () => {
    navigate("/process/create");
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTop>
          <S.Title>프로세스 관리</S.Title>
          {!isDetailVisible && (
            <S.CreateButton onClick={handleCreate}>
              <Plus size={16} />
              생성하기
            </S.CreateButton>
          )}
        </S.HeaderTop>

        <S.SearchContainer>
          <S.SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="파이프라인 이름 검색"
          />
          <S.SearchButton>
            <Search size={20} />
          </S.SearchButton>
        </S.SearchContainer>
      </S.Header>

      <S.Table>
        <thead>
          <S.TableHeader>
            <th>파이프라인 이름</th>
            <th>파이프라인 ID</th>
            <th>상태</th>
          </S.TableHeader>
        </thead>
        <tbody>
          {paginatedData.map((process) => (
            <S.TableRow
              key={process.pipelineId}
              onClick={() => onSelect(process)}
            >
              <S.TableCell>{process.pipelineName}</S.TableCell>
              <S.TableCell>{process.pipelineId}</S.TableCell>
              <S.TableCell>
                <S.StatusBadge $status={process.status}>
                  {process.status}
                </S.StatusBadge>
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

export default ProcessList;
