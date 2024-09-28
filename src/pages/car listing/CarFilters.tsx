import CustomForm from "@/components/form/CustomForm";
import CustomRange from "@/components/form/CustomRange";
import CustomSelect from "@/components/form/CustomSelect";
import {
  carColorOptions,
  carFeaturesOptions,
  carTypeOptions,
} from "@/constant/manageCar";
import { FieldValues, SubmitHandler } from "react-hook-form";

type CarFiltersProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

const CarFilters = ({ onSubmit }: CarFiltersProps) => {
  return (
    <CustomForm onSubmit={onSubmit}>
      {/* Car Type Filter */}
      <CustomSelect label="Car Type" name="carType" options={carTypeOptions} />

      <CustomSelect
        label="Car Color"
        name="carColor"
        options={carColorOptions}
      />

      <CustomSelect
        label="Car Features"
        name="carFeatures"
        multiple={true}
        options={carFeaturesOptions}
      />

      {/* Price Range Filter */}
      <CustomRange label="Price Range" name="priceRange" min={0} max={1000} />

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary mt-4">
        Apply Filters
      </button>
    </CustomForm>
  );
};

export default CarFilters;
