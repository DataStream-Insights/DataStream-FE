import React, { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import * as S from "../../styles/format/formatDetailStyle";
import { useNavigate } from "react-router-dom";

const LogFormatDetail = ({
  onClose,
  onSubmit,
  isNew = false,
  selectedFormat,
  logFiles,
  fields,
  setFields,
  selectedFileName,
  selectLogFile,
  createFormat,
  analyzeFormat,
  analyzeSubFields,
  updateField,
  addNewField,
  campaignId,
}) => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState(new Set());
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

  useEffect(() => {
    if (!isNew && selectedFormat) {
      console.log("Setting form data from selectedFormat:", selectedFormat);
      setFormData({
        name: selectedFormat.formatname || "",
        description: selectedFormat.formatexplain || "",
      });
      setStartOffset(selectedFormat.start || 0);
      setEndOffset(selectedFormat.end || 0);
    } else if (isNew) {
      // 새로운 폼일 경우 초기화
      setFormData({
        name: "",
        description: "",
      });
      setStartOffset(0);
      setEndOffset(1);
      setFields([]); // 필드도 초기화
    }
  }, [selectedFormat, isNew, setFields]);

  //필터링 클릭 시
  const handleFilterClick = () => {
    if (!selectedFormat?.formatID) {
      alert("포맷 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      navigate(
        `/filter/${campaignId}/${selectedFormat.formatID}/filtermanagement`
      );
    } catch (error) {
      console.error("Navigation error:", error); // 에러 발생시 로깅
    }
  };

  // 파일 선택 핸들러
  const handleLogFileSelect = (e) => {
    const fileName = e.target.value;
    selectLogFile(fileName);
  };

  // 토글 클릭 시 실행되는 핸들러
  const handleToggleClick = async (field, index) => {
    const rowKey = `${index}-${field.name}`;
    const newExpandedRows = new Set(expandedRows);

    if (expandedRows.has(rowKey)) {
      newExpandedRows.delete(rowKey);
      setFields((currentFields) =>
        currentFields.filter((f) => !f.path.startsWith(field.path + "."))
      );
    } else {
      try {
        const response = await analyzeSubFields({
          title: selectedFileName,
          path: field.path,
        });

        setFields((currentFields) => {
          const insertIndex =
            currentFields.findIndex((f) => f.path === field.path) + 1;
          const newSubFields = response.map((subField) => ({
            name: subField.name,
            path: subField.path,
            hasChild: subField.hasChild,
            value: subField.value,
            // 중요: 기존 데이터의 속성명을 itemAlias 등으로 저장
            displayName: subField.item_alias || "",
            description: subField.item_explain || "",
            type: subField.item_type || "STRING",
            itemAlias: subField.item_alias,
            itemExplain: subField.item_explain,
            itemType: subField.item_type,
            isUserCreated: false, // 토글로 열린 항목은 기본적으로 false
          }));

          return [
            ...currentFields.slice(0, insertIndex),
            ...newSubFields,
            ...currentFields.slice(insertIndex),
          ];
        });

        newExpandedRows.add(rowKey);
      } catch (error) {
        console.error("Failed to fetch sub fields:", error);
      }
    }

    setExpandedRows(newExpandedRows);
  };

  // 포맷 적용 핸들러
  const handleFormatApply = async () => {
    if (!selectedFileName) {
      alert("파일을 선택해주세요.");
      return;
    }

    try {
      const analysisData = {
        fileName: selectedFileName,
        startOffset,
        endOffset,
      };
      console.log("포맷 데이터:", analysisData);

      await analyzeFormat(analysisData);
    } catch (error) {
      console.error("Failed to apply format:", error);
    }
  };

  // 필드 입력값 변경 시 path 업데이트 처리
  const handleFieldInputChange = (index, field, value) => {
    if (field === "name") {
      const currentField = fields[index];
      const parentPath = currentField.path.split(".");
      parentPath.pop(); // 마지막 세그먼트 제거

      // 새로운 path 생성
      const newPath =
        parentPath.length > 0 ? `${parentPath.join(".")}.${value}` : value;

      // 현재 필드와 그 하위 필드들의 path 업데이트
      setFields((prevFields) => {
        const newFields = [...prevFields];
        const oldPath = currentField.path;

        // 현재 필드와 모든 하위 필드의 path 업데이트
        for (let i = index; i < newFields.length; i++) {
          if (
            i === index ||
            (newFields[i].path && newFields[i].path.startsWith(oldPath + "."))
          ) {
            newFields[i] = {
              ...newFields[i],
              path:
                i === index
                  ? newPath
                  : newFields[i].path.replace(oldPath, newPath),
            };
          }
        }

        return newFields;
      });
    }

    updateField(index, { [field]: value });
  };

  const handleAddField = (index, parentPath) => {
    const currentField = fields[index];
    const currentLevel = parentPath ? parentPath.split(".").length : 0;

    // 새로운 필드 생성 - isUserInput 플래그 추가
    const newField = {
      name: "",
      value: "",
      displayName: "",
      description: "",
      type: "STRING",
      isUserCreated: true,
      isUserInput: true, // 이 플래그를 추가하여 입력 가능하도록 설정
      path: parentPath || "",
      hasChild: false,
    };

    // 같은 레벨의 다음 필드를 찾기 위한 함수
    const findNextSiblingIndex = (startIndex, level) => {
      for (let i = startIndex + 1; i < fields.length; i++) {
        const fieldLevel = fields[i].path
          ? fields[i].path.split(".").length
          : 0;
        if (fieldLevel <= level) {
          return i;
        }
      }
      return fields.length;
    };

    // 새 필드가 삽입될 위치 결정
    const insertIndex = findNextSiblingIndex(index, currentLevel);

    // 필드 배열 업데이트
    setFields((prevFields) => [
      ...prevFields.slice(0, insertIndex),
      newField,
      ...prevFields.slice(insertIndex),
    ]);
  };

  // 저장/수정 버튼 클릭 시
  const handleSubmit = async () => {
    try {
      const formatData = {
        name: formData.name,
        description: formData.description,
        startOffset,
        endOffset,
        fields: fields.map((field) => ({
          value: field.value,
          path: field.path,
          displayName: field.displayName || field.name,
          description: field.description,
          type: field.type,
        })),
      };

      console.log("제출할 데이터:", formatData);
      if (!isNew) {
        // 수정 시에는 ID도 함께 전달
        await onSubmit({
          ...formatData,
          formatID: selectedFormat.formatID, // 기존 ID 유지
        });
      } else {
        // 새로 생성할 때는 createFormat 사용
        await createFormat(formatData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to submit format:", error);
    }
  };

  return (
    <S.Container>
      <S.Card>
        <S.Header>
          <S.Title>
            {isNew
              ? "필드 설정 정보"
              : `${selectedFormat?.formatname || ""} 상세 정보`}
          </S.Title>
          <S.CloseButton onClick={onClose}>
            <X size={20} />
          </S.CloseButton>
        </S.Header>

        {/* 파일 선택 섹션 */}
        {isNew && (
          <S.Section>
            <S.Label>로그 파일 선택</S.Label>
            <S.Select
              value={selectedFileName || ""}
              onChange={handleLogFileSelect}
            >
              <option value="">파일을 선택하세요</option>
              {logFiles.map((fileName, index) => (
                <option key={index} value={fileName.title}>
                  {fileName.title}
                </option>
              ))}
            </S.Select>
          </S.Section>
        )}

        {/* Log 서브스트링 섹션 */}
        <S.Section>
          <S.Label>Log 서브 스트링</S.Label>
          <S.LogStyleRow>
            <S.StyleSelect
              value={substringType}
              onChange={(e) => setSubstringType(e.target.value)}
            >
              <option>Substring</option>
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

        {isNew && (
          <S.ButtonContainer>
            <S.Button onClick={handleFormatApply}>포맷 적용</S.Button>
          </S.ButtonContainer>
        )}

        {/* 필드 테이블 */}
        <S.TableContainer>
          <S.Table>
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "9%" }} />
            </colgroup>
            <S.Thead>
              <tr>
                <S.Th>Field 명</S.Th>
                <S.Th>Item 표시 명</S.Th>
                <S.Th>Item 설명</S.Th>
                <S.Th>Item 타입</S.Th>
                <S.Th>Item 컨텐츠 예시</S.Th>
                <S.Th></S.Th>
              </tr>
            </S.Thead>
            <tbody>
              {fields.map((field, index) => {
                const level = field.path ? field.path.split(".").length - 1 : 0;
                const isNewField = field.isUserCreated; // 새로 추가된 필드인지 확인
                const hasPresetData = !!(
                  field.itemAlias ||
                  field.itemExplain ||
                  field.itemType
                );
                const isReadOnly = !isNewField && hasPresetData;

                return (
                  <tr key={index}>
                    <S.Td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: `${level * 20}px`,
                        }}
                      >
                        {field.hasChild && (
                          <S.ToggleButton
                            onClick={() => handleToggleClick(field, index)}
                          >
                            {expandedRows.has(`${index}-${field.name}`)
                              ? "▼"
                              : "▶"}
                          </S.ToggleButton>
                        )}
                        {isNewField ? (
                          <S.TableInput
                            value={field.name}
                            onChange={(e) =>
                              handleFieldInputChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="필드명 입력"
                          />
                        ) : (
                          <S.TableText>{field.name}</S.TableText>
                        )}
                      </div>
                    </S.Td>
                    <S.Td>
                      {isNewField || !hasPresetData ? (
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
                      ) : (
                        <S.TableText>{field.displayName}</S.TableText>
                      )}
                    </S.Td>
                    <S.Td>
                      {isNewField || !hasPresetData ? (
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
                      ) : (
                        <S.TableText>{field.description}</S.TableText>
                      )}
                    </S.Td>
                    <S.Td>
                      {isNewField || !hasPresetData ? (
                        <S.TableSelect
                          value={field.type}
                          onChange={(e) =>
                            handleFieldInputChange(
                              index,
                              "type",
                              e.target.value
                            )
                          }
                        >
                          <option>STRING</option>
                          <option>FLOAT</option>
                          <option>INTEGER</option>
                        </S.TableSelect>
                      ) : (
                        <S.TableText>{field.type}</S.TableText>
                      )}
                    </S.Td>
                    <S.Td>
                      {isNewField ? (
                        <S.TableInput
                          value={field.value || ""}
                          onChange={(e) =>
                            handleFieldInputChange(
                              index,
                              "value",
                              e.target.value
                            )
                          }
                          placeholder="컨텐츠 예시 입력"
                        />
                      ) : (
                        <S.TableText>{field.value}</S.TableText>
                      )}
                    </S.Td>
                    <S.Td>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          justifyContent: "center",
                        }}
                      >
                        {!isNewField && (
                          <S.ActionButton
                            onClick={() => handleAddField(index, field.path)}
                          >
                            <Plus size={16} />
                          </S.ActionButton>
                        )}
                        {(isNewField || !hasPresetData) && (
                          <S.ActionButton
                            onClick={() => updateField(index, null)}
                          >
                            <Trash2 size={16} />
                          </S.ActionButton>
                        )}
                      </div>
                    </S.Td>
                  </tr>
                );
              })}
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
          <S.Button onClick={handleSubmit}>{isNew ? "생성" : "수정"}</S.Button>
          <S.Button onClick={onClose}>취소</S.Button>
        </S.ButtonContainer>
        {!isNew && (
          <S.ButtonContainer align="center">
            <S.FilterButton onClick={() => handleFilterClick()}>
              필터링
            </S.FilterButton>
          </S.ButtonContainer>
        )}
      </S.Card>
    </S.Container>
  );
};

export default LogFormatDetail;
