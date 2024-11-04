import React, { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import * as S from "../styles/filter/behaviorFilterStyle";

// 임시 데이터 정의
const TEMP_OPTIONS = {
  idOptions: [
    { id: "ID1", label: "ID1" },
    { id: "ID2", label: "ID2" },
  ],
  operatorOptions: [
    { id: "equals", label: "=" },
    { id: "not_equals", label: "!=" },
    { id: "greater_than", label: ">" },
    { id: "less_than", label: "<" },
    { id: "greater_equals", label: ">=" },
    { id: "less_equals", label: "<=" },
  ],
  actionOptions: [
    { id: "view_cart", label: "장바구니 보기" },
    { id: "add_to_cart", label: "장바구니 추가" },
    { id: "remove_from_cart", label: "장바구니 제거" },
    { id: "purchase", label: "구매하기" },
    { id: "view_product", label: "상품 상세보기" },
    { id: "custom_input", label: "직접 입력" },
  ],
};

const BehaviorFilter = ({
  filters = [],
  onChange = () => {},
  options = {},
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  // options 객체에서 idOptions만 사용하고 나머지는 임시 데이터 사용
  const mergedOptions = {
    idOptions: options.idOptions || TEMP_OPTIONS.idOptions,
    operatorOptions: TEMP_OPTIONS.operatorOptions,
    actionOptions: TEMP_OPTIONS.actionOptions,
  };

  const addFilter = () => {
    onChange([
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

  const removeFilter = (id) => {
    onChange(filters.filter((filter) => filter.id !== id));
  };

  const handleOptionSelect = (filterId, type, value) => {
    onChange(
      filters.map((filter) => {
        if (filter.id === filterId) {
          const newFilter = {
            ...filter,
            [type]: value,
          };

          if (type === "actionOption" && value.id === "custom_input") {
            newFilter.isEditing = true;
            newFilter.customValue = "";
          }

          return newFilter;
        }
        return filter;
      })
    );
    setActiveDropdown(null);
  };

  const handleTagClick = (filterId, type) => {
    onChange(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            [type]: null,
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

  const handleCustomValueChange = (filterId, value) => {
    onChange(
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

  const handleCustomValueSubmit = (filterId, e) => {
    e.preventDefault();
    onChange(
      filters.map((filter) => {
        if (filter.id === filterId && filter.customValue) {
          return {
            ...filter,
            isEditing: false,
          };
        }
        return filter;
      })
    );
  };

  const startEditing = (filterId) => {
    onChange(
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

  const renderOptionDropdown = (filter, type, options, title) => {
    const optionValue = filter[type];
    const dropdownId = `${filter.id}-${type}`;

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

  const renderActionOption = (filter) => {
    if (filter.actionOption?.id === "custom_input") {
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

      return (
        <S.Tag className="actionOption" onClick={() => startEditing(filter.id)}>
          {filter.customValue}원
        </S.Tag>
      );
    }

    return renderOptionDropdown(
      filter,
      "actionOption",
      // options.actionOptions,
      mergedOptions.actionOptions,
      "Select Action"
    );
  };

  return (
    <S.Container>
      {filters.map((filter, index) => (
        <S.FilterRow key={filter.id}>
          <S.RemoveButton onClick={() => removeFilter(filter.id)}>
            <X size={16} />
          </S.RemoveButton>

          <S.OptionContainer>
            {renderOptionDropdown(
              filter,
              "idOption",
              // options.idOptions,
              mergedOptions.idOptions,
              "Select ID"
            )}
            {renderOptionDropdown(
              filter,
              "operatorOption",
              // options.operatorOptions,
              mergedOptions.operatorOptions,
              "Select Operator"
            )}
            {renderActionOption(filter)}
          </S.OptionContainer>
        </S.FilterRow>
      ))}

      <S.AddButton onClick={addFilter}>
        <Plus size={16} />
        필터 추가
      </S.AddButton>
    </S.Container>
  );
};

export default BehaviorFilter;
