import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Treemap,
  LabelList,
} from "recharts";

const DashboardPrintGraph = React.forwardRef(
  (
    { dashboardData, processSpecificData, dateTimeRangeData, selectedDate },
    ref
  ) => {
    return (
      <PrintContainer ref={ref}>
        <PrintHeader>
          <h1>대시보드 리포트 (그래프)</h1>
          <p>생성일: {new Date().toLocaleDateString()}</p>
        </PrintHeader>

        <GridContainer>
          {/* 시간대별 방문 추이 */}
          <ChartSection>
            <h2>시간대별 방문 추이</h2>
            <ChartWrapper>
              <LineChart
                width={700}
                height={300}
                data={dashboardData?.timeSeriesData || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `${(value || 0).toLocaleString()}회`,
                    "방문",
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="방문"
                  stroke="#3B82F6"
                  dot={false}
                />
              </LineChart>
            </ChartWrapper>
          </ChartSection>

          {/* 날짜별 방문 추이 */}
          <ChartSection>
            <h2>날짜별 방문 추이</h2>
            <ChartWrapper>
              <AreaChart
                width={700}
                height={300}
                data={dashboardData?.dailyVisits || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient
                    id="visitGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("ko-KR", {
                      month: "numeric",
                      day: "numeric",
                    })
                  }
                />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `${(value || 0).toLocaleString()}회`,
                    "방문",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#38BDF8"
                  fill="url(#visitGradient)"
                />
              </AreaChart>
            </ChartWrapper>
          </ChartSection>

          {/* 요일별 방문 현황 */}
          <ChartSection>
            <h2>요일별 방문 현황</h2>
            <ChartWrapper>
              <BarChart
                width={700}
                height={300}
                data={dashboardData?.dayVisits || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `${(value || 0).toLocaleString()}명`,
                    "방문자 수",
                  ]}
                />
                <Bar dataKey="visits" fill="#818CF8">
                  <LabelList
                    dataKey="visits"
                    position="top"
                    formatter={(value) => `${(value || 0).toLocaleString()}명`}
                  />
                </Bar>
              </BarChart>
            </ChartWrapper>
          </ChartSection>

          {/* 특정 날짜 시간대별 방문 현황 */}
          {dateTimeRangeData && dateTimeRangeData.length > 0 && (
            <ChartSection>
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
              <ChartWrapper>
                <AreaChart
                  width={700}
                  height={300}
                  data={dateTimeRangeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="timeRangeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#67E8F9" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#67E8F9"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `${(value || 0).toLocaleString()}회`,
                      "방문",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#67E8F9"
                    fill="url(#timeRangeGradient)"
                  />
                </AreaChart>
              </ChartWrapper>
            </ChartSection>
          )}

          {/* 인기 상품 Top5 */}
          {processSpecificData?.topItems?.length > 0 && (
            <ChartSection>
              <h2>인기 상품 Top5</h2>
              <ChartWrapper>
                <BarChart
                  width={700}
                  height={300}
                  layout="vertical"
                  data={processSpecificData.topItems}
                  margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="item" width={150} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "판매"]} // 여기 수정
                  />
                  <Bar dataKey="percentage">
                    {processSpecificData.topItems.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`rgba(45, 212, 191, ${1 - index * 0.15})`}
                      />
                    ))}
                    <LabelList
                      dataKey="visits"
                      position="right"
                      formatter={(value, entry) =>
                        `${(value || 0).toLocaleString()}회`
                      }
                    />
                  </Bar>
                </BarChart>
              </ChartWrapper>
            </ChartSection>
          )}

          {/* 프로세스 성공률 */}
          {processSpecificData.successRate &&
            typeof processSpecificData.successRate.success === "number" &&
            typeof processSpecificData.successRate.failure === "number" &&
            (processSpecificData.successRate.success > 0 ||
              processSpecificData.successRate.failure > 0) && (
              <ChartSection>
                <h2>프로세스 성공률</h2>
                <ChartWrapper>
                  <PieChart width={700} height={300}>
                    <Pie
                      data={[
                        {
                          name: "성공",
                          value: processSpecificData.successRate.success,
                        },
                        {
                          name: "실패",
                          value: processSpecificData.successRate.failure,
                        },
                      ]}
                      cx={350}
                      cy={150}
                      innerRadius={60}
                      outerRadius={100}
                      label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                    >
                      <Cell fill="#4ade80" />
                      <Cell fill="#f87171" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ChartWrapper>
              </ChartSection>
            )}

          {/* 메뉴별 방문 비율 */}
          {processSpecificData?.menuUsage?.length > 0 && (
            <ChartSection>
              <h2>메뉴별 방문 비율</h2>
              <ChartWrapper>
                <Treemap
                  width={700}
                  height={300}
                  data={processSpecificData.menuUsage}
                  dataKey="value"
                  aspectRatio={4 / 3}
                  stroke="#fff"
                >
                  <Tooltip
                    formatter={(value, name, entry) => [
                      `${entry?.payload?.percent || 0}% (${(
                        value || 0
                      ).toLocaleString()}회)`,
                      entry?.payload?.name || "",
                    ]}
                  />
                </Treemap>
              </ChartWrapper>
            </ChartSection>
          )}

          {/* 가격 현황 */}
          {processSpecificData?.priceData &&
            typeof processSpecificData.priceData.average === "number" && (
              <ChartSection>
                <h2>가격 현황</h2>
                <ChartWrapper>
                  <BarChart
                    width={700}
                    height={300}
                    data={[
                      {
                        name: "평균 금액",
                        value: processSpecificData.priceData.average || 0,
                      },
                      {
                        name: "최저 금액",
                        value: processSpecificData.priceData.min || 0,
                      },
                      {
                        name: "최고 금액",
                        value: processSpecificData.priceData.max || 0,
                      },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `$${(value || 0).toLocaleString()}`,
                        "",
                      ]}
                    />
                    <Bar dataKey="value">
                      <Cell fill="#4B5563" />
                      <Cell fill="#3B82F6" />
                      <Cell fill="#EF4444" />
                      <LabelList
                        dataKey="value"
                        position="top"
                        formatter={(value) =>
                          `$${(value || 0).toLocaleString()}`
                        }
                      />
                    </Bar>
                  </BarChart>
                </ChartWrapper>
              </ChartSection>
            )}
        </GridContainer>
      </PrintContainer>
    );
  }
);

const PrintContainer = styled.div`
  @media print {
    display: block;
    width: 210mm;
    padding: 20mm;
    background: white;
    margin: 0 auto;
  }
`;

const PrintHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  page-break-after: avoid;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;

const GridContainer = styled.div`
  @media print {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
`;

const ChartSection = styled.section`
  page-break-inside: avoid;
  margin-bottom: 40px;

  h2 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #333;
  }

  @media print {
    margin: 0;
    padding: 20px 0;
  }
`;

const ChartWrapper = styled.div`
  @media print {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    background: white;
    page-break-inside: avoid;
    margin: 0;
  }
`;

export default DashboardPrintGraph;
