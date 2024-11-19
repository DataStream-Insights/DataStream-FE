import React from "react";
import { X } from "lucide-react";
import * as S from "../../styles/format/formatDetailStyle";
import { useNavigate } from "react-router-dom";

const LogFormatView = ({ onClose, selectedFormat, fields, campaignId }) => {
  const navigate = useNavigate();

  const handleFilterClick = () => {
    if (!selectedFormat?.formatID) {
      alert("포맷 정보를 찾을 수 없습니다.");
      return;
    }

    navigate(
      `/filter/${campaignId}/${selectedFormat.formatID}/filtermanagement`
    );
  };

  return (
    <S.Container>
      <S.Card>
        <S.Header>
          <S.Title>{selectedFormat?.formatname || ""} 상세 정보</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.Header>

        {/* Format 정보 섹션 */}
        <S.Section>
          <S.InfoGroup>
            <S.InfoLabel>이름</S.InfoLabel>
            <S.InfoText>{selectedFormat?.formatname || "-"}</S.InfoText>
          </S.InfoGroup>
          <S.InfoGroup>
            <S.InfoLabel>설명</S.InfoLabel>
            <S.InfoText>{selectedFormat?.formatexplain || "-"}</S.InfoText>
          </S.InfoGroup>
        </S.Section>

        {/* 필드 테이블 */}
        <S.TableContainer>
          <S.Table>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <S.Thead>
              <tr>
                <S.Th>Field 명</S.Th>
                <S.Th>Item 표시 명</S.Th>
                <S.Th>Item 설명</S.Th>
                <S.Th>Item 타입</S.Th>
                <S.Th>Item 컨텐츠 예시</S.Th>
              </tr>
            </S.Thead>
            <tbody>
              {fields.map((field, index) => {
                const level = field.path ? field.path.split(".").length - 1 : 0;
                return (
                  <tr key={index}>
                    <S.Td>
                      <div style={{ paddingLeft: `${level * 20}px` }}>
                        <S.TableText>{field.name}</S.TableText>
                      </div>
                    </S.Td>
                    <S.Td>
                      <S.TableText>{field.displayName}</S.TableText>
                    </S.Td>
                    <S.Td>
                      <S.TableText>{field.description}</S.TableText>
                    </S.Td>
                    <S.Td>
                      <S.TableText>{field.type}</S.TableText>
                    </S.Td>
                    <S.Td>
                      <S.TableText>{field.value}</S.TableText>
                    </S.Td>
                  </tr>
                );
              })}
            </tbody>
          </S.Table>
        </S.TableContainer>

        <S.ButtonContainer>
          <S.Button onClick={onClose}>닫기</S.Button>
        </S.ButtonContainer>
        <S.ButtonContainer align="center">
          <S.FilterButton onClick={handleFilterClick}>필터링</S.FilterButton>
        </S.ButtonContainer>
      </S.Card>
    </S.Container>
  );
};

export default LogFormatView;
