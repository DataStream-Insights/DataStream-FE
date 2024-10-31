import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useTable } from "react-table";
import * as F from "../styles/filter/filterStyle";
import { CustomTablePagination } from "../styles/filter/filterPagenationStyle";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import BehaviorFilter from "./BehaviorFilter";
import useFilterCreate from "../hooks/filter/useFilterCreate";

const LogFilter = () => {
  //hook에서 items 받아옴
  const { items, filterSettings, updateFilterSettings, saveFilter } =
    useFilterCreate();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const data = items;

  const columns = React.useMemo(
    () => [
      { Header: "아이템 명", accessor: "id" },
      { Header: "아이템 별명", accessor: "name" },
      { Header: "TYPE", accessor: "type" },
    ],
    []
  );

  const filteredData = React.useMemo(
    () =>
      data.filter(
        (item) =>
          item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [data, searchTerm]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredData,
    });

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSave = async () => {
    try {
      await saveFilter();
      alert("저장되었습니다.");
    } catch (error) {
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <F.Container>
      <F.LeftSection>
        <div style={{ marginBottom: "16px" }}>
          <F.SearchInput
            placeholder="아이템 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <F.TableContainer>
          <F.StyledTable {...getTableProps()}>
            <F.THead>
              {headerGroups.map((headerGroup, groupIndex) => (
                <F.Tr key={`header-group-${groupIndex}`}>
                  {headerGroup.headers.map((column, columnIndex) => (
                    <F.Th key={`header-${groupIndex}-${columnIndex}`}>
                      {column.render("Header")}
                    </F.Th>
                  ))}
                </F.Tr>
              ))}
            </F.THead>
            <tbody {...getTableBodyProps()}>
              {paginatedRows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <F.Tr key={`row-${rowIndex}`}>
                    {row.cells.map((cell, cellIndex) => (
                      <F.Td key={`cell-${rowIndex}-${cellIndex}`}>
                        {cell.render("Cell")}
                      </F.Td>
                    ))}
                  </F.Tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr key="pagination-row">
                <CustomTablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    20,
                    { label: "All", value: filteredData.length },
                  ]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      "aria-label": "rows per page",
                    },
                    actions: {
                      showFirstButton: true,
                      showLastButton: true,
                      slots: {
                        firstPageIcon: FirstPageRoundedIcon,
                        lastPageIcon: LastPageRoundedIcon,
                        nextPageIcon: ChevronRightRoundedIcon,
                        backPageIcon: ChevronLeftRoundedIcon,
                      },
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </tr>
            </tfoot>
          </F.StyledTable>
        </F.TableContainer>
      </F.LeftSection>

      <F.RightSection>
        <F.FilterSection>
          <F.FilterTitle>행동 정의 설정</F.FilterTitle>
          <BehaviorFilter
            filters={filterSettings.behaviors}
            onChange={(behaviors) => updateFilterSettings({ behaviors })}
          />

          <div style={{ height: "50px" }} />

          <F.RepeatSection>
            <F.InputGroup>
              <F.NumberInput
                type="number"
                value={filterSettings.repeatCount}
                onChange={(e) =>
                  updateFilterSettings({
                    repeatCount: parseInt(e.target.value),
                  })
                }
                min="1"
              />
              <span>회 반복하여 조건 만족 시 통과</span>
            </F.InputGroup>

            <F.InputGroup>
              <F.NumberInput
                type="number"
                value={filterSettings.timeLimit.value}
                onChange={(e) =>
                  updateFilterSettings({
                    timeLimit: {
                      ...filterSettings.timeLimit,
                      value: parseInt(e.target.value),
                    },
                  })
                }
                min="1"
              />
              <F.Select
                value={filterSettings.timeLimit.unit}
                onChange={(e) =>
                  updateFilterSettings({
                    timeLimit: {
                      ...filterSettings.timeLimit,
                      unit: e.target.value,
                    },
                  })
                }
              >
                <option value="분">분</option>
                <option value="시간">시간</option>
                <option value="일">일</option>
              </F.Select>
              <span>이내</span>
              <span>행동 정의 충족시 통과</span>
            </F.InputGroup>

            <F.InputGroup>
              <span>행동 정의 미충족 수집</span>
              <F.Switch>
                <input
                  type="checkbox"
                  checked={filterSettings.collectUnmatched}
                  onChange={(e) =>
                    updateFilterSettings({
                      collectUnmatched: e.target.checked,
                    })
                  }
                />
                <span></span>
              </F.Switch>
              <span style={{ fontSize: "12px", color: "#868e96" }}>
                * 설정시 시간 제약 설정이 필수로 필요하지 않습니다.
              </span>

              <div style={{ textAlign: "right" }}>
                <F.SaveButton onClick={handleSave}>저장</F.SaveButton>
              </div>
            </F.InputGroup>
          </F.RepeatSection>
        </F.FilterSection>
      </F.RightSection>
    </F.Container>
  );
};

export default LogFilter;
