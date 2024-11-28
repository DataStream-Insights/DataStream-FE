import React, { useState, useMemo, useEffect } from "react";
import { Search, Plus, ChevronLeft, ChevronRight, X, Save } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import * as F from "../../styles/filter/filterStyle";
import * as S from "../../styles/filter/filterdetailStyle";
import useFilterCreate from "../../hooks/filter/useFilterCreate";
import { generateFilterId } from "../../utils/idGenerator";
import Loading from "../../components/Loading";
import { useAlert } from "../../context/AlertContext";
import BehaviorFilter from "./BehaviorFilter";

const LogFilter = ({
  onClose,
  campaignIdProp,
  formatIdProp,
  onSuccess,
  setGlobalLoading,
}) => {
  const { showAlert } = useAlert();
  const { campaignId, formatId } = useParams();
  const {
    items,
    filterSettings,
    filterOptions,
    updateFilterSettings,
    saveFilter,
    isLoading,
  } = useFilterCreate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (!Array.isArray(items)) return [];
    if (!searchTerm.trim()) {
      return items.filter(
        (item) => item && item.name && item.namealias && item.type
      );
    }

    const searchTermLower = searchTerm.toLowerCase().trim();
    return items.filter((item) => {
      if (!item || !item.name || !item.namealias || !item.type) {
        return false;
      }
      return (
        item.name.toLowerCase().includes(searchTermLower) ||
        item.namealias.toLowerCase().includes(searchTermLower) ||
        item.type.toLowerCase().includes(searchTermLower)
      );
    });
  }, [items, searchTerm]);

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

  const handleSave = async () => {
    try {
      if (!filterSettings.name?.trim()) {
        showAlert("필터 이름을 입력해주세요.");
        return;
      }

      const validFilters = filterSettings.behaviors?.filter(
        (behavior) =>
          behavior.idOption && behavior.operatorOption && behavior.actionValue
      );

      if (!validFilters || validFilters.length === 0) {
        showAlert(
          "최소 하나의 필터를 생성하고 모든 옵션(ID, 연산자, 값)을 선택해주세요."
        );
        return;
      }

      const filterId = generateFilterId();
      const requestData = {
        filtername: filterSettings.name.trim(),
        filtermanage_id: filterId,
        filterSetList: {
          filterSets: validFilters.map((behavior, index) => ({
            andor: index === 0 ? null : behavior.logicalOperator,
            filtervalue: {
              value: behavior.actionValue,
            },
            operation: {
              operation: behavior.operatorOption.value,
            },
            responseItemid: behavior.idOption.id,
          })),
        },
      };

      await saveFilter(campaignId, formatId, requestData);
      showAlert("저장되었습니다.", async () => {
        if (onSuccess) {
          await onSuccess();
        }
        if (onClose) {
          onClose();
        }
      });
    } catch (error) {
      showAlert(error.message || "저장에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <S.Header>
        <S.Title>필터 생성</S.Title>
        <S.CloseButton onClick={onClose}>
          <X size={24} />
        </S.CloseButton>
      </S.Header>
      <F.Container>
        <F.LeftSection>
          <F.SearchContainer>
            <F.SearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="아이템 검색"
            />
            <F.SearchButton>
              <Search size={20} />
            </F.SearchButton>
          </F.SearchContainer>

          <F.Table>
            <thead>
              <F.TableHeader>
                <th>아이템 명</th>
                <th>아이템 별명</th>
                <th>TYPE</th>
              </F.TableHeader>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <F.TableRow key={index}>
                  <F.TableCell>{item.name}</F.TableCell>
                  <F.TableCell>{item.namealias}</F.TableCell>
                  <F.TableCell>{item.type}</F.TableCell>
                </F.TableRow>
              ))}
            </tbody>
          </F.Table>

          <F.PaginationContainer>
            <F.PaginationButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </F.PaginationButton>

            {Array.from({ length: totalPages }, (_, index) => (
              <F.PageNumber
                key={index + 1}
                $isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </F.PageNumber>
            ))}

            <F.PaginationButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </F.PaginationButton>
          </F.PaginationContainer>
        </F.LeftSection>

        <F.RightSection>
          {/* 오른쪽 섹션은 기존 코드 유지 */}
          <F.FilterSection>
            <F.FilterTitle>행동 정의 설정</F.FilterTitle>
            <BehaviorFilter
              filters={filterSettings.behaviors || []}
              options={filterOptions}
              onChange={(behaviors) => updateFilterSettings({ behaviors })}
            />

            <div style={{ height: "50px" }} />
            <F.Section>
              <F.FormGroup>
                <F.Label>이름</F.Label>
                <F.Input
                  value={filterSettings.name || ""}
                  onChange={(e) =>
                    updateFilterSettings({ name: e.target.value })
                  }
                  placeholder="필터 이름을 입력하세요"
                />
              </F.FormGroup>
            </F.Section>

            <F.RepeatSection>
              <F.ButtonContainer>
                <F.SaveButton onClick={handleSave}>
                  {" "}
                  <Save size={16} />
                  생성
                </F.SaveButton>
              </F.ButtonContainer>
            </F.RepeatSection>
          </F.FilterSection>
        </F.RightSection>
      </F.Container>
    </>
  );
};

export default LogFilter;
