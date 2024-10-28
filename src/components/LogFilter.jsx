import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useTable } from 'react-table';
import * as F from '../styles/filter/filterStyle';
const LogFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');

    //샘플 데이터
    const data = React.useMemo(
        () => [
            { id: 'sitsw', name: '내부검색어', type: 'STRING' },
            { id: 'ssn_evt_o', name: '세션이벤트발생시간', type: 'NUMERIC' },
            { id: 'ssn_id', name: '세션식별번호', type: 'STRING' },
            { id: 'st_page_yn', name: '시작페이지여부', type: 'STRING' },
            { id: 'tag_id', name: 'tag_id', type: 'STRING' },
            { id: 'usr_evt_oc', name: '사용자별이벤트발생', type: 'NUMERIC' },
            { id: 'vcst_uid', name: '방문고객단일식별자', type: 'STRING' },
            { id: 'vst_dt', name: '방문일자', type: 'STRING' },
            { id: 'vst_dtm', name: '방문일시', type: 'STRING' },
            { id: 'vst_dtm_t', name: '방문일시시간간(초)', type: 'NUMERIC' },
            { id: 'vst_dywk', name: '방문요일코드', type: 'STRING' },
            { id: 'vst_ipadr', name: '방문IP주소', type: 'STRING' },
            { id: 'vst_srno', name: '방문일련번호', type: 'NUMERIC' },
        ],
        []
    );

    //테이블 필드
    const columns = React.useMemo(
        () => [
            { Header: '아이템 명', accessor: 'id' },
            { Header: '아이템 별명', accessor: 'name' },
            { Header: 'TYPE', accessor: 'type' },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: data.filter(item =>
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    });

    return (
        <F.Container>
            <F.LeftSection>
                <div style={{ marginBottom: '16px' }}>
                    <F.SearchInput
                        placeholder="아이템 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <F.TableContainer>
                    <F.StyledTable {...getTableProps()}>
                        <F.THead>
                            {headerGroups.map(headerGroup => (
                                <F.Tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <F.Th {...column.getHeaderProps()}>
                                            {column.render('Header')}
                                        </F.Th>
                                    ))}
                                </F.Tr>
                            ))}
                        </F.THead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <F.Tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <F.Td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </F.Td>
                                        ))}
                                    </F.Tr>
                                );
                            })}
                        </tbody>
                    </F.StyledTable>
                </F.TableContainer>
            </F.LeftSection>

            <F.RightSection>
                <F.FilterSection>
                    <F.FilterTitle>행동 정의 설정</F.FilterTitle>

                    <F.FilterTag>
                        <F.Tag className="and">And</F.Tag>
                        <button style={{  background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={16} />
                        </button>
                        <F.Tag className="id">아이템ID</F.Tag>
                        <F.Tag className="equals">Equals</F.Tag>
                        
                    </F.FilterTag>

                    <div style={{ height: '500px' }} />

                    <F.RepeatSection>
                        <F.InputGroup>
                            <F.NumberInput type="number" defaultValue="1" min="1" />
                            <span>회 반복하여 조건 만족 시 통과</span>
                        </F.InputGroup>

                        <F.InputGroup>
                            <F.NumberInput type="number" defaultValue="5" min="1" />
                            <F.Select defaultValue="분">
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
                                <input type="checkbox" />
                                <span></span>
                            </F.Switch>
                            <span style={{ fontSize: '12px', color: '#868e96' }}>
                                * 설정시 시간 제약 설정이 필수로 필요하지 않습니다.
                            </span>

                            <div style={{ textAlign: 'right' }}>
                                <F.SaveButton>저장</F.SaveButton>
                            </div>
                        </F.InputGroup>
                    </F.RepeatSection>

                </F.FilterSection>
            </F.RightSection>
        </F.Container>
    );
};

export default LogFilter;