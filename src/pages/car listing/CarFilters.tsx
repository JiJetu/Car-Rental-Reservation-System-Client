import CustomForm from "@/components/form/CustomForm";
import CustomRange from "@/components/form/CustomRange";
import CustomSelect from "@/components/form/CustomSelect";
import {
  carColorOptions,
  carFeaturesOptions,
  carTypeOptions,
} from "@/constant/manageCar";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

type CarFiltersProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

const CarFilters = ({ onSubmit }: CarFiltersProps) => {
  return (
    <Row>
      <Col span={24}>
        <CustomForm onSubmit={onSubmit}>
          <Row gutter={8}>
            <Col span={24} lg={{ span: 8 }}>
              <CustomSelect
                label="Car Type"
                name="carType"
                options={carTypeOptions}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }}>
              <CustomSelect
                label="Car Color"
                name="carColor"
                options={carColorOptions}
              />
            </Col>
            <Col span={24} lg={{ span: 8 }}>
              <CustomSelect
                label="Car Features"
                name="carFeatures"
                multiple={true}
                options={carFeaturesOptions}
              />
            </Col>
          </Row>

          {/* Price Range Filter */}
          <Row justify={"center"} align={"middle"}>
            <Col span={24} lg={{ span: 8 }}>
              <CustomRange
                label="Price Range"
                name="priceRange"
                min={0}
                max={1000}
              />
            </Col>
          </Row>

          <Row justify={"center"} align={"middle"}>
            <Button
              htmlType="submit"
              className="btn bg-[#00712D] dark:bg-white text-white dark:text-black mt-4"
            >
              Apply Filters
            </Button>
          </Row>
        </CustomForm>
      </Col>
    </Row>
  );
};

export default CarFilters;
