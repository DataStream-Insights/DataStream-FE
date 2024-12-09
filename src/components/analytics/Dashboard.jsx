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
  PieChart,
  Pie,
  Treemap,
} from "recharts";
import { useDashboard } from "../../hooks/analytics/useDashboard";
import * as S from "../../styles/analytics/dashboardStyle";
import Loading from "../Loading";
import DashboardHeader from "./DashboardHeader";
import DashboardPrintTable from "./DashboardPrintTable";
import DashboardPrintGraph from "./DashboardPrintGraph";

const Dashboard = () => {
  const printTableRef = useRef(null);
  const printGraphRef = useRef(null);

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
    loadProcessSpecificData,
    selectedGraphs,
    updateGraphSelections,
    appliedGraphs,
  } = useDashboard();

  const handlePrintTable = useReactToPrint({
    contentRef: printTableRef,
    documentTitle: `Dashboard_Table_${new Date().toLocaleDateString()}`,
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

  const handlePrintGraph = useReactToPrint({
    contentRef: printGraphRef,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        html, body {
          width: 210mm;
          height: max-content;
          margin: 0;
          padding: 0;
        }
      }
    `,
  });

  // const handlePrint = useReactToPrint({
  //   contentRef: printRef,
  //   documentTitle: `Dashboard_${new Date().toLocaleDateString()}`,
  //   pageStyle: `
  //     @page {
  //       size: A4 portrait;
  //       margin: 15mm;
  //     }
  //     @media print {
  //       body {
  //         -webkit-print-color-adjust: exact !important;
  //         print-color-adjust: exact !important;
  //       }
  //       .no-print {
  //         display: none !important;
  //       }
  //     }
  //   `,
  // });

  // const handleApply = async (pipelineId, selectedGraphs) => {
  //   try {
  //     await loadProcessSpecificData(pipelineId, selectedGraphs);
  //     refreshDashboard();
  //   } catch (error) {
  //     console.error("Failed to apply dashboard settings:", error);
  //   }
  // };

  const renderErrorMessage = () => (
    <div className="flex items-center justify-center h-[180px] text-gray-500">
      이 프로세스에서는 해당 그래프를 확인할 수 없습니다
    </div>
  );

  if (isLoading) return <Loading />;

  return (
    <S.DashboardContainer>
      <S.Header className="no-print">
        <DashboardHeader
          pipelines={pipelines}
          selectedPipeline={selectedPipeline}
          onPipelineSelect={setSelectedPipeline}
          onApply={loadProcessSpecificData}
          refreshDashboard={refreshDashboard}
          selectedGraphs={selectedGraphs}
          onGraphSelect={updateGraphSelections}
          appliedGraphs={appliedGraphs}
        />
        <div className="flex gap-2">
          {/* <S.RefreshButton onClick={refreshDashboard}>
            <RefreshCw size={16} />
            Refresh
          </S.RefreshButton> */}
          <S.ExportButtons>
            <S.RefreshButton onClick={refreshDashboard}>
              <RefreshCw size={16} />
              Refresh
            </S.RefreshButton>
            <S.TableExportButton onClick={handlePrintTable}>
              <Download size={16} />
              표로 내보내기
            </S.TableExportButton>
            <S.GraphExportButton onClick={handlePrintGraph}>
              <Download size={16} />
              그래프로 내보내기
            </S.GraphExportButton>
          </S.ExportButtons>
        </div>
      </S.Header>

      <div className="screen-only">
        {dashboardData ? (
          <>
            <S.PrintHeader>
              <h1>대시보드 리포트</h1>
              <p>생성일: {new Date().toLocaleDateString()}</p>
            </S.PrintHeader>
            <S.MainContent>
              <S.LeftSection>
                <S.Card height="400px">
                  <S.CardTitle>시간대별 방문 추이</S.CardTitle>
                  <S.SummaryGrid>
                    <S.SummaryItem>
                      <span className="label">방문</span>
                      <span className="value">
                        {dashboardData.summaryData?.시간대별방문추이?.방문.toLocaleString() ||
                          0}
                      </span>
                    </S.SummaryItem>
                  </S.SummaryGrid>
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={dashboardData.timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `${value.toLocaleString()}회`,
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
                            formatter={(value) => [
                              `${value.toLocaleString()}회`,
                              "방문",
                            ]}
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
                          formatter={(value) => [
                            `${value.toLocaleString()}명`,
                            "방문자 수",
                          ]}
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
                            formatter={(value) => `${value.toLocaleString()}명`}
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
                          formatter={(value) => [
                            `${value.toLocaleString()}회`,
                            "방문",
                          ]}
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
              </S.RightSection>
            </S.MainContent>
            <S.DynamicSection>
              {/* 프로세스별 데이터 섹션 */}
              {appliedGraphs.includes(1) && (
                <S.Card height="480px">
                  <S.CardTitle>인기 상품 Top5</S.CardTitle>
                  {processSpecificData?.topItems?.length > 0 ? (
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
                          formatter={(value) => [`${value}%`, "판매"]} // 이 부분만 수정
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
                            dataKey="visits"
                            position="right"
                            formatter={(value, entry) =>
                              `${(value || 0).toLocaleString()}회`
                            }
                            style={{ fill: "#666" }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    renderErrorMessage()
                  )}
                </S.Card>
              )}
              {/* Success Rate Pie Chart */}
              {appliedGraphs.includes(2) && (
                <S.Card height="370px">
                  <S.CardTitle>프로세스 성공률</S.CardTitle>
                  {processSpecificData?.successRate &&
                  typeof processSpecificData.successRate.success === "number" &&
                  typeof processSpecificData.successRate.failure === "number" &&
                  (processSpecificData.successRate.success > 0 ||
                    processSpecificData.successRate.failure > 0) ? (
                    <>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "성공",
                                value:
                                  processSpecificData.successRate.success || 0,
                              },
                              {
                                name: "실패",
                                value:
                                  processSpecificData.successRate.failure || 0,
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ percent }) =>
                              `${(percent * 100).toFixed(1)}%`
                            }
                            outerRadius={80}
                            dataKey="value"
                          >
                            <Cell fill="#4ade80" />
                            <Cell fill="#f87171" />
                          </Pie>
                          <Tooltip
                            formatter={(value, name) => {
                              const formattedValue = value
                                ? Number(value).toLocaleString()
                                : "0";
                              return [
                                `${formattedValue}건`,
                                name === "성공" ? "성공률" : "실패율",
                              ];
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="text-center mt-4">
                        총{" "}
                        {Number(
                          processSpecificData.successRate.totalCount || 0
                        ).toLocaleString()}
                        건
                      </div>
                    </>
                  ) : (
                    renderErrorMessage()
                  )}
                </S.Card>
              )}

              {/* Menu Usage Treemap */}
              {appliedGraphs.includes(3) && (
                <S.Card height="400px">
                  <S.CardTitle>메뉴별 방문 비율</S.CardTitle>
                  {processSpecificData?.menuUsage &&
                  processSpecificData.menuUsage.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <Treemap
                        data={processSpecificData.menuUsage}
                        dataKey="value"
                        aspectRatio={3 / 4}
                        stroke="#fff"
                      >
                        <Tooltip
                          formatter={(value, name, props) => [
                            `${
                              props.payload.percent
                            }% (${value.toLocaleString()}회)`,
                            props.payload.name,
                          ]}
                        />
                        {processSpecificData.menuUsage.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              index === 0
                                ? "#60a5fa" // 상품조회 - 파란색
                                : index === 1
                                ? "#4ade80" // 장바구니 - 초록색
                                : index === 2
                                ? "#f59e0b" // 주문하기 - 주황색
                                : "#f87171" // 결제하기 - 빨간색
                            }
                          />
                        ))}
                      </Treemap>
                    </ResponsiveContainer>
                  ) : (
                    renderErrorMessage()
                  )}
                </S.Card>
              )}

              {appliedGraphs.includes(4) && (
                <S.Card height="240px">
                  <S.CardTitle>가격 현황</S.CardTitle>
                  {processSpecificData?.priceData &&
                  typeof processSpecificData.priceData.average === "number" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: "150px",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            marginBottom: "8px",
                          }}
                        >
                          평균 금액
                        </div>
                        <div
                          style={{
                            fontSize: "1.8rem",
                            fontWeight: "bold",
                            color: "#4B5563",
                          }}
                        >
                          <span style={{ fontSize: "1rem", marginLeft: "4px" }}>
                            $
                          </span>
                          {processSpecificData.priceData.average.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            marginBottom: "8px",
                          }}
                        >
                          최저 금액
                        </div>
                        <div
                          style={{
                            fontSize: "1.8rem",
                            fontWeight: "bold",
                            color: "#3B82F6",
                          }}
                        >
                          <span style={{ fontSize: "1rem", marginLeft: "4px" }}>
                            $
                          </span>
                          {processSpecificData.priceData.min.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            marginBottom: "8px",
                          }}
                        >
                          최고 금액
                        </div>
                        <div
                          style={{
                            fontSize: "1.8rem",
                            fontWeight: "bold",
                            color: "#EF4444",
                          }}
                        >
                          <span style={{ fontSize: "1rem", marginLeft: "4px" }}>
                            $
                          </span>
                          {processSpecificData.priceData.max.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    renderErrorMessage()
                  )}
                </S.Card>
              )}
            </S.DynamicSection>
          </>
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-200px)] text-gray-500">
            데이터를 불러오는 중 오류가 발생했습니다.
          </div>
        )}
      </div>
      {/* 프린트용 컴포넌트 추가 */}
      <div style={{ display: "none" }}>
        <DashboardPrintTable
          ref={printTableRef}
          dashboardData={dashboardData}
          processSpecificData={processSpecificData}
          dateTimeRangeData={dateTimeRangeData}
          selectedDate={selectedDate}
        />
        <DashboardPrintGraph
          ref={printGraphRef}
          dashboardData={dashboardData}
          processSpecificData={processSpecificData}
          dateTimeRangeData={dateTimeRangeData}
          selectedDate={selectedDate}
        />
      </div>
    </S.DashboardContainer>
  );
};

export default Dashboard;
