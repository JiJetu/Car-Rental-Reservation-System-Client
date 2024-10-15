import { Button } from "antd";

type TCustomResetButtonProps = {
  onClick: any;
  loading: boolean;
};

const CustomResetButton = ({ onClick, loading }: TCustomResetButtonProps) => {
  return (
    <Button onClick={onClick} loading={loading}>
      Reset
    </Button>
  );
};

export default CustomResetButton;
