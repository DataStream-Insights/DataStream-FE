import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as S from "../../styles/campaign/createCampaignStyle";

export function CreateCampaign() {
  const [formData, setFormData] = useState({
    campaignClassification1: "",
    campaignClassification2: "",
    campaignName: "",
    campaignDescription: "",
    startDate: "2024-10-15",
    endDate: "2024-10-29",
    endAfter: 0,
    customerType: "individual",
    visibility: "private",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <S.FormContainer>
      <S.FormCard>
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
                <option value="categoryA">Category A</option>
              </select>
              <select
                name="campaignClassification2"
                value={formData.campaignClassification2}
                onChange={handleChange}
              >
                <option value="">[선택]</option>
                <option value="subCategoryA">Subcategory A</option>
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
                <span>부서공개</span>
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

          <S.SubmitButton type="submit">저장하기</S.SubmitButton>
        </form>
      </S.FormCard>
    </S.FormContainer>
  );
}
