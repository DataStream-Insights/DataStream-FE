import React from "react";
import { Layout } from "antd";
import { BarChart2, SlidersHorizontal, FileType, Cog } from "lucide-react";
import * as S from "../styles/HomeStyle";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <BarChart2 className="w-12 h-12 mb-4 text-blue-600" />,
      title: "Campaign",
      description: "Data Analysis Dashboard",
      path: "/campaign",
    },
    {
      icon: <FileType className="w-12 h-12 mb-4 text-green-600" />,
      title: "Format",
      description: "Log Format Settings",
      path: "/format",
    },
    {
      icon: <SlidersHorizontal className="w-12 h-12 mb-4 text-purple-600" />,
      title: "Filter",
      description: "Custom Data Filters",
      path: "/filter/filtermanagement",
    },
    {
      icon: <Cog className="w-12 h-12 mb-4 text-orange-600" />,
      title: "Process",
      description: "Analysis Configuration",
      path: "/process",
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <S.HeroSection>
        <S.HeroBackground />
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1620121692029-d088224ddc74')`,
          }}
        />
        <S.HeroContent>
          <h1 className="text-4xl font-bold mb-4">
            Log Data Analytics Platform
          </h1>
          <p className="text-xl mb-8">Advanced Analysis for Your System Logs</p>
          <button
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
            onClick={() => navigate("/analytics")}
          >
            Start Analysis
          </button>
        </S.HeroContent>
      </S.HeroSection>

      <S.MenuGrid>
        {menuItems.map((item, index) => (
          <S.MenuItem
            key={index}
            onClick={() => navigate(item.path)}
            className="cursor-pointer"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </S.MenuItem>
        ))}
      </S.MenuGrid>
    </Layout>
  );
};

export default HomePage;
