import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useTable } from "react-table";
import { useParams, useNavigate } from "react-router-dom";
import * as F from "../../styles/filter/filterStyle";
import { CustomTablePagination } from "../../styles/filter/filterPagenationStyle";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import BehaviorFilter from "./BehaviorFilter";
import useFilterCreate from "../../hooks/filter/useFilterCreate";
import { generateFilterId } from "../../utils/idGenerator";

const LogFilter = () => {
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  // 컬럼 정의
  const columns = useMemo(
    () => [
      { Header: "아이템 명", accessor: "name" },
      { Header: "아이템 별명", accessor: "namealias" },
      { Header: "TYPE", accessor: "type" },
    ],
    []
  );

  // 필터링된 데이터
  const filteredData = useMemo(() => {
    if (!Array.isArray(items)) return [];
    if (!searchTerm.trim()) {
      // 빈 값이거나 null인 항목 제외
      return items.filter(
        (item) => item && item.name && item.namealias && item.type
      );
    }

    const searchTermLower = searchTerm.toLowerCase().trim();

    return items.filter((item) => {
      // 유효한 데이터만 포함
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

  // useTable 훅을 컴포넌트 최상위 레벨에서 호출
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredData,
    });

  // 페이지네이션된 데이터
  const paginatedRows = useMemo(() => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSave = async () => {
    try {
      if (!filterSettings.name?.trim()) {
        alert("필터 이름을 입력해주세요.");
        return;
      }

      const filterId = generateFilterId();
      const requestData = {
        filtername: filterSettings.name.trim(),
        filtermanage_id: filterId,
        filterSetList: {
          filterSets: filterSettings.behaviors
            ?.filter(
              (behavior) =>
                behavior.idOption &&
                behavior.operatorOption &&
                behavior.actionValue
            )
            .map((behavior, index) => ({
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
      alert("저장되었습니다.");
      navigate(`/filter/${campaignId}/${formatId}/filtermanagement`);
    } catch (error) {
      alert(error.message || "저장에 실패했습니다.");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                <F.Tr
                  key={`header-group-${groupIndex}`}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column, columnIndex) => (
                    <F.Th
                      key={`header-${groupIndex}-${columnIndex}`}
                      {...column.getHeaderProps()}
                    >
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
                  <F.Tr key={`row-${rowIndex}`} {...row.getRowProps()}>
                    {row.cells.map((cell, cellIndex) => (
                      <F.Td
                        key={`cell-${rowIndex}-${cellIndex}`}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </F.Td>
                    ))}
                  </F.Tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
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
                onChange={(e) => updateFilterSettings({ name: e.target.value })}
                placeholder="필터 이름을 입력하세요"
              />
            </F.FormGroup>
          </F.Section>

          <F.RepeatSection>
            <F.ButtonContainer>
              <F.BackButton onClick={handleBack}>뒤로 가기</F.BackButton>
              <F.SaveButton onClick={handleSave}>저장</F.SaveButton>
            </F.ButtonContainer>
          </F.RepeatSection>
        </F.FilterSection>
      </F.RightSection>
    </F.Container>
  );
};

export default LogFilter;
