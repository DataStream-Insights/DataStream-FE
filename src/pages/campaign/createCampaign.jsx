import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as S from "../../styles/campaign/createCampaignStyle";

export function CreateCampaign() {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    name: "",
    description: "",
    startDate: new Date("2024-10-15"),
    endDate: new Date("2024-10-29"),
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

  // const handleDateChange = (date, name) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: date,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <S.FormContainer>
      <S.FormCard>
        <S.FormTitle>캠페인 기초 정보</S.FormTitle>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <S.FormGroup>
                <S.Label>캠페인 분류</S.Label>
                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">[선택]</option>
                </select>
              </S.FormGroup>
            </div>
            <div className="col-md-6">
              <S.FormGroup>
                <S.Label>하위 분류</S.Label>
                <select
                  className="form-select"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                >
                  <option value="">[선택]</option>
                </select>
              </S.FormGroup>
            </div>
          </div>

          <S.FormGroup>
            <S.Label>캠페인 명</S.Label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>캠페인 설명</S.Label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </S.FormGroup>

          <div className="row mb-3">
            <div className="col-md-8">
              <S.FormGroup>
                <S.Label>수행 일자</S.Label>
                <S.DateRangeContainer>
                  <S.DateInput defaultValue="2024-10-15" />
                  <span>~</span>
                  <S.DateInput defaultValue="2024-10-15" />
                </S.DateRangeContainer>
              </S.FormGroup>
            </div>
            <div className="col-md-4">
              <S.Label>종료 후</S.Label>
              <S.FormGroup>
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    className="form-control"
                    name="targetCount"
                    value={formData.targetCount}
                    onChange={handleChange}
                    min="0"
                    style={{ width: "60px", marginRight: "10px" }}
                  />
                  <span>일후까지 실적으로 인정</span>
                </div>
              </S.FormGroup>
            </div>
          </div>

          <S.FormGroup>
            <S.Label>고객군 유형</S.Label>
            <select
              className="form-select"
              name="resourceType"
              value={formData.resourceType}
              onChange={handleChange}
            >
              <option value="personal">개인</option>
            </select>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>공개 설정</S.Label>
            <S.RadioContainer>
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
            </S.RadioContainer>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>태그</S.Label>
            <input
              type="text"
              className="form-control"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="#태그"
            />
          </S.FormGroup>

          <S.ButtonContainer>
            <button type="submit" className="btn btn-primary">
              저장하기
            </button>
          </S.ButtonContainer>
        </form>
      </S.FormCard>
    </S.FormContainer>
  );
}
