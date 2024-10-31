import React from "react";
import { useTable, useRowSelect } from "react-table";
import { Search, Plus, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFilterData from "../hooks/filter/useFilterData";
import * as S from "../styles/main/tableStyle";

export function FilterManagement() {
  const navigate = useNavigate();
  const { data, isLoading } = useFilterData(); // useFilter hook 사용

  const handleCreateClick = () => {
    navigate("/filter");
  };

  //Header
  const columns = React.useMemo(
    () => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => {
          const { indeterminate, ...props } = getToggleAllRowsSelectedProps();
          return (
            <S.Checkbox
              {...props}
              ref={(el) => {
                if (el) {
                  el.indeterminate = indeterminate;
                }
              }}
            />
          );
        },
        Cell: ({ row }) => {
          const { indeterminate, ...props } = row.getToggleRowSelectedProps();
          return <S.Checkbox {...props} />;
        },
      },
      { Header: "No", accessor: "no" }, // API에서 추가한 no 필드
      { Header: "필터 ID", accessor: "filterId" }, // 백엔드 응답의 filterId
      { Header: "필터링명", accessor: "filterName" }, // 필터링명 필드
      { Header: "기안자", accessor: "author" }, // 기안자 필드
      { Header: "기안일자", accessor: "createdDate" }, // 생성일자 필드
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: data || [], // 초기값이 undefined일 때를 대비해 빈 배열 할당
      },
      useRowSelect
    );

  if (isLoading) {
    return <S.LoadingMessage>데이터를 불러오는 중...</S.LoadingMessage>;
  }

  return (
    <>
      <S.HeaderContainer>
        <S.FilterRow>
          <S.SearchInput placeholder="필터링명 검색" />

          <S.ButtonGroup>
            <S.SearchButton>
              <Search size={16} />
            </S.SearchButton>
            <S.CreateButton onClick={handleCreateClick}>
              <Plus size={16} />
              Create
            </S.CreateButton>
            <S.SearchButton>
              <MoreVertical size={16} />
            </S.SearchButton>
          </S.ButtonGroup>
        </S.FilterRow>
      </S.HeaderContainer>
      <S.TableContainer>
        <S.StyledTable {...getTableProps()}>
          <S.THead>
            {headerGroups.map((headerGroup) => {
              const { key, ...headerGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <S.Tr key={key} {...headerGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...columnProps } = column.getHeaderProps();
                    return (
                      <S.Th key={key} {...columnProps}>
                        {column.render("Header")}
                      </S.Th>
                    );
                  })}
                </S.Tr>
              );
            })}
          </S.THead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                <S.Tr key={key} {...rowProps}>
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps();
                    return (
                      <S.Td key={key} {...cellProps}>
                        {cell.render("Cell")}
                      </S.Td>
                    );
                  })}
                </S.Tr>
              );
            })}
          </tbody>
        </S.StyledTable>
      </S.TableContainer>
    </>
  );
}

export default FilterManagement;
