// BehaviorFilter.jsx
import React, { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import * as S from "../styles/filter/behaviorFilterStyle";

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
];

const BehaviorFilter = () => {
  const [filters, setFilters] = useState([
    {
      id: crypto.randomUUID(),
      idOption: null,
      operatorOption: null,
      actionOption: null,
    },
  ]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        id: crypto.randomUUID(),
        idOption: null,
        operatorOption: null,
        actionOption: null,
      },
    ]);
  };

  const removeFilter = (id) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  const handleOptionSelect = (filterId, type, value) => {
    setFilters(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            [type]: value,
          };
        }
        return filter;
      })
    );
    setActiveDropdown(null);
  };

  const handleTagClick = (filterId, type) => {
    setFilters(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            [type]: null,
          };
        }
        return filter;
      })
    );
  };

  const renderOptionDropdown = (filter, type, options, title) => {
    const optionValue = filter[type];
    const dropdownId = `${filter.id}-${type}`;

    if (optionValue) {
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

  return (
    <S.Container>
      {filters.map((filter, index) => (
        <S.FilterRow key={filter.id}>
          {/* {index === 0 && <S.Tag className="and">And</S.Tag>} */}
          <S.RemoveButton onClick={() => removeFilter(filter.id)}>
            <X size={16} />
          </S.RemoveButton>

          <S.OptionContainer>
            {renderOptionDropdown(filter, "idOption", idOptions, "Select ID")}
            {renderOptionDropdown(
              filter,
              "operatorOption",
              operatorOptions,
              "Select Operator"
            )}
            {renderOptionDropdown(
              filter,
              "actionOption",
              actionOptions,
              "Select Action"
            )}
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
