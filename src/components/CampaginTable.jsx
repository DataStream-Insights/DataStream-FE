import React from 'react';
import { useTable } from 'react-table';
import TableHeader from './TableHeader';
import useCampaignData from '../hooks/useCampaginData';
import '../styles/table.css';

const CampaignTable = () => {
    const { data, isLoading } = useCampaignData();

    const columns = React.useMemo(() => [
        { Header: '캠페인 ID', accessor: 'campaignId' },
        { Header: '분류1', accessor: 'category1' },
        { Header: '분류2', accessor: 'category2' },
        { Header: '캠페인명', accessor: 'campaignName' },
        { Header: '상태', accessor: 'status' },
        { Header: '시작 일자', accessor: 'startDate' },
        { Header: '종료 일자', accessor: 'endDate' },
        { Header: '공개 여부', accessor: 'isPublic' },
        { Header: '기안 부서', accessor: 'department' },
        { Header: '기안자', accessor: 'author' },
        { Header: '기안일자', accessor: 'createdDate' },
        { Header: '태그', accessor: 'tags', Cell: ({ value }) => value.join(', ') },
    ], []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = useTable({ columns, data });

    if (isLoading) {
        return <div>데이터를 불러오는 중...</div>;
    }

    return (
        <table {...getTableProps()} className="campaign-table">
            <TableHeader headerGroups={headerGroups} />
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CampaignTable;