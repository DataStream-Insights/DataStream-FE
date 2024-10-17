import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FormContainer,
  FormCard,
  FormTitle,
  FormGroup,
  Label,
  DateRangeContainer,
  RadioContainer,
  ButtonContainer,
  FileButtonGroup,
} from "../../styles/campaign/createCampaignStyle";

export function CreateCampaign() {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    name: "",
    description: "",
    startDate: "2024-10-15",
    endDate: "2024-10-29",
    targetCount: "0",
    resourceType: "personal",
    visibility: "private",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <FormContainer>
      <FormCard>
        <FormTitle>캠페인 기초 정보</FormTitle>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <FormGroup>
                <Label>캠페인 분류</Label>
                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">[선택]</option>
                </select>
              </FormGroup>
            </div>
            <div className="col-md-6">
              <FormGroup>
                <Label>하위 분류</Label>
                <select
                  className="form-select"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                >
                  <option value="">[선택]</option>
                </select>
              </FormGroup>
            </div>
          </div>

          <FormGroup>
            <Label>캠페인 명</Label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>캠페인 설명</Label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </FormGroup>

          <div className="row mb-3">
            <div className="col-md-8">
              <FormGroup>
                <Label>수행 일자</Label>
                <DateRangeContainer>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <span>~</span>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </DateRangeContainer>
              </FormGroup>
            </div>
            <div className="col-md-4">
              <FormGroup>
                <Label>종료 후</Label>
                <input
                  type="number"
                  className="form-control"
                  name="targetCount"
                  value={formData.targetCount}
                  onChange={handleChange}
                  min="0"
                />
              </FormGroup>
            </div>
          </div>

          <FormGroup>
            <Label>고객군 유형</Label>
            <select
              className="form-select"
              name="resourceType"
              value={formData.resourceType}
              onChange={handleChange}
            >
              <option value="personal">개인</option>
            </select>
          </FormGroup>

          <FormGroup>
            <Label>공개 설정</Label>
            <RadioContainer>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="visibility"
                  id="private"
                  value="private"
                  checked={formData.visibility === "private"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="private">
                  비공개
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="visibility"
                  id="public"
                  value="public"
                  checked={formData.visibility === "public"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="public">
                  모두공개
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  name="visibility"
                  id="department"
                  value="department"
                  checked={formData.visibility === "department"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="department">
                  부서공개
                </label>
              </div>
            </RadioContainer>
          </FormGroup>

          <FormGroup>
            <Label>태그</Label>
            <input
              type="text"
              className="form-control"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="#태그"
            />
          </FormGroup>

          <ButtonContainer>
            <FileButtonGroup>
              <button type="button" className="btn btn-outline-secondary">
                파일찾기
              </button>
              <button type="button" className="btn btn-outline-secondary">
                첨부파일 삭제
              </button>
            </FileButtonGroup>
            <button type="submit" className="btn btn-primary">
              저장하기
            </button>
          </ButtonContainer>
        </form>
      </FormCard>
    </FormContainer>
  );
}
