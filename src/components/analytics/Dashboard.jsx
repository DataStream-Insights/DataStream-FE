import React, { useRef, useState, useEffect } from "react";
import { Select } from "antd";
import { RefreshCw } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  LabelList,
} from "recharts";
import { useDashboard } from "../../hooks/analytics/useDashboard";
import * as S from "../../styles/analytics/dashboardStyle";
import Loading from "../Loading";

const COLORS = ["#1890ff", "#69c0ff", "#91d5ff"];

const Dashboard = () => {
  const {
    pipelines,
    selectedPipeline,
    setSelectedPipeline,
    dashboardData,
    refreshDashboard,
  } = useDashboard();

  if (!dashboardData) return <Loading />;

  return (
    <S.DashboardContainer>
      <S.Header>
        <S.DropdownContainer>
          <Select
            style={{ width: "100%" }}
            value={selectedPipeline}
            onChange={setSelectedPipeline}
            options={pipelines.map((p) => ({
              value: p.pipelineId,
              label: p.pipelineName,
            }))}
          />
        </S.DropdownContainer>
        <S.RefreshButton onClick={refreshDashboard}>
          <RefreshCw size={16} />
          Refresh
        </S.RefreshButton>
      </S.Header>

      <S.MainContent>
        <S.LeftSection>
          <S.Card height="250px">
            <S.CardTitle>시간대별 방문 추이</S.CardTitle>
            <S.SummaryGrid>
              <S.SummaryItem>
                <span className="label">방문/방문자</span>
                <span className="value">
                  {dashboardData.summaryData?.시간대별방문추이?.방문 || 0} /{" "}
                  {dashboardData.summaryData?.시간대별방문추이?.방문자 || 0}
                </span>
              </S.SummaryItem>
              <S.SummaryItem>
                <span className="label">페이지뷰</span>
                <span className="value">
                  {dashboardData.summaryData?.페이지뷰 || 0}
                </span>
              </S.SummaryItem>
              <S.SummaryItem>
                <span className="label">체류시간</span>
                <span className="value">
                  {dashboardData.summaryData?.체류시간 || "0초"}
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
                  stroke="#1890ff"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="방문자"
                  stroke="#52c41a"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </S.Card>

          <S.BottomSection>
            <S.Card height="300px">
              <S.CardTitle>신규방문 vs 재방문</S.CardTitle>
              <div style={{ flex: 1 }}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Tooltip /> {/* Tooltip 추가 */}
                    <Pie
                      data={[
                        {
                          name: "신규방문",
                          value: dashboardData.statusDistribution.신규방문,
                        },
                        {
                          name: "재방문",
                          value: dashboardData.statusDistribution.재방문,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius="70%"
                      outerRadius="90%"
                      paddingAngle={3}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1000}
                      animationEasing="ease-out"
                    >
                      {[0, 1].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="top"
                      align="right"
                      wrapperStyle={{
                        paddingTop: "0px",
                        paddingRight: "0px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </S.Card>

            <S.Card height="250px">
              <S.CardTitle>브라우저 점유율</S.CardTitle>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart
                  layout="vertical"
                  data={[
                    { name: "Chrome", value: 74 },
                    { name: "Firefox", value: 15 },
                    { name: "Safari", value: 11 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip /> {/* Tooltip 추가 */}
                  <Bar
                    dataKey="value"
                    fill="#1890ff"
                    radius={[0, 4, 4, 0]}
                    animationBegin={0}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    <LabelList
                      dataKey="value"
                      position="right"
                      formatter={(value) => `${value}%`}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </S.Card>
          </S.BottomSection>
        </S.LeftSection>

        <S.RightSection>
          <S.Card height="300px">
            <S.CardTitle>많이 찾는 페이지 Top5</S.CardTitle>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                layout="vertical"
                data={dashboardData.topPages}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="page" tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name, props) => [
                    `${props.payload.visits} (${value}%)`,
                    "방문",
                  ]}
                />
                <Bar
                  dataKey="percentage"
                  animationBegin={0}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {dashboardData.topPages.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`rgba(24, 144, 255, ${1 - index * 0.15})`}
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

          <S.Card height="300px">
            <S.CardTitle>인기 상품 Top5</S.CardTitle>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                layout="vertical"
                data={dashboardData.topItems}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="item" tick={{ fontSize: 12 }} />
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
                  {dashboardData.topItems.map((entry, index) => (
                    <Cell
                      key={`cell-item-${index}`}
                      fill={`rgba(114, 46, 209, ${1 - index * 0.15})`}
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
        </S.RightSection>
      </S.MainContent>
    </S.DashboardContainer>
  );
};

export default Dashboard;
