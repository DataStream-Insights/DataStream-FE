import React, { useState } from "react";

import {
  ChevronLeft,
  Database,
  FileText,
  BarChart2,
  Layout,
  PieChart,
  ClipboardList,
} from "lucide-react";
import * as S from "../styles/sidebarStyle";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      title: "데이트세트",
      icon: <Database size={20} />,
      subItems: ["내 데이트세트"],
    },
    {
      title: "세그먼트",
      icon: <PieChart size={20} />,
      subItems: ["세그먼트 분석", "세그먼트 관리"],
    },
    {
      title: "어트리뷰션",
      icon: <BarChart2 size={20} />,
      subItems: ["사용자분석", "이용자분석"],
    },
    {
      title: "원본분석",
      icon: <FileText size={20} />,
      subItems: [
        "방문분석",
        "페이지분석",
        "유입분석",
        "컨텐츠분석",
        "매출분석",
      ],
    },
    {
      title: "고급분석",
      icon: <Layout size={20} />,
      subItems: ["고급분석"],
    },
    {
      title: "AI 분석",
      icon: <ClipboardList size={20} />,
      subItems: ["예측모델 관리"],
    },
  ];

  return (
    <S.SidebarContainer collapsed={collapsed}>
      <S.SidebarHeader>
        <S.LogoText collapsed={collapsed}>Logify</S.LogoText>
        <S.CollapseButton onClick={() => setCollapsed(!collapsed)}>
          <ChevronLeft
            style={{
              transform: collapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.3s",
            }}
          />
        </S.CollapseButton>
      </S.SidebarHeader>

      <S.MenuContainer>
        {menuItems.map((item, index) => (
          <S.MenuItem key={index}>
            <S.MenuItemHeader>
              {item.icon}
              {!collapsed && <S.MenuItemText>{item.title}</S.MenuItemText>}
            </S.MenuItemHeader>
            {!collapsed && (
              <S.SubMenuContainer>
                {item.subItems.map((subItem, subIndex) => (
                  <S.SubMenuItem key={subIndex}>{subItem}</S.SubMenuItem>
                ))}
              </S.SubMenuContainer>
            )}
          </S.MenuItem>
        ))}
      </S.MenuContainer>
    </S.SidebarContainer>
  );
};

export default Sidebar;
