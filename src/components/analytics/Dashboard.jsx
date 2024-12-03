import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";
import { Select, DatePicker } from "antd";
import { RefreshCw, Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
  AreaChart,
  Area,
} from "recharts";
import { useDashboard } from "../../hooks/analytics/useDashboard";
import * as S from "../../styles/analytics/dashboardStyle";
import Loading from "../Loading";

const Dashboard = () => {
  const printRef = useRef(null);

  const {
    pipelines,
    selectedPipeline,
    setSelectedPipeline,
    dashboardData,
    processSpecificData,
    isLoading,
    refreshDashboard,
    dateTimeRangeData,
    handleDateSelect,
    selectedDate,
  } = useDashboard();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Dashboard_${new Date().toLocaleDateString()}`,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 15mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  if (isLoading) return <Loading />;

  return (
    <S.DashboardContainer>
      <S.Header className="no-print">
        <S.DropdownContainer>
          <Select
            style={{ width: "100%" }}
            value={
              selectedPipeline
                ? pipelines.find((p) => p.id === selectedPipeline)?.pipelineName
                : undefined
            }
            onChange={(_, option) => setSelectedPipeline(option.data.id)}
            placeholder="프로세스를 선택하세요"
            options={pipelines.map((p) => ({
              value: p.pipelineName,
              label: p.pipelineName,
              data: p,
            }))}
          />
        </S.DropdownContainer>
        <div className="flex gap-2">
          <S.RefreshButton onClick={refreshDashboard}>
            <RefreshCw size={16} />
            Refresh
          </S.RefreshButton>
          <ExportButton onClick={handlePrint}>
            <Download size={16} />
            PDF 내보내기
          </ExportButton>
        </div>
      </S.Header>

      <PrintContent ref={printRef}>
        {dashboardData ? (
          <>
            <PrintHeader>
              <h1>대시보드 리포트</h1>
              <p>생성일: {new Date().toLocaleDateString()}</p>
            </PrintHeader>
            <S.MainContent>
              <S.LeftSection>
                <S.Card height="400px">
                  <S.CardTitle>시간대별 방문 추이</S.CardTitle>
                  <S.SummaryGrid>
                    <S.SummaryItem>
                      <span className="label">방문</span>
                      <span className="value">
                        {dashboardData.summaryData?.시간대별방문추이?.방문 || 0}
                      </span>
                    </S.SummaryItem>
                  </S.SummaryGrid>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={dashboardData.timeSeriesData}>
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
                  </ResponsiveContainer>
                </S.Card>

                <S.BottomSection>
                  <S.Card height="300px">
                    <S.CardTitle>날짜별 방문 추이</S.CardTitle>
                    <div style={{ flex: 1 }}>
                      <ResponsiveContainer width="100%" height={220}>
                        <AreaChart
                          data={dashboardData.dailyVisits}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="visitGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#38BDF8"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#38BDF8"
                                stopOpacity={0.1}
                              />
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
                          <Tooltip
                            formatter={(value) => [`${value}회`, "방문"]}
                            labelFormatter={(date) =>
                              new Date(date).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            }
                          />
                          <Area
                            type="monotone"
                            dataKey="visits"
                            stroke="#38BDF8"
                            fillOpacity={1}
                            fill="url(#visitGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </S.Card>
                  <S.Card height="300px">
                    <S.CardTitle>요일별 방문 현황</S.CardTitle>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={dashboardData.dayVisits}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="day"
                          tick={{ fill: "#666", fontSize: 12 }}
                          height={50}
                        />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value}명`, "방문자 수"]}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                          }}
                        />
                        <Bar
                          dataKey="visits"
                          fill="#818CF8"
                          radius={[4, 4, 0, 0]}
                        >
                          <LabelList
                            dataKey="visits"
                            position="top"
                            formatter={(value) => `${value}명`}
                            style={{ fill: "#666" }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </S.Card>
                </S.BottomSection>
              </S.LeftSection>

              <S.RightSection>
                <S.Card height="250px">
                  <S.CardTitle>
                    <div className="flex justify-between items-center">
                      <span>특정 날짜 시간대별 방문 현황</span>
                      <DatePicker
                        value={selectedDate}
                        onChange={handleDateSelect}
                        placeholder="날짜를 선택하세요"
                        style={{ width: 200 }}
                      />
                    </div>
                  </S.CardTitle>
                  {!dateTimeRangeData ? (
                    <div className="flex items-center justify-center h-[180px] text-gray-500">
                      원하는 날짜를 선택하세요
                    </div>
                  ) : dateTimeRangeData.length === 0 ? (
                    <div className="flex items-center justify-center h-[180px] text-gray-500">
                      선택한 날짜에 데이터가 없습니다
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart
                        data={dateTimeRangeData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="timeRangeGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#67E8F9"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#67E8F9"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                          formatter={(value) => [`${value}회`, "방문"]}
                          labelFormatter={(label) => `${label} 시`}
                        />
                        <Area
                          type="monotone"
                          dataKey="count"
                          stroke="#67E8F9"
                          fill="url(#timeRangeGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </S.Card>
                {/* 프로세스별 데이터 섹션 */}
                {processSpecificData.topItems.length > 0 && (
                  <S.Card height="500px">
                    <S.CardTitle>인기 상품 Top5</S.CardTitle>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        layout="vertical"
                        data={processSpecificData.topItems}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis
                          type="number"
                          tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                          type="category"
                          dataKey="item"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                          formatter={(value, name, props) => [
                            `${props.payload.visits} (${value}%)`,
                            "판매",
                          ]}
                        />
                        <Bar
                          dataKey="percentage"
                          animationBegin={0}
                          animationDuration={1000}
                          animationEasing="ease-out"
                        >
                          {processSpecificData.topItems.map((entry, index) => (
                            <Cell
                              key={`cell-item-${index}`}
                              fill={`rgba(45, 212, 191, ${1 - index * 0.15})`}
                              radius={[0, 4, 4, 0]}
                            />
                          ))}
                          <LabelList
                            dataKey="percentage"
                            position="right"
                            formatter={(value) => `${value}%`}
                            style={{ fill: "#666" }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </S.Card>
                )}

                {/* 여기에 추후 다른 프로세스별 그래프들이 추가될 수 있음 */}
              </S.RightSection>
            </S.MainContent>
          </>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-200px)] text-gray-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        )}
        {/* 프린트용 숨겨진 대시보드 */}
        {/* <div style={{ display: "none" }}>
          <div
            ref={componentRef}
            style={{ backgroundColor: "white", padding: "20px" }}
          >
            {dashboardData && (
              <>
                <PrintHeader>
                  <h1>대시보드 리포트</h1>
                  <p>생성일: {new Date().toLocaleDateString()}</p>
                </PrintHeader>
                <div style={{ display: "block" }}>
                  <S.MainContent>
                  </S.MainContent>
                </div>
              </>
            )}
          </div>
        </div> */}
      </PrintContent>
    </S.DashboardContainer>
  );
};

const PrintContent = styled.div`
  background-color: white;
  padding: 20px;
  width: 100%;
`;

const PrintHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;

  @media screen {
    display: none;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  p {
    color: #666;
  }
`;

const ExportButton = styled(S.RefreshButton)`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

export default Dashboard;
