import React from "react";
import styled from "styled-components";

const DashboardPrintTable = React.forwardRef(
  (
    { dashboardData, processSpecificData, dateTimeRangeData, selectedDate },
    ref
  ) => {
    return (
      <PrintContainer ref={ref}>
        <PrintHeader>
          <h1>대시보드 리포트 (표)</h1>
          <p>생성일: {new Date().toLocaleDateString()}</p>
        </PrintHeader>

        {/* 시간대별 방문 추이 */}
        <Section>
          <h2>시간대별 방문 추이</h2>
          <Table>
            <thead>
              <tr>
                <th>시간</th>
                <th>방문 수</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.timeSeriesData.map((item, index) => (
                <tr key={index}>
                  <td>{item.hour}</td>
                  <td>{item.방문.toLocaleString() ?? 0}회</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>

        {/* 날짜별 방문 추이 */}
        <Section>
          <h2>날짜별 방문 추이</h2>
          <Table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>방문 수</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.dailyVisits.map((item, index) => (
                <tr key={index}>
                  <td>
                    {new Date(item.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td>{item.visits.toLocaleString() ?? 0}회</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>

        {/* 요일별 방문 현황 */}
        <Section>
          <h2>요일별 방문 현황</h2>
          <Table>
            <thead>
              <tr>
                <th>요일</th>
                <th>방문자 수</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.dayVisits.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.visits.toLocaleString() ?? 0}명</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>

        {/* 특정 날짜 시간대별 방문 현황 */}
        {dateTimeRangeData && dateTimeRangeData.length > 0 && (
          <Section>
            <h2>
              특정 날짜 시간대별 방문 현황
              {selectedDate && (
                <span
                  style={{
                    fontSize: "0.9em",
                    color: "#666",
                    marginLeft: "10px",
                  }}
                >
                  ({selectedDate.format("YYYY년 MM월 DD일")})
                </span>
              )}
            </h2>
            <Table>
              <thead>
                <tr>
                  <th>시간</th>
                  <th>방문 횟수</th>
                </tr>
              </thead>
              <tbody>
                {dateTimeRangeData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.hour}</td>
                    <td>{item.count.toLocaleString() ?? 0}회</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
        )}

        {/* Top5 상품 */}
        {processSpecificData.topItems.length > 0 && (
          <Section>
            <h2>인기 상품 Top5</h2>
            <Table>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>상품명</th>
                  <th>판매량</th>
                  <th>비율</th>
                </tr>
              </thead>
              <tbody>
                {processSpecificData.topItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.item}</td>
                    <td>{item.visits.toLocaleString() ?? 0}회</td>
                    <td>{item.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
        )}

        {/* 성공률 */}
        {processSpecificData.successRate &&
          typeof processSpecificData.successRate.success === "number" &&
          typeof processSpecificData.successRate.failure === "number" &&
          (processSpecificData.successRate.success > 0 ||
            processSpecificData.successRate.failure > 0) && (
            <Section>
              <h2>프로세스 성공률</h2>
              <Table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>건수</th>
                    <th>비율</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>성공</td>
                    <td>{processSpecificData.successRate.success}건</td>
                    <td>{processSpecificData.successRate.success}%</td>
                  </tr>
                  <tr>
                    <td>실패</td>
                    <td>{processSpecificData.successRate.failure}건</td>
                    <td>{processSpecificData.successRate.failure}%</td>
                  </tr>
                </tbody>
              </Table>
              <p>총 {processSpecificData.successRate.totalCount}건</p>
            </Section>
          )}

        {/* 메뉴별 방문 비율 */}
        {processSpecificData.menuUsage &&
          processSpecificData.menuUsage.length > 0 && (
            <Section>
              <h2>메뉴별 방문 비율</h2>
              <Table>
                <thead>
                  <tr>
                    <th>메뉴</th>
                    <th>방문 수</th>
                    <th>비율</th>
                  </tr>
                </thead>
                <tbody>
                  {processSpecificData.menuUsage.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.value.toLocaleString() ?? 0}회</td>
                      <td>{item.percent}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>
          )}

        {/* 가격 현황 */}
        {processSpecificData.priceData &&
          typeof processSpecificData.priceData.average === "number" &&
          typeof processSpecificData.priceData.min === "number" &&
          typeof processSpecificData.priceData.max === "number" && (
            <Section>
              <h2>가격 현황</h2>
              <Table>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>금액</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>평균 금액</td>
                    <td>
                      $
                      {processSpecificData.priceData.average.toLocaleString() ??
                        0}
                    </td>
                  </tr>
                  <tr>
                    <td>최저 금액</td>
                    <td>
                      ${processSpecificData.priceData.min.toLocaleString() ?? 0}
                    </td>
                  </tr>
                  <tr>
                    <td>최고 금액</td>
                    <td>
                      ${processSpecificData.priceData.max.toLocaleString() ?? 0}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Section>
          )}
      </PrintContainer>
    );
  }
);

const PrintContainer = styled.div`
  @media screen {
    display: none;
  }
  @media print {
    display: block;
    padding: 20px;
  }
`;

const PrintHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const Section = styled.section`
  margin-bottom: 30px;
  page-break-inside: avoid;

  h2 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #333;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }
`;

export default DashboardPrintTable;
