import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "../../styles/process/processListStyle.js";
import useProcess from "../../hooks/process/useProcess";
import Loading from "../Loading.jsx";

const ProcessList = ({ isDetailVisible }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useProcess();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProcesses = useMemo(() => {
    return (data.pipelines || []).filter(
      (process) =>
        process.pipelineName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        process.pipelineId?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data.pipelines, searchTerm]);

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

  //생성
  const handleCreate = () => {
    navigate("/process/create");
  };

  // 상세보기
  const handleRowClick = (process) => {
    console.log("Clicked process data:", process); // 데이터 확인용
    if (process.id !== undefined) {
      navigate(`/process/${process.id}`);
    } else {
      console.error("Process id is undefined:", process);
    }
  };

  // loading 처리
  if (loading.pipelines) {
    return <Loading />;
  }

  // error 처리
  if (error.pipelines) {
    return <div>에러 발생: {error.pipelines}</div>;
  }

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
              onClick={() => handleRowClick(process)}
              style={{ cursor: "pointer" }}
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
