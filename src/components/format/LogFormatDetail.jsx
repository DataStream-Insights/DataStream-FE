import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Play, Save, Filter } from "lucide-react";
import * as S from "../../styles/format/formatDetailStyle";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import {
  Form,
  Input,
  Select,
  Button,
  Space,
  Table,
  InputNumber,
  Tooltip,
} from "antd";
const { TextArea } = Input;

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
  const { showAlert } = useAlert();
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
  const [form] = Form.useForm();

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
      showAlert("포맷 정보를 찾을 수 없습니다.");
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
  const handleLogFileSelect = (value) => {
    selectLogFile(value);
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
      showAlert("파일을 선택해주세요.");
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
      // 필수 입력값 검증
      if (!formData.name?.trim()) {
        showAlert("포맷 이름을 입력해주세요.");
        return;
      }

      if (!formData.description?.trim()) {
        showAlert("포맷 설명을 입력해주세요.");
        return;
      }

      // 필드가 하나도 없는 경우 검증
      if (!fields || fields.length === 0) {
        showAlert("최소 하나 이상의 필드가 필요합니다.");
        return;
      }

      // 모든 필드의 필수 값 검증
      const invalidFields = fields.filter(
        (field) =>
          !field.name?.trim() ||
          !field.displayName?.trim() ||
          !field.description?.trim()
      );

      if (invalidFields.length > 0) {
        showAlert("모든 필드의 이름, 표시명, 설명을 입력해주세요.");
        return;
      }

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
        showAlert("포맷이 성공적으로 생성되었습니다.", onClose);
      }
      onClose();
    } catch (error) {
      console.error("Failed to submit format:", error);
      showAlert(error.message || "포맷 저장에 실패했습니다.");
    }
  };

  return (
    <S.Container>
      <S.Card>
        <S.StyledForm form={form} layout="vertical">
          <S.Header>
            <S.Title>
              {isNew
                ? "필드 설정 정보"
                : `${selectedFormat?.formatname || ""} 상세 정보`}
            </S.Title>
            <Button type="text" icon={<X size={20} />} onClick={onClose} />
          </S.Header>

          {/* 파일 선택 섹션 */}
          {isNew && (
            <Form.Item label="로그 파일 선택">
              <Select
                value={selectedFileName}
                onChange={handleLogFileSelect}
                placeholder="파일을 선택하세요"
                style={{ width: "100%" }}
              >
                {logFiles.map((file, index) => (
                  <Select.Option key={index} value={file.title}>
                    {file.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* Log 서브스트링 섹션 */}
          <Form.Item label="Log 서브 스트링">
            <Space direction="vertical" style={{ width: "100%" }} size="middle">
              <Space align="center">
                <Select
                  value={substringType}
                  onChange={(value) => setSubstringType(value)}
                  style={{ width: 120 }}
                >
                  <Select.Option value="Substring">Substring</Select.Option>
                </Select>
                <span>시작</span>
                <Select
                  value={startType}
                  onChange={(value) => setStartType(value)}
                  style={{ width: 120 }}
                >
                  <Select.Option value="indexOf">indexOf</Select.Option>
                </Select>
                <Input
                  value={startValue}
                  onChange={(e) => setStartValue(e.target.value)}
                  style={{ width: 120 }}
                />
                <InputNumber
                  value={startOffset}
                  onChange={(value) => setStartOffset(value)}
                  style={{ width: 80 }}
                />
              </Space>
              <Space align="center">
                <div style={{ width: 120 }} />{" "}
                {/* 첫 번째 Select 자리 맞춤용 */}
                <span>끝</span>
                <Select
                  value={endType}
                  onChange={(value) => setEndType(value)}
                  style={{ width: 120 }}
                >
                  <Select.Option value="lastIndex">lastIndex</Select.Option>
                </Select>
                <Input
                  value={endValue}
                  onChange={(e) => setEndValue(e.target.value)}
                  style={{ width: 120 }}
                />
                <InputNumber
                  value={endOffset}
                  onChange={(value) => setEndOffset(value)}
                  style={{ width: 80 }}
                />
              </Space>
            </Space>
          </Form.Item>

          {isNew && (
            <Form.Item>
              <S.ButtonContainer>
                <S.FormatButton onClick={handleFormatApply}>
                  <Play size={16} />
                  포맷 적용
                </S.FormatButton>
              </S.ButtonContainer>
            </Form.Item>
          )}

          {/* 필드 테이블 */}
          <Table
            dataSource={fields}
            pagination={false}
            size="small"
            columns={[
              {
                title: "Field 명",
                key: "name",
                width: 150, // 고정 너비
                render: (_, record, index) => {
                  const level = record.path
                    ? record.path.split(".").length - 1
                    : 0;
                  const isNewField = record.isUserCreated;

                  return (
                    <Space style={{ paddingLeft: `${level * 20}px` }}>
                      {record.hasChild && (
                        <Button
                          type="text"
                          size="small"
                          onClick={() => handleToggleClick(record, index)}
                        >
                          {expandedRows.has(`${index}-${record.name}`)
                            ? "▼"
                            : "▶"}
                        </Button>
                      )}
                      <div
                        style={{
                          width: level > 0 ? `${150 - level * 20}px` : "150px",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                        }}
                      >
                        {isNewField ? (
                          <Input
                            value={record.name}
                            onChange={(e) =>
                              handleFieldInputChange(
                                index,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="필드명 입력"
                            size="small"
                          />
                        ) : (
                          record.name
                        )}
                      </div>
                    </Space>
                  );
                },
              },
              {
                title: "Item 표시 명",
                key: "displayName",
                width: 200,
                render: (_, record, index) => {
                  const isNewField = record.isUserCreated;
                  const hasPresetData = !!(
                    record.itemAlias ||
                    record.itemExplain ||
                    record.itemType
                  );

                  return (
                    <div
                      style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {isNewField || !hasPresetData ? (
                        <Input
                          value={record.displayName}
                          onChange={(e) =>
                            handleFieldInputChange(
                              index,
                              "displayName",
                              e.target.value
                            )
                          }
                          size="small"
                        />
                      ) : (
                        record.displayName
                      )}
                    </div>
                  );
                },
              },
              {
                title: "Item 설명",
                key: "description",
                width: 200,
                render: (_, record, index) => {
                  const isNewField = record.isUserCreated;
                  const hasPresetData = !!(
                    record.itemAlias ||
                    record.itemExplain ||
                    record.itemType
                  );

                  return (
                    <div
                      style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {isNewField || !hasPresetData ? (
                        <Input
                          value={record.description}
                          onChange={(e) =>
                            handleFieldInputChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          size="small"
                        />
                      ) : (
                        record.description
                      )}
                    </div>
                  );
                },
              },
              {
                title: "Item 타입",
                key: "type",
                width: 120,
                render: (_, record, index) => {
                  const isNewField = record.isUserCreated;
                  const hasPresetData = !!(
                    record.itemAlias ||
                    record.itemExplain ||
                    record.itemType
                  );

                  return isNewField || !hasPresetData ? (
                    <Select
                      value={record.type}
                      onChange={(value) =>
                        handleFieldInputChange(index, "type", value)
                      }
                      size="small"
                      style={{ width: "100%" }}
                    >
                      <Select.Option value="STRING">STRING</Select.Option>
                      <Select.Option value="FLOAT">FLOAT</Select.Option>
                      <Select.Option value="INTEGER">INTEGER</Select.Option>
                    </Select>
                  ) : (
                    record.type
                  );
                },
              },
              {
                title: "Item 컨텐츠 예시",
                key: "value",
                width: 300,
                render: (_, record, index) => {
                  const isNewField = record.isUserCreated;

                  return isNewField ? (
                    <Input
                      value={record.value}
                      onChange={(e) =>
                        handleFieldInputChange(index, "value", e.target.value)
                      }
                      placeholder="컨텐츠 예시 입력"
                      size="small"
                    />
                  ) : (
                    <Tooltip title={record.value}>
                      <div
                        style={{
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          maxHeight: "3em", // 약 2줄 정도의 높이
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2, // 최대 2줄까지만 표시
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {record.value}
                      </div>
                    </Tooltip>
                  );
                },
              },
              {
                title: "",
                key: "action",
                width: "10%",
                render: (_, record, index) => {
                  const isNewField = record.isUserCreated;
                  const hasPresetData = !!(
                    record.itemAlias ||
                    record.itemExplain ||
                    record.itemType
                  );

                  return (
                    <Space>
                      {!isNewField && (
                        <Button
                          type="text"
                          icon={<Plus size={16} />}
                          onClick={() => handleAddField(index, record.path)}
                        />
                      )}
                      {(isNewField || !hasPresetData) && (
                        <Button
                          type="text"
                          danger
                          icon={<Trash2 size={16} />}
                          onClick={() => updateField(index, null)}
                        />
                      )}
                    </Space>
                  );
                },
              },
            ]}
          />

          {/* 이름과 설명 입력 섹션 */}
          <Form.Item
            label="이름"
            required
            rules={[{ required: true, message: "이름을 입력해주세요" }]}
          >
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Log Format A"
            />
          </Form.Item>

          <Form.Item
            label="설명"
            required
            rules={[{ required: true, message: "설명을 입력해주세요" }]}
          >
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Log Format A"
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <S.ButtonContainer>
                <S.Button onClick={handleSubmit}>
                  <Save size={16} />
                  생성
                </S.Button>
              </S.ButtonContainer>
            </Space>
          </Form.Item>

          {!isNew && (
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="default"
                onClick={handleFilterClick}
                icon={<Filter size={16} />}
                style={{ borderRadius: "20px" }}
              >
                필터링
              </Button>
            </Form.Item>
          )}
        </S.StyledForm>
      </S.Card>
    </S.Container>
  );
};

export default LogFormatDetail;
