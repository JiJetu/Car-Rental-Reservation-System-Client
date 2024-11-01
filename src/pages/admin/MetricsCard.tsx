import { Card, Typography } from "antd";
import { ReactNode } from "react";

const { Text } = Typography;

interface MetricsCardProps {
  title: string;
  value: number;
  additionalText?: string;
  icon: ReactNode;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  additionalText,
  icon,
}) => {
  return (
    <Card bordered>
      <div className="flex items-center gap-4">
        <div className="mr-2 text-2xl">{icon}</div>
        <div>
          <Text className="text-lg font-semibold">{title}</Text>
          <Text className="text-2xl font-bold block">{value}</Text>
          {additionalText && (
            <Text className="text-base font-bold">{additionalText}</Text>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MetricsCard;
