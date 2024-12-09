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
  ResponsiveContainer,
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

        <Section>
          <h2>시간대별 방문 추이</h2>
          <ChartContainer>
            <LineChart
              width={800} // 큰 너비 지정
              height={350} // PDF에 맞는 높이
              data={dashboardData.timeSeriesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="방문"
                stroke="#3B82F6"
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </Section>

        <Section>
          <h2>날짜별 방문 추이</h2>
          <ChartContainer>
            <AreaChart
              width={600}
              height={300}
              data={dashboardData.dailyVisits}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
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
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#38BDF8"
                fillOpacity={1}
                fill="url(#visitGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </Section>

        {processSpecificData.topItems.length > 0 && (
          <Section>
            <h2>인기 상품 Top5</h2>
            <ChartContainer>
              <BarChart
                width={600}
                height={300}
                layout="vertical"
                data={processSpecificData.topItems}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis type="category" dataKey="item" width={150} />
                <Tooltip />
                <Bar dataKey="visits">
                  {processSpecificData.topItems.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`rgba(45, 212, 191, ${1 - index * 0.15})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </Section>
        )}

        {processSpecificData.successRate && (
          <Section>
            <h2>프로세스 성공률</h2>
            <ChartContainer>
              <PieChart width={400} height={300}>
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
                  cx={200}
                  cy={150}
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  <Cell fill="#4ade80" />
                  <Cell fill="#f87171" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ChartContainer>
          </Section>
        )}
      </PrintContainer>
    );
  }
);

const PrintContainer = styled.div`
  @media print {
    display: block;
    width: 100%;
    max-width: 210mm; // A4 너비
    margin: 0 auto;
    padding: 20mm;
    background: white;
    page-break-after: always;
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
  margin-bottom: 40px;
  page-break-inside: avoid;
  width: 100%;

  @media print {
    margin: 20px 0;
    padding: 0;
    height: auto;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 400px; // 고정 높이 지정
  margin: 20px 0;
  page-break-inside: avoid;

  @media print {
    width: 100% !important;
    height: 350px !important; // PDF용 높이 지정
    margin: 0 auto;
    display: block;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  page-break-inside: avoid;
`;

export default DashboardPrintGraph;
