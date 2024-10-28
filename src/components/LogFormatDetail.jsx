import React, { useState, useRef } from "react";
import { Plus, Trash2, X } from "lucide-react";
import * as S from "../styles/format/formatDetailStyle";

const LogFormatDetail = ({ format, onClose, isNew = false }) => {
  const [fields, setFields] = useState(
    isNew
      ? []
      : [
          {
            name: "HTTP_USER_AGENT",
            displayName: "HTTP_USER_AGENT",
            description: "사용자 브라우저 정보",
            type: "STRING",
            value:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
            decode: false,
            split: false,
          },
        ]
  );

  const [fileFormat, setFileFormat] = useState("JSONFile");
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleCheckboxChange = (index, field) => {
    const newFields = [...fields];
    newFields[index][field] = !newFields[index][field];
    setFields(newFields);
  };

  //+버튼 누르면 필드 추가
  const handleAddField = () => {
    setFields([...fields, { name: "", type: "STRING", required: false }]);
  };

  //필드 삭제 기능
  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
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

        {/* 파일 업로드 섹션 */}
        <S.Section>
          <S.Label>파일 등록</S.Label>
          <S.FileInputContainer>
            <S.FileNameInput
              value={fileName}
              readOnly
              placeholder="Log Format A.txt"
            />
            <S.FileButton onClick={() => fileInputRef.current?.click()}>
              찾아보기
            </S.FileButton>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </S.FileInputContainer>
          {fileContent && <S.FileContent>{fileContent}</S.FileContent>}
        </S.Section>

        {/* Log 서식 스타일 섹션 */}
        <S.Section>
          <S.Label>Log 서브 스트링</S.Label>
          <S.LogStyleRow>
            <S.StyleSelect defaultValue="Substring">
              <option>Substring</option>
            </S.StyleSelect>
            <S.Label style={{ minWidth: "40px" }}>시작</S.Label>
            <S.StyleSelect defaultValue="indexOf">
              <option>indexOf</option>
            </S.StyleSelect>
            <S.Input defaultValue="{" />
            <div style={{ display: "flex" }}>
              <S.NumberInput type="number" defaultValue="0" />
            </div>
          </S.LogStyleRow>
          <S.LogStyleRow>
            <div style={{ minWidth: "120px" }} />{" "}
            {/* Substring select 자리 맞춤용 빈 공간 */}
            <S.Label style={{ minWidth: "40px" }}>끝</S.Label>
            <S.StyleSelect defaultValue="lastIndex">
              <option>lastIndex</option>
            </S.StyleSelect>
            <S.Input defaultValue="}" />
            <S.NumberInput type="number" defaultValue="1" />
            <div style={{ display: "flex" }}></div>
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

        <S.ButtonContainer>
          <S.SubmitButton>포맷 적용</S.SubmitButton>
        </S.ButtonContainer>

        {/* 필드 테이블 */}
        <S.TableContainer>
          <S.Table>
            <S.Thead>
              <tr>
                <S.Th>Field 명</S.Th>
                <S.Th>Item 표시 명</S.Th>
                <S.Th>Item 설명</S.Th>
                <S.Th>Item 타입</S.Th>
                <S.Th>Item 컨텐츠 예시</S.Th>
                <S.Th style={{ textAlign: "center" }}>디코드여부</S.Th>
                <S.Th style={{ textAlign: "center" }}>Log 분할여부</S.Th>
                <S.Th style={{ width: "100px" }}></S.Th>
              </tr>
            </S.Thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={index}>
                  <S.Td>
                    <S.TableText>{field.name}</S.TableText>
                  </S.Td>
                  <S.Td>
                    <S.TableInput defaultValue={field.displayName} />
                  </S.Td>
                  <S.Td>
                    <S.TableInput defaultValue={field.description} />
                  </S.Td>
                  <S.Td>
                    <S.TableSelect defaultValue={field.type}>
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
                    <S.Checkbox
                      checked={field.split}
                      onChange={() => handleCheckboxChange(index, "split")}
                    />
                  </S.Td>
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
                      <S.ActionButton onClick={() => handleDeleteField(index)}>
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
          <S.Button>적용</S.Button>
        </S.ButtonContainer>
      </S.Card>
    </S.Container>
  );
};

export default LogFormatDetail;
