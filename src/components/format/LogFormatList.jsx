import React, { useState, useMemo } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "../../styles/format/formatListStyle";
import { Layout } from "../Layout";
import { useParams } from "react-router-dom";
import useLogFormat from "../../hooks/format/useFormatData";
import LogFormatDetail from "./LogFormatDetail";

const LogFormatList = ({ formats, onSelect, onCreate, isDetailVisible }) => {
  const { campaignId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredFormats = useMemo(() => {
    return (formats || []).filter(
      (format) =>
        format.formatName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        format.formatId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        format.formatexplain?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [formats, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFormats.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFormats, currentPage]);

  const totalPages = Math.ceil(filteredFormats.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
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
            <S.TableRow key={format.id} onClick={() => onSelect(format)}>
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
  );
};

export default LogFormatList;
