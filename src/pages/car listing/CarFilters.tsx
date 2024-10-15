import CustomRange from "@/components/form/CustomRange";
import CustomResetButton from "@/components/form/CustomResetButton ";
import CustomSelect from "@/components/form/CustomSelect";
import { Button } from "@/components/ui/button";
import {
  carColorOptions,
  carFeaturesOptions,
  carTypeOptions,
} from "@/constant/manageCar";
import { Col, Row } from "antd";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";

type TCarFiltersProps = {
  onSubmit: SubmitHandler<FieldValues>;
  loading: boolean;
};

const CarFilters = ({ onSubmit, loading }: TCarFiltersProps) => {
  const { reset } = useFormContext();

  const handleResetFilters = () => {
    reset({
      carType: undefined,
      carColor: undefined,
      carFeatures: undefined,
      priceRange: [0, 1000],
    });
    onSubmit({
      carType: undefined,
      carColor: undefined,
      carFeatures: undefined,
      priceRange: [0, 1000],
    });
  };

  return (
    <Row>
      <Col span={24}>
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
        <Row gutter={10} justify={"center"} align={"middle"}>
          <Col span={24} lg={{ span: 8 }}>
            <CustomRange
              label="Price Range"
              name="priceRange"
              min={0}
              max={1000}
            />
          </Col>
          <Col className="ml-4 mb-5">
            <CustomResetButton onClick={handleResetFilters} loading={loading} />
          </Col>
        </Row>

        <div className="divider">
          <Button
            disabled={loading}
            type="submit"
            className="btn px-12 bg-[#00712D] hover:bg-[#00712D] dark:bg-white text-white dark:text-black"
          >
            Apply Filters
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default CarFilters;
