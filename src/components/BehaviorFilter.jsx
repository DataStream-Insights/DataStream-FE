import React, { useState } from "react";
import { Plus, X, ChevronDown } from "lucide-react";
import * as S from "../styles/filter/behaviorFilterStyle";

const BehaviorFilter = ({
  filters = [],
  onChange = () => {},
  options = {},
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const mergedOptions = {
    idOptions: options.idOptions || [],
    operatorOptions: options.operatorOptions || [],
  };
  console.log("Merged options:", mergedOptions);

  const addFilter = () => {
    onChange([
      ...filters,
      {
        id: crypto.randomUUID(),
        idOption: null,
        operatorOption: null,
        actionValue: "",
        isEditing: true,
        logicalOperator: filters.length > 0 ? "AND" : null,
      },
    ]);
  };

  const handleLogicalOperatorChange = (filterId, value) => {
    onChange(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            logicalOperator: value,
          };
        }
        return filter;
      })
    );
  };

  const removeFilter = (id) => {
    onChange(filters.filter((filter) => filter.id !== id));
  };

  const handleOptionSelect = (filterId, type, value) => {
    onChange(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            [type]: {
              id: value.id,
              value: value.value, // 실제 값 저장
              label: value.label, // 화면 표시용 레이블
            },
          };
        }
        return filter;
      })
    );
    setActiveDropdown(null);
  };

  const handleTagClick = (filterId, type) => {
    if (type === "actionValue") {
      onChange(
        filters.map((filter) => {
          if (filter.id === filterId) {
            return {
              ...filter,
              actionValue: "",
              isEditing: true,
            };
          }
          return filter;
        })
      );
    } else {
      onChange(
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
    }
  };

  const handleActionValueChange = (filterId, value) => {
    onChange(
      filters.map((filter) => {
        if (filter.id === filterId) {
          return {
            ...filter,
            actionValue: value,
          };
        }
        return filter;
      })
    );
  };

  const handleActionValueSubmit = (filterId, e) => {
    e.preventDefault();
    onChange(
      filters.map((filter) => {
        if (filter.id === filterId && filter.actionValue) {
          return {
            ...filter,
            isEditing: false,
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

  const renderActionInput = (filter) => {
    if (filter.isEditing || !filter.actionValue) {
      return (
        <S.CustomInputContainer>
          <form onSubmit={(e) => handleActionValueSubmit(filter.id, e)}>
            <S.CustomInput
              type="text"
              value={filter.actionValue}
              onChange={(e) =>
                handleActionValueChange(filter.id, e.target.value)
              }
              placeholder="값 입력 후 Enter"
              autoFocus
            />
          </form>
        </S.CustomInputContainer>
      );
    }

    return (
      <S.Tag
        className="actionOption"
        onClick={() => handleTagClick(filter.id, "actionValue")}
      >
        {filter.actionValue}
      </S.Tag>
    );
  };

  const renderLogicalOperator = (filter, index) => {
    if (index === 0) return null;

    return (
      <S.LogicalOperatorContainer>
        <S.LogicalOperatorGroup>
          <S.OperatorTag
            $isActive={filter.logicalOperator === "AND"}
            onClick={() => handleLogicalOperatorChange(filter.id, "AND")}
          >
            AND
          </S.OperatorTag>
          <S.OperatorTag
            $isActive={filter.logicalOperator === "OR"}
            onClick={() => handleLogicalOperatorChange(filter.id, "OR")}
          >
            OR
          </S.OperatorTag>
        </S.LogicalOperatorGroup>
      </S.LogicalOperatorContainer>
    );
  };

  return (
    <S.Container>
      {filters.map((filter, index) => (
        <React.Fragment key={filter.id}>
          {renderLogicalOperator(filter, index)}
          <S.FilterRow>
            <S.RemoveButton onClick={() => removeFilter(filter.id)}>
              <X size={16} />
            </S.RemoveButton>

            <S.OptionContainer>
              {renderOptionDropdown(
                filter,
                "idOption",
                mergedOptions.idOptions,
                "Select ID"
              )}
              {renderOptionDropdown(
                filter,
                "operatorOption",
                mergedOptions.operatorOptions,
                "Select Operator"
              )}
              {renderActionInput(filter)}
            </S.OptionContainer>
          </S.FilterRow>
        </React.Fragment>
      ))}

      <S.AddButton onClick={addFilter}>
        <Plus size={16} />
        필터 추가
      </S.AddButton>
    </S.Container>
  );
};

export default BehaviorFilter;
