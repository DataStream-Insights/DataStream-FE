import React, { useState, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import * as S from "../styles/format/formatDetailStyle";
import useLogFormat from "../hooks/format/useFormatData";

const LogFormatDetail = ({ onClose, isNew = false }) => {
  const {
    logFiles,
    fields,
    setFields,
    selectedFileName,
    isLoading,
    selectLogFile,
    createFormat,
    analyzeFormat,
    analyzeSubFields,
    updateField,
    addNewField,
  } = useLogFormat();

  // const [fileFormat, setFileFormat] = useState("JSONFile");
  const [expandedRows, setExpandedRows] = useState(new Set()); // 토글 상태 관리용
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
  const handleLogFileSelect = (e) => {
    const fileName = e.target.value;
    selectLogFile(fileName);
  };

  // 토글 클릭 시 실행되는 핸들러
  const handleToggleClick = async (field, index) => {
    //각 행을 구분하기 위한 고유 키 생성 (인덱스-필드이름)
    const rowKey = `${index}-${field.name}`;
    //현재 확장된 행들의 상태를 복사
    const newExpandedRows = new Set(expandedRows);

    //이미 확장된 행인 경우(토글이 이미 열려있는 경우)
    if (expandedRows.has(rowKey)) {
      //Set에서 해당 행 제거(토글 닫기)
      newExpandedRows.delete(rowKey);
      //현재 필드의 path로 시작하는 모든 하위 필드들을 제거
      // 예: 현재 path가 "user"이면 "user.name", "user.age" 등을 모두 제거
      setFields((currentFields) =>
        currentFields.filter((f) => !f.path.startsWith(field.path + "."))
      );
    }
    //확장되지 않은 행인 경우(토글이 닫혀있는 경우)
    else {
      try {
        //백엔드로 하위 필드 조회 요청
        //title(fileName)과 현재 필드의 path 전송
        console.log("토글 클릭 시 전송 데이터: ", {
          title: selectedFileName,
          path: field.path,
        });
        const response = await analyzeSubFields({
          title: selectedFileName,
          path: field.path,
        });

        //받아온 하위 필드 데이터를 현재 fields 배열에 삽입
        setFields((currentFields) => {
          //현재 필드의 바로 다음 위치를 찾아서 그 위치에 하위 필드들을 삽입
          const insertIndex =
            currentFields.findIndex((f) => f.path === field.path) + 1;
          //받아온 하위 필드 데이터를 테이블에 표시할 형태로 변환
          const newSubFields = response.map((subField) => ({
            value: subField.value,
            path: subField.path,
            hasChild: subField.hasChild,
            name: subField.name,
            displayName: "",
            description: "",
            type: "STRING",
          }));

          //원본 배열을 세 부분으로 나눠서 하위 필드들을 중간에 삽입
          return [
            ...currentFields.slice(0, insertIndex), //현재 필드까지
            ...newSubFields, //새로운 하위 필드들
            ...currentFields.slice(insertIndex), //나머지 필드들
          ];
        });

        //Set에 해당 행 추가(토글 열기)
        newExpandedRows.add(rowKey);
      } catch (error) {
        console.error("Failed to fetch sub fields:", error);
      }
    }

    //토글 상태 업데이트
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

      await analyzeFormat(analysisData); // 상태 업데이트는 hook 내부에서 처리
    } catch (error) {
      console.error("Failed to apply format:", error);
    }
  };

  // 체크박스 상태 변경
  // const handleCheckboxChange = (index, field) => {
  //   updateField(index, { [field]: !fields[index][field] });
  // };

  // 필드 입력값 변경
  const handleFieldInputChange = (index, field, value) => {
    updateField(index, { [field]: value });
  };

  const handleAddField = () => {
    const newField = {
      name: "",
      value: "",
      displayName: "",
      description: "",
      type: "STRING", //default value
      isUserCreated: true, //사용자 생성 필드 표시
    };
    addNewField(newField);
  };

  // 테이블의 각 행을 렌더링하는 컴포넌트
  // const RenderField = ({ field, index, level = 0, parentKey = "" }) => {
  //   //각행의 고유키 생성
  //   const rowKey = `${parentKey}${index}-${field.name}`;
  //   //현재 행이 확장되어 있는지 여부 확인
  //   const isExpanded = expandedRows.has(rowKey);

  //   return (
  //     <tr>
  //       {/* 계층구조 시각화 위한 들여쓰기 */}
  //       <S.Td style={{ paddingLeft: `${level * 20}px` }}>
  //         <div style={{ display: "flex", alignItems: "center" }}>
  //           {/* hasChild가 true인 경우에만 토글 버튼 표시 */}
  //           {field.hasChild && (
  //             <S.ToggleButton onClick={() => handleToggleClick(field, index)}>
  //               {/* 토글 상태에 따라 아이콘 변경 */}
  //               {isExpanded ? "▼" : "▶"}
  //             </S.ToggleButton>
  //           )}
  //           <span>{field.name}</span>
  //         </div>
  //       </S.Td>
  //       <S.Td>{field.value}</S.Td>
  //       <S.Td>
  //         <S.TableInput
  //           value={field.displayName || ""}
  //           onChange={(e) =>
  //             handleFieldInputChange(index, "displayName", e.target.value)
  //           }
  //         />
  //       </S.Td>
  //       <S.Td>
  //         <S.TableInput
  //           value={field.description || ""}
  //           onChange={(e) =>
  //             handleFieldInputChange(index, "description", e.target.value)
  //           }
  //         />
  //       </S.Td>
  //       <S.Td>
  //         <S.TableSelect
  //           value={field.type || "STRING"}
  //           onChange={(e) =>
  //             handleFieldInputChange(index, "type", e.target.value)
  //           }
  //         >
  //           <option>STRING</option>
  //           <option>FLOAT</option>
  //           <option>INTEGER</option>
  //         </S.TableSelect>
  //       </S.Td>
  //       <S.Td style={{ textAlign: "center" }}>
  //         <S.Checkbox
  //           checked={field.decode}
  //           onChange={() => handleCheckboxChange(index, "decode")}
  //         />
  //       </S.Td>
  //       <S.Td style={{ textAlign: "center" }}>
  //         <S.Checkbox
  //           checked={field.split}
  //           onChange={() => handleCheckboxChange(index, "split")}
  //         />
  //       </S.Td>
  //     </tr>
  //   );
  // };

  // 최종 저장
  const handleSubmit = async () => {
    try {
      const formatData = {
        name: formData.name,
        description: formData.description,
        // fileFormat,
        startOffset,
        endOffset,
        fields: fields.map((field) => ({
          value: field.value,
          path: field.path,
          displayName: field.displayName || field.key,
          description: field.description,
          type: field.type,
        })),
      };

      console.log("전체 데이터:", formatData);

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
            {logFiles.map((fileName, index) => (
              // name만 있어도 됨
              <option key={index} value={fileName.title}>
                {fileName.title}
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
        {/* <S.Section>
          <S.Label>파일 형식</S.Label>
          <S.Select
            value={fileFormat}
            onChange={(e) => setFileFormat(e.target.value)}
          >
            <option>JSONFile</option>
            <option>CSV</option>
            <option>XML</option>
          </S.Select>
        </S.Section> */}

        <S.ButtonContainer>
          <S.Button onClick={handleFormatApply}>포맷 적용</S.Button>
        </S.ButtonContainer>

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
                // path의 점(.) 개수로 계층 레벨 계산 (예: "user.name"은 레벨 1)
                const level = field.path ? field.path.split(".").length - 1 : 0;
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
                        {field.isUserCreated ? (
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
                      {field.isUserCreated ? (
                        <S.TableInput
                          value={field.value || ""}
                          onChange={(e) =>
                            handleFieldInputChange(
                              index,
                              "value",
                              e.target.value
                            )
                          }
                          placeholder="예시값 입력"
                        />
                      ) : (
                        <S.TableText>{field.value}</S.TableText>
                      )}
                    </S.Td>
                    {/* <S.Td style={{ textAlign: "center" }}>
                    <S.Checkbox
                      checked={field.decode}
                      onChange={() => handleCheckboxChange(index, "decode")}
                    />
                  </S.Td>
                  <S.Td style={{ textAlign: "center" }}>
                    <S.Checkbox
                      checked={field.split}
                      onChange={() => handleCheckboxChange(index, "split")}
                    />
                  </S.Td> */}
                    <S.Td>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          justifyContent: "center",
                        }}
                      >
                        <S.ActionButton onClick={handleAddField}>
                          <Plus size={16} />
                        </S.ActionButton>
                        <S.ActionButton
                          onClick={() => updateField(index, null)}
                        >
                          <Trash2 size={16} />
                        </S.ActionButton>
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
          <S.Button onClick={handleSubmit}>적용</S.Button>
        </S.ButtonContainer>
      </S.Card>
    </S.Container>
  );
};

export default LogFormatDetail;
