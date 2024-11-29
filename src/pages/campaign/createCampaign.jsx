import React, { useState } from "react";
import useCampaignData from "../../hooks/campaign/useCampaginData";
import useCategoryData from "../../hooks/campaign/useCategoryData";
import { useAlert } from "../../context/AlertContext";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Radio,
  Button,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { X, Save } from "lucide-react";
import dayjs from "dayjs";
import * as S from "../../styles/campaign/createCampaignStyle";
import * as CS from "../../styles/filter/filterdetailStyle";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export function CreateCampaign({ onClose }) {
  const { showAlert } = useAlert();
  const { categories1, categories2, loadCategory2Data } = useCategoryData();
  const { createCampaign, isLoading, error } = useCampaignData();
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

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
        <S.StyledForm
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={formData}
        >
          <CS.Header>
            <S.SectionTitle>캠페인 기초 정보</S.SectionTitle>
            <CS.CloseButton onClick={onClose}>
              <X size={24} />
            </CS.CloseButton>
          </CS.Header>

          <Form.Item label="캠페인 분류">
            <S.SelectContainer>
              <Select
                placeholder="[선택]"
                value={formData.campaignClassification1}
                onChange={(value) =>
                  handleChange({
                    target: { name: "campaignClassification1", value },
                  })
                }
              >
                {renderCategory1Options()}
              </Select>
              <Select
                placeholder="[선택]"
                value={formData.campaignClassification2}
                onChange={(value) =>
                  handleChange({
                    target: { name: "campaignClassification2", value },
                  })
                }
                disabled={!formData.campaignClassification1}
              >
                {renderCategory2Options()}
              </Select>
            </S.SelectContainer>
          </Form.Item>

          <Form.Item label="캠페인명">
            <Input
              value={formData.campaignName}
              onChange={(e) =>
                handleChange({
                  target: { name: "campaignName", value: e.target.value },
                })
              }
            />
          </Form.Item>

          <Form.Item label="캠페인 설명">
            <TextArea
              rows={4}
              value={formData.campaignDescription}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "campaignDescription",
                    value: e.target.value,
                  },
                })
              }
            />
          </Form.Item>

          <Form.Item label="수행 일자">
            <RangePicker
              value={[dayjs(formData.startDate), dayjs(formData.endDate)]}
              onChange={(dates) => {
                if (dates) {
                  handleChange({
                    target: {
                      name: "startDate",
                      value: dates[0].format("YYYY-MM-DD"),
                    },
                  });
                  handleChange({
                    target: {
                      name: "endDate",
                      value: dates[1].format("YYYY-MM-DD"),
                    },
                  });
                }
              }}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="종료 후">
            <Input.Group compact>
              <InputNumber
                min={0}
                value={formData.endAfter}
                onChange={(value) =>
                  handleChange({ target: { name: "endAfter", value } })
                }
                style={{ width: "100px" }}
              />
              <span style={{ padding: "0 8px", lineHeight: "32px" }}>
                일후 까지 실적으로 인정
              </span>
            </Input.Group>
          </Form.Item>

          <Form.Item label="고객군 유형">
            <Select
              value={formData.customerType}
              onChange={(value) =>
                handleChange({ target: { name: "customerType", value } })
              }
              style={{ width: "200px" }}
            >
              <Select.Option value="individual">개인</Select.Option>
              <Select.Option value="corporate">법인</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="공개 설정">
            <Radio.Group
              value={formData.visibility}
              onChange={(e) =>
                handleChange({
                  target: { name: "visibility", value: e.target.value },
                })
              }
            >
              <Radio value="private">비공개</Radio>
              <Radio value="department">부서공개</Radio>
              <Radio value="public">전체공개</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="태그">
            <Input
              placeholder="#태그"
              value={formData.tags}
              onChange={(e) =>
                handleChange({
                  target: { name: "tags", value: e.target.value },
                })
              }
            />
          </Form.Item>

          <S.ButtonContainer>
            <S.SubmitButton
              type="primary"
              icon={<SaveOutlined />}
              loading={isLoading}
              onClick={handleSubmit}
            >
              <Save size={16} />
              저장
            </S.SubmitButton>
          </S.ButtonContainer>
        </S.StyledForm>
      </S.FormCard>
    </div>
  );
}

export default CreateCampaign;
