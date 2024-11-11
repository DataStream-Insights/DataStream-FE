import React, { useState, useMemo } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "../../styles/format/formatListStyle";
import { Layout } from "../Layout";

const LogFormatList = ({
  onSelect,
  onCreate,
  isDetailVisible,
  formats,
  loadFormatDetail,
}) => {
  // 상태 관리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 7; // 한 페이지당 표시할 항목 수

  console.log("Received formats:", formats);

  /**
   * - 이름, ID, 설명 필드에서 검색어를 포함하는 항목만 필터링
   * - 대소문자 구분 없이 검색
   * - useMemo를 사용하여 검색어가 변경될 때만 재계산
   */
  // formats에 초기값 설정 (formats || [])
  const filteredFormats = useMemo(() => {
    return (formats || []).filter(
      (format) =>
        format.formatName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        format.formatId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        format.formatexplain?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [formats, searchTerm]);

  /**
   * 현재 페이지에 표시될 데이터 계산
   * - 필터링된 전체 데이터에서 현재 페이지에 해당하는 부분만 잘라서 반환
   * - filteredFormats나 currentPage가 변경될 때만 재계산
   */
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFormats.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFormats, currentPage]);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredFormats.length / itemsPerPage);

  /**
   * 검색어 변경 핸들러
   * - 검색어 상태를 업데이트
   * - 검색 시 첫 페이지로 이동 (페이지네이션 리셋)
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFormatSelect = async (format) => {
    try {
      console.log("Format selected:", format); // 선택된 format 데이터 확인
      await loadFormatDetail(format.id);
      console.log("Detail loaded, calling onSelect"); // loadFormatDetail 완료 확인
      onSelect(format);
    } catch (error) {
      console.error("Failed to load format detail:", error);
    }
  };

  return (
    <Layout title="포맷 관리">
      <S.Container>
        <S.Header>
          <S.HeaderTop>
            <S.Title>Data Format 정의</S.Title>
            {!isDetailVisible && (
              <S.CreateButton onClick={onCreate}>
                <Plus size={16} />
                생성하기
              </S.CreateButton>
            )}
          </S.HeaderTop>
          <S.SubTitle>Log Format 관리</S.SubTitle>

          <S.SearchContainer>
            <S.SearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Format 명"
            />
            <S.SearchButton>
              <Search size={20} />
            </S.SearchButton>
          </S.SearchContainer>
        </S.Header>

        <S.Table>
          <thead>
            <S.TableHeader>
              <th>Format 명</th>
              <th>Format ID</th>
            </S.TableHeader>
          </thead>
          <tbody>
            {paginatedData.map((format) => (
              <S.TableRow
                key={format.id}
                onClick={() => handleFormatSelect(format)}
              >
                <S.TableCell>{format.formatName}</S.TableCell>
                <S.TableCell>
                  <div className="id-cell">
                    {format.formatId}
                    <span className="description">{format.formatexplain}</span>
                  </div>
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
    </Layout>
  );
};

export default LogFormatList;
