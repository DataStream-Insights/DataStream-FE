import React, { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import * as S from "../styles/filter/behaviorFilterStyle";

// 각 옵션들의 데이터 정의
const idOptions = [
  { id: "ID1", label: "ID1" },
  { id: "ID2", label: "ID2" },
  { id: "ID3", label: "ID3" },
  { id: "ID4", label: "ID4" },
];

const operatorOptions = [
  { id: "equals", label: "Equals" },
  { id: "gte", label: ">=" },
  { id: "lte", label: "<=" },
  { id: "lt", label: "<" },
  { id: "gt", label: ">" },
  { id: "or", label: "OR" },
  { id: "and", label: "AND" },
];

const actionOptions = [
  { id: "view_cart", label: "장바구니 보기" },
  { id: "add_to_cart", label: "장바구니 담기" },
  { id: "purchase", label: "구매하기" },
  { id: "view_product", label: "상품 보기" },
  { id: "custom_input", label: "금액 직접 입력" }, // 금액 직접 입력 옵션
];

const BehaviorFilter = () => {
  // 필터 상태 관리
  // filters: 각 필터 행의 정보를 담는 배열
  // isEditing: 금액 입력 모드인지 여부
  // customValue: 사용자가 입력한 금액
  const [filters, setFilters] = useState([
    {
      id: crypto.randomUUID(),
      idOption: null,
      operatorOption: null,
      actionOption: null,
      customValue: "",
      isEditing: false,
    },
  ]);

  // 현재 열린 드롭다운 메뉴 관리
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 새로운 필터 행 추가
  const addFilter = () => {
    setFilters([
      ...filters,
      {
        id: crypto.randomUUID(),
        idOption: null,
        operatorOption: null,
        actionOption: null,
        customValue: "",
        isEditing: false,
      },
    ]);
  };

  // 필터 행 삭제
  const removeFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  // 드롭다운에서 옵션 선택 시 처리
  const handleOptionSelect = (filterId, type, value) => {
    setFilters(
      filters.map((filter) => {
        if (filter.id === filterId) {
          const newFilter = {
            ...filter,
            [type]: value,
          };

          // 금액 직접 입력 옵션 선택 시 입력 모드 활성화
          if (type === "actionOption" && value.id === "custom_input") {
            newFilter.isEditing = true;
            newFilter.customValue = "";
          }

          return newFilter;
        }
        return filter;
      })
    );
    setActiveDropdown(null); // 드롭다운 메뉴 닫기
  };

  // 태그 클릭 시 해당 옵션 초기화
  const handleTagClick = (filterId, type) => {
    setFilters(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            [type]: null,
            // 액션 옵션 초기화 시 관련 값들도 함께 초기화
            ...(type === "actionOption" && {
              customValue: "",
              isEditing: false,
            }),
          };
        }
        return filter;
      })
    );
  };

  // 금액 입력값 변경 처리
  const handleCustomValueChange = (filterId, value) => {
    setFilters(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            customValue: value,
          };
        }
        return filter;
      })
    );
  };

  // 금액 입력 완료(엔터키) 처리
  const handleCustomValueSubmit = (filterId, e) => {
    e.preventDefault();
    setFilters(
      filters.map((filter) => {
        if (filter.id === filterId && filter.customValue) {
          return {
            ...filter,
            isEditing: false, // 입력 모드 종료
          };
        }
        return filter;
      })
    );
  };

  // 금액 수정 모드 시작
  const startEditing = (filterId) => {
    setFilters(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            isEditing: true,
          };
        }
        return filter;
      })
    );
  };

  // 일반 드롭다운 옵션 렌더링
  const renderOptionDropdown = (filter, type, options, title) => {
    const optionValue = filter[type];
    const dropdownId = `${filter.id}-${type}`;

    // 선택된 옵션이 있고, 금액 직접 입력이 아닌 경우 태그로 표시
    if (
      optionValue &&
      !(type === "actionOption" && optionValue.id === "custom_input")
    ) {
      return (
        <S.Tag className={type} onClick={() => handleTagClick(filter.id, type)}>
          {optionValue.label}
        </S.Tag>
      );
    }

    // 드롭다운 메뉴 표시
    return (
      <S.DropdownContainer>
        <S.DropdownButton onClick={() => setActiveDropdown(dropdownId)}>
          {title} <ChevronDown size={16} />
        </S.DropdownButton>

        {activeDropdown === dropdownId && (
          <S.DropdownContent>
            {options.map((option) => (
              <S.Option
                key={option.id}
                onClick={() => handleOptionSelect(filter.id, type, option)}
              >
                {option.label}
              </S.Option>
            ))}
          </S.DropdownContent>
        )}
      </S.DropdownContainer>
    );
  };

  // 액션 옵션 렌더링 (일반 옵션 또는 금액 입력)
  const renderActionOption = (filter) => {
    // 금액 직접 입력 옵션이 선택된 경우
    if (filter.actionOption?.id === "custom_input") {
      // 입력 모드이거나 금액이 없는 경우 입력 필드 표시
      if (filter.isEditing || !filter.customValue) {
        return (
          <S.CustomInputContainer>
            <form onSubmit={(e) => handleCustomValueSubmit(filter.id, e)}>
              <S.CustomInput
                type="number"
                value={filter.customValue}
                onChange={(e) =>
                  handleCustomValueChange(filter.id, e.target.value)
                }
                placeholder="금액 입력 후 Enter"
                autoFocus
                min="0"
              />
            </form>
          </S.CustomInputContainer>
        );
      }

      // 금액이 입력된 경우 태그로 표시
      return (
        <S.Tag className="actionOption" onClick={() => startEditing(filter.id)}>
          {filter.customValue}원
        </S.Tag>
      );
    }

    // 일반 액션 옵션 드롭다운 표시
    return renderOptionDropdown(
      filter,
      "actionOption",
      actionOptions,
      "Select Action"
    );
  };

  // 컴포넌트 렌더링
  return (
    <S.Container>
      {/* 필터 행 목록 */}
      {filters.map((filter, index) => (
        <S.FilterRow key={filter.id}>
          {/* 삭제 버튼 */}
          <S.RemoveButton onClick={() => removeFilter(filter.id)}>
            <X size={16} />
          </S.RemoveButton>

          {/* 옵션 선택 영역 */}
          <S.OptionContainer>
            {/* ID 선택 */}
            {renderOptionDropdown(filter, "idOption", idOptions, "Select ID")}
            {/* 연산자 선택 */}
            {renderOptionDropdown(
              filter,
              "operatorOption",
              operatorOptions,
              "Select Operator"
            )}
            {/* 액션/금액 선택 */}
            {renderActionOption(filter)}
          </S.OptionContainer>
        </S.FilterRow>
      ))}

      {/* 필터 추가 버튼 */}
      <S.AddButton onClick={addFilter}>
        <Plus size={16} />
        필터 추가
      </S.AddButton>
    </S.Container>
  );
};

export default BehaviorFilter;
