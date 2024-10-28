import React from "react";
import { Search, ChevronRight, Plus } from "lucide-react";
import * as S from "../styles/format/formatListStyle";

const LogFormatList = ({ onSelect, onCreate }) => {
  const sampleFormats = [
    { id: "1093160", name: "App Log Standard Format 001 - GET" },
    { id: "1093163", name: "App Log Standard Format 002 - POST" },
    { id: "1058849", name: "App Log Sample" },
    { id: "1093159", name: "App Log Sample copy" },
    { id: "1064376", name: "App Save Test" },
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>Data Format 정의</S.Title>
        <S.CreateButton onClick={onCreate}>
          <Plus size={16} />
          생성하기
        </S.CreateButton>
      </S.Header>

      <S.SearchContainer>
        <S.SearchInput placeholder="Format 명" />
        <S.SearchIconWrapper>
          <Search size={16} />
        </S.SearchIconWrapper>
      </S.SearchContainer>

      <S.FormatTable>
        <tbody>
          {sampleFormats.map((format) => (
            <S.FormatRow key={format.id} onClick={() => onSelect(format)}>
              <S.FormatCell>
                <S.FormatContent>
                  <span>{format.name}</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#6b7280",
                    }}
                  >
                    <span style={{ marginRight: "0.5rem" }}>{format.id}</span>
                    <ChevronRight size={16} />
                  </div>
                </S.FormatContent>
              </S.FormatCell>
            </S.FormatRow>
          ))}
        </tbody>
      </S.FormatTable>
    </S.Container>
  );
};

export default LogFormatList;
