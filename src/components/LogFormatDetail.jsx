import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, X } from "lucide-react";
import * as S from "../styles/format/formatDetailStyle";

const LogFormatDetail = ({ format, onClose, isNew = false }) => {
  const SAMPLE_DATA = [
    {
      name: "HTTP_USER_AGENT",
      displayName: "HTTP_USER_AGENT",
      description: "사용자 브라우저 정보",
      type: "STRING",
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
      decode: false,
      split: "false",
    },
  ];

  const [fields, setFields] = useState(() => {
    if (isNew) {
      return []; // 생성하기로 진입했을 때는 빈 배열
    }
    if (format) {
      return format.fields || SAMPLE_DATA; // 선택된 format이 있으면 그 데이터 사용
    }
    return SAMPLE_DATA; // 기본값
  });

  // format이나 isNew가 변경될 때 fields 업데이트
  useEffect(() => {
    if (isNew) {
      setFields([]); // 생성하기 모드면 빈 배열로 초기화
    } else if (format) {
      setFields(format.fields || SAMPLE_DATA); // 선택된 format 데이터로 설정
    }
  }, [format, isNew]);

  //초기값 세팅
  const [fileFormat, setFileFormat] = useState("JSONFile");
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  // formData: 포맷의 이름과 설명을 관리하는 state
  // name: 포맷의 이름 (화면 하단 이름 입력 필드)
  // description: 포맷의 설명 (화면 하단 설명 입력 필드)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  //파일 업로드 시 실행되는 이벤트 핸들러 함수
  const handleFileChange = (event) => {
    // event.target.files[0]: 선택된 파일 중 첫 번째 파일을 가져옴
    const file = event.target.files[0];

    // 선택된 파일이 존재하고, 파일 타입이 text/plain(txt 파일)인 경우에만 처리
    if (file && file.type === "text/plain") {
      // 파일명을 state에 저장
      setFileName(file.name);

      // FileReader 객체 생성 (파일 내용을 읽기 위한 웹 API)
      const reader = new FileReader();

      // 파일 읽기가 완료되면 실행되는 콜백 함수
      reader.onload = (e) => {
        // 읽은 파일의 내용을 state에 저장
        setFileContent(e.target.result);
      };

      // 파일을 텍스트로 읽기 시작
      reader.readAsText(file);
    }
  };

  // 체크박스 상태 변경을 처리하는 함수
  // index: 수정할 필드의 배열 인덱스
  // field: 수정할 속성 이름 (decode 또는 split)
  const handleCheckboxChange = (index, field) => {
    // 기존 fields 배열을 복사
    const newFields = [...fields];

    // 해당 인덱스의 필드에서 지정된 속성값을 반전 (true -> false 또는 false -> true)
    newFields[index][field] = !newFields[index][field];

    // 변경된 배열로 상태 업데이트
    setFields(newFields);
  };

  //+버튼 누르면 필드 추가
  const handleAddField = () => {
    setFields([...fields, { name: "", type: "STRING", required: false }]);
  };

  // 특정 인덱스의 필드를 삭제하는 함수
  // index: 삭제할 필드의 인덱스
  const handleDeleteField = (index) => {
    // filter 메서드를 사용하여 삭제할 인덱스를 제외한 새로운 배열 생성
    // (_: 현재 요소 값 (사용하지 않음), i: 현재 인덱스)
    // i !== index: 현재 인덱스가 삭제하려는 인덱스와 다른 요소만 남김
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
            <colgroup>
              <col style={{ width: "15%" }} /> {/* Field 명 */}
              <col style={{ width: "17%" }} /> {/* Item 표시 명 */}
              <col style={{ width: "15%" }} /> {/* Item 설명 */}
              <col style={{ width: "12%" }} /> {/* Item 타입 */}
              <col style={{ width: "15%" }} /> {/* Item 컨텐츠 예시 */}
              <col style={{ width: "7%" }} /> {/* 디코드여부 */}
              <col style={{ width: "10%" }} /> {/* Log 분할여부 */}
              <col style={{ width: "9%" }} /> {/* 액션 버튼 */}
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
                onChange={
                  (e) => setFormData({ ...formData, name: e.target.value }) // 이름 입력값 업데이트
                }
                placeholder="Log Format A"
              />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label>설명</S.Label>
              <S.Input
                value={formData.description}
                onChange={
                  (e) =>
                    setFormData({ ...formData, description: e.target.value }) // 설명 입력값 업데이트
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
