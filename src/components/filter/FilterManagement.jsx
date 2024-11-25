// FilterManagement.jsx
import React from "react";

import { useTable, useRowSelect } from "react-table";
import { Search, Plus, MoreVertical, X } from "lucide-react";
import { useParams } from "react-router-dom";
import useFilterData from "../../hooks/filter/useFilterData";
import * as S from "../../styles/main/tableStyle";

import Loading from "../../components/Loading";
export function FilterManagement({ onSelect, onCreate, isDetailVisible }) {
  const { campaignId, formatId } = useParams();
  const { data, isLoading } = useFilterData();

  const handleRowClick = (row) => {
    onSelect(row.original);
  };

  const handleCreateClick = async () => {
    if (onCreate) {
      await onCreate(); // 새로고침 처리
    }
  };

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
      { Header: "No", accessor: "id" },
      { Header: "필터 ID", accessor: "filterManageId" },
      { Header: "필터링명", accessor: "filterName" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: data || [],
      },
      useRowSelect
    );

  if (isLoading) {
    return <Loading />;
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
                <S.Tr
                  key={key}
                  {...rowProps}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: "pointer" }}
                >
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
