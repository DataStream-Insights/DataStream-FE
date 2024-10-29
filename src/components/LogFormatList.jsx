import React, { useState, useMemo } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "../styles/format/formatListStyle";

/**
 * LogFormatList 컴포넌트
 * 로그 포맷 목록을 표시하고 검색, 페이지네이션 기능 제공
 *
 * @param {Function} onSelect - 포맷 선택 시 호출될 콜백 함수
 * @param {Function} onCreate - 새 포맷 생성 버튼 클릭 시 호출될 콜백 함수
 * @param {boolean} isDetailVisible - 상세 보기 패널의 표시 여부
 */
const LogFormatList = ({ onSelect, onCreate, isDetailVisible }) => {
  // 상태 관리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const itemsPerPage = 7; // 한 페이지당 표시할 항목 수

  // 샘플 데이터 - 실제 구현 시 API로 대체될 예정
  const sampleFormats = [
    { id: "1064376", name: "App Save Test", description: "App Save Test" },
    { id: "1064371", name: "App Test 000001", description: "App Test 000001" },
    { id: "1218116", name: "ArrayLog_Test", description: "" },
    { id: "1220612", name: "ArrayLog_Test_2", description: "" },
    { id: "1075862", name: "EAI 테스트", description: "EAI 테스트" },
    { id: "1081804", name: "EAI 테스트22", description: "22" },
    { id: "1217815", name: "LOCA GA3 FORMAT", description: "LOCA GA3 FORMAT" },
    { id: "1239302", name: "테스트", description: "테스트" },
    { id: "1084804", name: "EAI 테스트33", description: "33" },
    { id: "1217415", name: "FORMAT", description: "FORMAT" },
  ];

  /**
   * - 이름, ID, 설명 필드에서 검색어를 포함하는 항목만 필터링
   * - 대소문자 구분 없이 검색
   * - useMemo를 사용하여 검색어가 변경될 때만 재계산
   */
  const filteredFormats = useMemo(() => {
    return sampleFormats.filter(
      (format) =>
        format.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        format.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        format.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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

  /**
   * 페이지 변경 핸들러
   * - 페이지 번호의 유효성을 확인하고 현재 페이지 상태를 업데이트
   * @param {number} pageNumber - 이동할 페이지 번호
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <S.Container>
      {/* 헤더 섹션: 타이틀과 생성 버튼 */}
      <S.Header>
        <S.HeaderTop>
          <S.Title>Data Format 정의</S.Title>
          {/* 상세 보기가 표시되지 않을 때만 생성 버튼 표시 */}
          {!isDetailVisible && (
            <S.CreateButton onClick={onCreate}>
              <Plus size={16} />
              생성하기
            </S.CreateButton>
          )}
        </S.HeaderTop>
        <S.SubTitle>Log Format 관리</S.SubTitle>

        {/* 검색 섹션 */}
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

      {/* 데이터 테이블 */}
      <S.Table>
        <thead>
          <S.TableHeader>
            <th>Format 명</th>
            <th>Format ID</th>
          </S.TableHeader>
        </thead>
        <tbody>
          {/* 현재 페이지의 데이터만 매핑하여 표시 */}
          {paginatedData.map((format) => (
            <S.TableRow key={format.id} onClick={() => onSelect(format)}>
              <S.TableCell>{format.name}</S.TableCell>
              <S.TableCell>
                <div className="id-cell">
                  {format.id}
                  <span className="description">{format.description}</span>
                </div>
              </S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>

      {/* 페이지네이션 UI */}
      <S.PaginationContainer>
        {/* 이전 페이지 버튼 */}
        <S.PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </S.PaginationButton>

        {/* 페이지 번호 버튼들 */}
        {Array.from({ length: totalPages }, (_, index) => (
          <S.PageNumber
            key={index + 1}
            $isActive={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </S.PageNumber>
        ))}

        {/* 다음 페이지 버튼 */}
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

export default LogFormatList;
