import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCampaignData from "../../hooks/useCampaginData";
import * as S from "../../styles/campaign/createCampaignStyle";
import useCategoryData from '../../hooks/useCategoryData';

export function CreateCampaign() {
  const {categories1, categories2, loadCategory2Data} = useCategoryData(); 
  const navigate = useNavigate();
  const { createCampaign, isLoading, error } = useCampaignData();
  //const [ categories1_name, setcategories1_name ] = useState([]);
  //const [ categories2_name, setcategories2_name ] = useState([]);

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

  // useEffect(() => {
  //   const name1 = categories1.map(category => category.name);
  //   setcategories1_name(name1);
  // }, [categories1]);

  // useEffect(() => {
  //   const name2 = categories2.map(category => category.name);
  //   setcategories2_name(name2);
  // }, [categories2]);

  const renderCategory1Options = () => {
    return categories1.map(category => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  };

  const renderCategory2Options = () => {
    return categories2.map(category => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
  
  // 이전 상태를 기반으로 새로운 상태 설정
    setFormData(prev => ({
      ...prev,
      [name]: value,
    // campaignClassification1이 변경되면 campaignClassification2를 초기화
      ...(name === 'campaignClassification1' && { campaignClassification2: ''/*,campaignClassification1Name: categories1_name*/}),
      //...(name === 'campaignClassification2' && {campaignClassification2Name: categories2_name}),
    }));

  // campaignClassification1이 변경되었을 때 category2 데이터 로드
    if (name === 'campaignClassification1') {
      await loadCategory2Data(value);
  }
};
  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createCampaign(formData);
      console.log("Campaign created successfully:", result);
      alert("캠페인이 성공적으로 생성되었습니다.");
      navigate("/"); // 목록 페이지로 이동
    } catch (err) {
      console.error("Failed to create campaign:", err);
      alert("캠페인 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <S.FormContainer>
      <S.FormCard>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <S.SectionTitle>캠페인 기초 정보</S.SectionTitle>

          {/* Campaign Classification */}
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

          {/* Campaign Name */}
          <S.FormGroup>
            <S.Label>캠페인명</S.Label>
            <S.Input
              type="text"
              name="campaignName"
              value={formData.campaignName}
              onChange={handleChange}
            />
          </S.FormGroup>

          {/* Campaign Description */}
          <S.FormGroup>
            <S.Label>캠페인 설명</S.Label>
            <S.TextArea
              name="campaignDescription"
              value={formData.campaignDescription}
              onChange={handleChange}
            />
          </S.FormGroup>

          {/* Date Range */}
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

          {/* Customer Type */}
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

          {/* Visibility */}
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

          {/* Tags */}
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

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "저장 중..." : "저장하기"}
          </S.SubmitButton>
        </form>
      </S.FormCard>
    </S.FormContainer>
  );
}

export default CreateCampaign;
