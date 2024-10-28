import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import * as S from "../styles/format/formatListStyle";

const LogFormatList = ({ onSelect, onCreate, isDetailVisible }) => {
  const [searchTerm, setSearchTerm] = useState("");

  //샘플 데이터 - 추후 수정
  const sampleFormats = [
    { id: "1064376", name: "App Save Test", description: "App Save Test" },
    { id: "1064371", name: "App Test 000001", description: "App Test 000001" },
    { id: "1218116", name: "ArrayLog_Test", description: "" },
    { id: "1220612", name: "ArrayLog_Test_2", description: "" },
    { id: "1075862", name: "EAI 테스트", description: "EAI 테스트" },
    { id: "1081804", name: "EAI 테스트22", description: "22" },
    { id: "1217815", name: "LOCA GA3 FORMAT", description: "LOCA GA3 FORMAT" },
  ];

  const handleSearch = () => {
    // 검색 로직 구현해야 함
    console.log("Searching for:", searchTerm);
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTop>
          <S.Title>Data Format 정의</S.Title>
          {!isDetailVisible && ( // detail이 보이지 않을 때만 버튼 표시
            <S.CreateButton onClick={onCreate}>
              <Plus size={16} />
              생성하기
            </S.CreateButton>
          )}
        </S.HeaderTop>
        <S.SubTitle>Log Format 관리</S.SubTitle>
        <S.SearchContainer>
          <S.SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Format 명"
          />
          <S.SearchButton onClick={handleSearch}>
            <Search size={20} />
          </S.SearchButton>
        </S.SearchContainer>
      </S.Header>

      <S.Table>
        <thead>
          <S.TableHeader>
            <th>Format 명</th>
            <th>Format ID</th>
          </S.TableHeader>
        </thead>
        <tbody>
          {/* 데이터 매핑해서 리스트에 보여줌 */}
          {sampleFormats.map((format) => (
            <S.TableRow key={format.id} onClick={() => onSelect(format)}>
              <S.TableCell>{format.name}</S.TableCell>
              <S.TableCell>
                <div className="id-cell">
                  {format.id}
                  <span className="description">{format.description}</span>
                </div>
              </S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>
    </S.Container>
  );
};

export default LogFormatList;
