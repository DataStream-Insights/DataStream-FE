import React from "react";
import { useTable, useRowSelect } from "react-table";
import { Search, Plus, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCampaignData from "../../hooks/campaign/useCampaginData";
import * as S from "../../styles/main/tableStyle";
import Loading from "../Loading";

export function CampaignTable() {
  const navigate = useNavigate();
  const { data, isLoading } = useCampaignData();

  const handleCreateClick = () => {
    navigate("/campaignform");
  };

  const handleRowClick = (campaignId) => {
    navigate(`/format/${campaignId}/management`);
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
              onClick={(e) => e.stopPropagation()} // 체크박스 클릭 시 행 클릭 이벤트 전파 방지
            />
          );
        },
        Cell: ({ row }) => {
          const { indeterminate, ...props } = row.getToggleRowSelectedProps();
          return (
            <S.Checkbox
              {...props}
              onClick={(e) => e.stopPropagation()} // 체크박스 클릭 시 행 클릭 이벤트 전파 방지
            />
          );
        },
      },
      { Header: "No", accessor: "no" },
      { Header: "캠페인 ID", accessor: "campaignId" },
      { Header: "분류1", accessor: "campaignClassification1" },
      { Header: "분류2", accessor: "campaignClassification2" },
      { Header: "캠페인명", accessor: "campaignName" },
      { Header: "상태", accessor: "status" },
      { Header: "시작 일자", accessor: "startDate" },
      { Header: "종료 일자", accessor: "endDate" },
      { Header: "공개 여부", accessor: "visibility" },
      { Header: "기안 부서", accessor: "department" },
      { Header: "기안자", accessor: "author" },
      { Header: "기안일자", accessor: "createdDate" },
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
          <S.StateDropdown>
            <option value="">전체</option>
            <option value="plan">계획</option>
            <option value="progress">진행중</option>
            <option value="complete">완료</option>
          </S.StateDropdown>

          <S.SearchInput placeholder="캠페인 정보" />

          <S.CheckboxContainer>
            <input type="checkbox" id="myRegistration" />
            <label htmlFor="myRegistration">내가 등록한 캠페인</label>
          </S.CheckboxContainer>

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
        <S.StyledTable>
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
                  onClick={() => handleRowClick(row.original.campaignId)}
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

export default CampaignTable;
