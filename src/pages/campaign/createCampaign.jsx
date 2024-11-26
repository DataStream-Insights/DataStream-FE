import React, { useState } from "react";
import { X } from "lucide-react";
import useCampaignData from "../../hooks/campaign/useCampaginData";
import * as CS from "../../styles/filter/filterdetailStyle"; // 슬라이드 관련 스타일
import * as S from "../../styles/campaign/createCampaignStyle"; // 기존 캠페인 스타일
import useCategoryData from "../../hooks/campaign/useCategoryData";
import { useAlert } from "../../context/AlertContext";

export function CreateCampaign({ onClose }) {
  const { showAlert } = useAlert();
  const { categories1, categories2, loadCategory2Data } = useCategoryData();
  const { createCampaign, isLoading, error } = useCampaignData();

  const [formData, setFormData] = useState({
    campaignClassification1: "",
    campaignClassification2: "",
    campaignName: "",
    campaignDescription: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 14))
      .toISOString()
      .split("T")[0],
    endAfter: 0,
    customerType: "individual",
    visibility: "private",
    tags: "",
  });

  const renderCategory1Options = () => {
    return categories1.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  };

  const renderCategory2Options = () => {
    return categories2.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // 이전 상태를 기반으로 새로운 상태 설정
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // campaignClassification1이 변경되면 campaignClassification2를 초기화
      ...(name === "campaignClassification1" && {
        campaignClassification2: "",
      }),
    }));

    // campaignClassification1이 변경되었을 때 category2 데이터 로드
    if (name === "campaignClassification1") {
      await loadCategory2Data(value);
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 필드 검사
    if (!formData.campaignClassification1) {
      showAlert("캠페인 분류(대분류)를 선택해주세요.");
      return;
    }

    if (!formData.campaignClassification2) {
      showAlert("캠페인 분류(소분류)를 선택해주세요.");
      return;
    }

    if (!formData.campaignName.trim()) {
      showAlert("캠페인명을 입력해주세요.");
      return;
    }

    if (!formData.campaignDescription.trim()) {
      showAlert("캠페인 설명을 입력해주세요.");
      return;
    }

    if (!formData.tags.trim()) {
      showAlert("태그를 입력해주세요.");
      return;
    }

    try {
      const result = await createCampaign(formData);
      console.log("Campaign created successfully:", result);

      // 성공적으로 저장되었을 때만 알림과 페이지 이동
      showAlert("캠페인이 성공적으로 생성되었습니다.", () => {
        onClose(); // Alert 닫힌 후에 onClose 실행
      });
    } catch (err) {
      console.error("Failed to create campaign:", err);

      // 실패
      let errorMessage = "캠페인 생성에 실패했습니다.";
      if (err.message) {
        errorMessage += ` (${err.message})`;
      }
      showAlert(errorMessage);
    }
  };

  return (
    <div style={{ height: "100%", overflow: "auto", padding: "10px" }}>
      <S.FormCard>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <CS.Header>
            <S.SectionTitle>캠페인 기초 정보</S.SectionTitle>
            <CS.CloseButton onClick={onClose}>
              <X size={24} />
            </CS.CloseButton>
          </CS.Header>

          <S.FormGroup>
            <S.Label>캠페인 분류</S.Label>
            <S.SelectContainer>
              <select
                name="campaignClassification1"
                value={formData.campaignClassification1}
                onChange={handleChange}
              >
                <option value="">[선택]</option>
                {renderCategory1Options()}
              </select>
              <select
                name="campaignClassification2"
                value={formData.campaignClassification2}
                onChange={handleChange}
                disabled={!formData.campaignClassification1}
              >
                <option value="">[선택]</option>
                {renderCategory2Options()}
              </select>
            </S.SelectContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>캠페인명</S.Label>
            <S.Input
              type="text"
              name="campaignName"
              value={formData.campaignName}
              onChange={handleChange}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>캠페인 설명</S.Label>
            <S.TextArea
              name="campaignDescription"
              value={formData.campaignDescription}
              onChange={handleChange}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>수행 일자</S.Label>
            <S.DateContainer>
              <S.Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              <span>~</span>
              <S.Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </S.DateContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.EndAfterContainer>
              <S.Label>종료 후</S.Label>
              <S.NumberInput
                type="number"
                name="endAfter"
                value={formData.endAfter}
                onChange={handleChange}
              />
              <span>일후 까지 실적으로 인정</span>
            </S.EndAfterContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>고객군 유형</S.Label>
            <S.CustomerTypeSelect
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
            >
              <option value="individual">개인</option>
              <option value="corporate">법인</option>
            </S.CustomerTypeSelect>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>공개 설정</S.Label>
            <S.RadioContainer>
              <S.RadioButton>
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={formData.visibility === "private"}
                  onChange={handleChange}
                />
                <span>비공개</span>
              </S.RadioButton>
              <S.RadioButton>
                <input
                  type="radio"
                  name="visibility"
                  value="department"
                  checked={formData.visibility === "department"}
                  onChange={handleChange}
                />
                <span>부서공개</span>
              </S.RadioButton>
              <S.RadioButton>
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={formData.visibility === "public"}
                  onChange={handleChange}
                />
                <span>전체공개</span>
              </S.RadioButton>
            </S.RadioContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>태그</S.Label>
            <S.Input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="#태그"
            />
          </S.FormGroup>

          <S.ButtonContainer>
            <S.SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? "저장 중..." : "저장하기"}
            </S.SubmitButton>
          </S.ButtonContainer>
        </form>
      </S.FormCard>
    </div>
  );
}

export default CreateCampaign;
