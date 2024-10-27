import CustomDate from "@/components/form/CustomDate";
import CustomForm from "@/components/form/CustomForm";
import CustomInput from "@/components/form/CustomInput";
import CustomSelect from "@/components/form/CustomSelect";
import { Button } from "@/components/ui/button";
import {
  carColorOptions,
  carFeaturesOptions,
  carLocationOptions,
  carTypeOptions,
} from "@/constant/manageCar";
import { SearchOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

type SearchFormProps = {
  onSearch: SubmitHandler<FieldValues>;
  loading: boolean;
};

const SearchForm = ({ onSearch, loading = false }: SearchFormProps) => {
  return (
    <div className="p-6 bg-white dark:bg-[#0e0d0d] rounded dark:shadow-lg">
      <CustomForm onSubmit={onSearch} resetFrom={false}>
        <Row gutter={16}>
          <Col span={24} md={{ span: 8 }}>
            <CustomSelect
              label="Car Type"
              name="carType"
              options={carTypeOptions}
            />
          </Col>
          <Col span={24} md={{ span: 8 }}>
            <CustomSelect
              label="Features"
              name="carFeatures"
              options={carFeaturesOptions}
              multiple={true}
            />
          </Col>
          <Col span={24} md={{ span: 8 }}>
            <CustomSelect
              label="Location"
              name="location"
              options={carLocationOptions}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24} md={{ span: 8 }}>
            <CustomSelect
              label="Color"
              name="carColor"
              options={carColorOptions}
            />
          </Col>
          <Col span={24} md={{ span: 8 }}>
            <CustomDate label="Pick-Up Date" name="pickUpDate" />
          </Col>
          <Col span={24} md={{ span: 8 }}>
            <CustomDate label="Drop-Off Date" name="dropOffDate" />
          </Col>
        </Row>

        <Row gutter={16} className="mt-4 flex justify-center items-center">
          <Col span={24} md={{ span: 14 }}>
            <div className="relative">
              <CustomInput
                name="search"
                type="text"
                placeholderText="Car name or type..."
              />
              <div className="absolute -bottom-[32%] right-0 transform -translate-y-1/2">
                <SearchOutlined className="text-[#00712D] text-2xl" />
              </div>
            </div>
          </Col>
        </Row>

        <div className="mt-6 flex justify-end divider divider-end">
          <Button
            type="submit"
            disabled={loading}
            className={`btn px-6 ${
              loading ? "bg-gray-400" : "bg-[#00712D]"
            } text-white hover:bg-[#005A23]`}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </CustomForm>
    </div>
  );
};

export default SearchForm;
