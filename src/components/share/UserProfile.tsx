import { Typography } from "antd";

const { Text } = Typography;

const UserProfile = ({ userData }: any) => (
  <div className="flex items-center gap-4">
    <img
      className="w-24 h-30 rounded-full object-cover"
      src={userData?.userImage}
      alt={userData?.name}
    />
    <div className="dark:text-black">
      <Text className="text-lg font-semibold">{userData?.name}</Text>
      <p>{userData?.email}</p>
      <p>{userData?.phone}</p>
      <p>{userData?.address}</p>
    </div>
  </div>
);

export default UserProfile;
