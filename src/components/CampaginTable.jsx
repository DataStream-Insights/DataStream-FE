import React from "react";
import { useTable, useRowSelect } from "react-table"; // react-table은 그대로 사용
import { Search, Plus, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useCampaignData from "../hooks/useCampaginData";
import * as S from "../styles/main/tableStyle";

export function CampaignTable() {
    const navigate = useNavigate();
    const { data, isLoading } = useCampaignData();

    const handleCreateClick = () => {
        navigate("/campaignform"); // /campaignform으로 이동
    };

    //   //프론트 화면 테스트용 데이터
    //   const data = React.useMemo(
    //     () => [
    //       {
    //         no: 1,
    //         campaignId: "CAMP001",
    //         category1: "Category A",
    //         category2: "Category B",
    //         campaignName: "Campaign 1",
    //         status: "Active",
    //         startDate: "2024-10-01",
    //         endDate: "2024-10-15",
    //         isPublic: "Yes",
    //         department: "Marketing",
    //         author: "John Doe",
    //         createdDate: "2024-09-25",
    //       },
    //       {
    //         no: 2,
    //         campaignId: "CAMP002",
    //         category1: "Category A",
    //         category2: "Category C",
    //         campaignName: "Campaign 2",
    //         status: "Inactive",
    //         startDate: "2024-09-20",
    //         endDate: "2024-10-05",
    //         isPublic: "No",
    //         department: "Sales",
    //         author: "Jane Doe",
    //         createdDate: "2024-09-10",
    //       },
    //     ],
    //     []
    //   );

    //Header
    const columns = React.useMemo(
        () => [
            {
                id: "selection",
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <S.Checkbox {...getToggleAllRowsSelectedProps()} />
                ),
                Cell: ({ row }) => <S.Checkbox {...row.getToggleRowSelectedProps()} />,
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
                data: data || [], // 임시 데이터 사용
            },
            useRowSelect // useRowSelect 추가
        );

    //   //테스트 데이터는 로딩 상태가 필요 없으므로 로딩 메시지 주석 처리
    //   if (isLoading) {
    //     return <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>;
    //   }

    return (
        <>
            <S.HeaderContainer>
                <S.FilterRow>
                    <S.DateRangeContainer>
                        <S.DateInput defaultValue="2024-10-15" />
                        <span>~</span>
                        <S.DateInput defaultValue="2024-10-15" />
                    </S.DateRangeContainer>

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
                        {/* 생성하기 버튼 클릭 시 /campaignform 으로 이동 */}
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
                        {headerGroups.map((headerGroup) => (
                            <S.Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <S.Th {...column.getHeaderProps()}>
                                        {column.render("Header")}
                                    </S.Th>
                                ))}
                            </S.Tr>
                        ))}
                    </S.THead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <S.Tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        if (cell.column.id === "selection") {
                                            return (
                                                <S.CheckboxCell {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </S.CheckboxCell>
                                            );
                                        }
                                        return (
                                            <S.Td {...cell.getCellProps()}>
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
