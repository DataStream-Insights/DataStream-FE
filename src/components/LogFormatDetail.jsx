import React, { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import * as S from "../styles/format/formatDetailStyle";
import useLogFormat from "../hooks/format/useFormatData";

const LogFormatDetail = ({ onClose, isNew = false }) => {
  const {
    logFiles,
    fields,
    selectedFileName,
    isLoading,
    selectLogFile,
    createFormat,
    updateField,
  } = useLogFormat();

  const [fileFormat, setFileFormat] = useState("JSONFile");
  const [substringType, setSubstringType] = useState("Substring");
  const [startType, setStartType] = useState("indexOf");
  const [startValue, setStartValue] = useState("{");
  const [startOffset, setStartOffset] = useState(0);
  const [endType, setEndType] = useState("lastIndex");
  const [endValue, setEndValue] = useState("}");
  const [endOffset, setEndOffset] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // 파일 선택 핸들러
  const handleLogFileSelect = async (e) => {
    const fileName = e.target.value;
    try {
      await selectLogFile(fileName);
    } catch (error) {
      console.error("Failed to select log file:", error);
    }
  };

  // 체크박스 상태 변경
  const handleCheckboxChange = (index, field) => {
    updateField(index, { [field]: !fields[index][field] });
  };

  // 필드 입력값 변경
  const handleFieldInputChange = (index, field, value) => {
    updateField(index, { [field]: value });
  };

  // 최종 저장
  const handleSubmit = async () => {
    try {
      const formatData = {
        name: formData.name,
        description: formData.description,
        fileFormat,
        substringType,
        startType,
        startValue,
        startOffset,
        endType,
        endValue,
        endOffset,
        fields,
      };

      await createFormat(formatData);
      onClose();
    } catch (error) {
      console.error("Failed to create format:", error);
    }
  };

  return (
    <S.Container>
      <S.Card>
        <S.Header>
          <S.Title>필드 설정 정보</S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.Header>

        {/* 파일 선택 섹션 */}
        <S.Section>
          <S.Label>로그 파일 선택</S.Label>
          <S.Select
            value={selectedFileName || ""}
            onChange={handleLogFileSelect}
          >
            <option value="">파일을 선택하세요</option>
            {logFiles.map((fileName) => (
              // name만 있어도 됨
              <option key={fileName} value={fileName}>
                {file.name}
              </option>
            ))}
          </S.Select>
        </S.Section>

        {/* Log 서브스트링 섹션 */}
        <S.Section>
          <S.Label>Log 서브 스트링</S.Label>
          <S.LogStyleRow>
            <S.StyleSelect
              value={substringType}
              onChange={(e) => setSubstringType(e.target.value)}
            >
              <option>Substring</option>
              <option>Split</option>
            </S.StyleSelect>
            <S.Label style={{ minWidth: "40px" }}>시작</S.Label>
            <S.StyleSelect
              value={startType}
              onChange={(e) => setStartType(e.target.value)}
            >
              <option>indexOf</option>
            </S.StyleSelect>
            <S.Input
              value={startValue}
              onChange={(e) => setStartValue(e.target.value)}
            />
            <S.NumberInput
              type="number"
              value={startOffset}
              onChange={(e) => setStartOffset(Number(e.target.value))}
            />
          </S.LogStyleRow>
          <S.LogStyleRow>
            <div style={{ minWidth: "120px" }} />
            <S.Label style={{ minWidth: "40px" }}>끝</S.Label>
            <S.StyleSelect
              value={endType}
              onChange={(e) => setEndType(e.target.value)}
            >
              <option>lastIndex</option>
            </S.StyleSelect>
            <S.Input
              value={endValue}
              onChange={(e) => setEndValue(e.target.value)}
            />
            <S.NumberInput
              type="number"
              value={endOffset}
              onChange={(e) => setEndOffset(Number(e.target.value))}
            />
          </S.LogStyleRow>
        </S.Section>

        {/* 파일 포맷 섹션 */}
        <S.Section>
          <S.Label>파일 형식</S.Label>
          <S.Select
            value={fileFormat}
            onChange={(e) => setFileFormat(e.target.value)}
          >
            <option>JSONFile</option>
            <option>CSV</option>
            <option>XML</option>
          </S.Select>
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
              <col style={{ width: "7%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "9%" }} />
            </colgroup>
            <S.Thead>
              <tr>
                <S.Th>Field 명</S.Th>
                <S.Th>Item 표시 명</S.Th>
                <S.Th>Item 설명</S.Th>
                <S.Th>Item 타입</S.Th>
                <S.Th>Item 컨텐츠 예시</S.Th>
                <S.Th style={{ textAlign: "center" }}>디코드여부</S.Th>
                <S.Th style={{ textAlign: "center" }}>Log 분할여부</S.Th>
                <S.Th></S.Th>
              </tr>
            </S.Thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index}>
                  <S.Td>
                    <S.TableText>{field.name}</S.TableText>
                  </S.Td>
                  <S.Td>
                    <S.TableInput
                      value={field.displayName || ""}
                      onChange={(e) =>
                        handleFieldInputChange(
                          index,
                          "displayName",
                          e.target.value
                        )
                      }
                    />
                  </S.Td>
                  <S.Td>
                    <S.TableInput
                      value={field.description || ""}
                      onChange={(e) =>
                        handleFieldInputChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </S.Td>
                  <S.Td>
                    <S.TableSelect
                      value={field.type}
                      onChange={(e) =>
                        handleFieldInputChange(index, "type", e.target.value)
                      }
                    >
                      <option>STRING</option>
                      <option>FLOAT</option>
                      <option>INTEGER</option>
                    </S.TableSelect>
                  </S.Td>
                  <S.Td>
                    <S.TableText>{field.value}</S.TableText>
                  </S.Td>
                  <S.Td style={{ textAlign: "center" }}>
                    <S.Checkbox
                      checked={field.decode}
                      onChange={() => handleCheckboxChange(index, "decode")}
                    />
                  </S.Td>
                  <S.Td style={{ textAlign: "center" }}>
                    <S.TableText>{field.split}</S.TableText>
                  </S.Td>
                  <S.Td>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "center",
                      }}
                    >
                      <S.ActionButton
                        onClick={() =>
                          handleFieldInputChange(index, "split", !field.split)
                        }
                      >
                        <Plus size={16} />
                      </S.ActionButton>
                      <S.ActionButton onClick={() => updateField(index, null)}>
                        <Trash2 size={16} />
                      </S.ActionButton>
                    </div>
                  </S.Td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.TableContainer>

        {/* 이름과 설명 입력 섹션 */}
        <S.Section>
          <S.FormGrid>
            <S.FormGroup>
              <S.Label>이름</S.Label>
              <S.Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Log Format A"
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>설명</S.Label>
              <S.Input
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Log Format A"
              />
            </S.FormGroup>
          </S.FormGrid>
        </S.Section>

        <S.ButtonContainer>
          <S.Button onClick={handleSubmit}>적용</S.Button>
        </S.ButtonContainer>
      </S.Card>
    </S.Container>
  );
};

export default LogFormatDetail;
