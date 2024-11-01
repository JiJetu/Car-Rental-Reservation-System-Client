import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "@/redux/features/admin/carApi";
import { TCar, TQueryParam, TResponse } from "@/tyeps";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import UpdateCar from "./UpdateCar";

export type TTableData = Pick<
  TCar,
  | "name"
  | "color"
  | "location"
  | "pricePerHour"
  | "features"
  | "isElectric"
  | "type"
  | "isDeleted"
>;

const AllCars = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
  const [deleteCar] = useDeleteCarMutation();

  const handleEditCar = (car: TCar) => {
    setSelectedCar(car);
    setIsModalVisible(true);
  };

  const { data: carsData, isFetching } = useGetAllCarsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    ...params,
  ]);

  const metaData = carsData?.meta;

  const handleDeleteCar = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting....");

        try {
          const res = (await deleteCar(id)) as TResponse<TCar>;

          console.log(res);

          if (res?.error) {
            toast.error(res?.error?.data?.message, {
              id: toastId,
              duration: 2000,
            });
          }

          toast.success("Car deleted successfully!", {
            id: toastId,
            duration: 2000,
          });
        } catch (error) {
          toast.error("something went wrong", { id: toastId, duration: 2000 });
        }
      }
    });
  };

  const tableData = carsData?.data?.map(
    ({
      _id,
      name,
      color,
      location,
      features,
      pricePerHour,
      isDeleted,
      isElectric,
      shortDescription,
      description,
      carImage,
      type,
    }) => ({
      key: _id,
      _id,
      name,
      color,
      location,
      type,
      features,
      isDeleted,
      pricePerHour,
      isElectric,
      shortDescription,
      description,
      carImage,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Color",
      key: "color",
      dataIndex: "color",
      filters: [
        {
          text: "White",
          value: "White",
        },
        {
          text: "Black",
          value: "Black",
        },
        {
          text: "Blue",
          value: "Blue",
        },
      ],
    },
    {
      title: "location",
      key: "location",
      dataIndex: "location",
      filters: [
        {
          text: "Dhaka",
          value: "Dhaka",
        },
        {
          text: "Notunbazar",
          value: "Notunbazar",
        },
        {
          text: "Rampura",
          value: "Rampura",
        },
        {
          text: "Jatrabari",
          value: "Jatrabari",
        },
        {
          text: "Bosundhora",
          value: "Bosundhora",
        },
        {
          text: "Demra",
          value: "Demra",
        },
      ],
    },
    {
      title: "Type of Cars",
      key: "type",
      dataIndex: "type",
      filters: [
        {
          text: "SUV",
          value: "SUV",
        },
        {
          text: "Hybrid",
          value: "Hybrid",
        },
        {
          text: "Sedan",
          value: "Sedan",
        },
      ],
    },
    {
      title: "Features",
      key: "features",
      dataIndex: "features",
      filters: [
        {
          text: "AC",
          value: "AC",
        },
        {
          text: "Bluetooth",
          value: "Bluetooth",
        },
        {
          text: "Long Range Battery",
          value: "Long Range Battery",
        },
        {
          text: "GPS",
          value: "GPS",
        },
      ],
    },
    {
      title: "Is Electric",
      key: "isElectric",
      dataIndex: "isElectric",
      render: (isElectric) => (isElectric ? "Yes" : "No"),
      filters: [
        {
          text: "Electric",
          value: true,
        },
        {
          text: "Not Electric",
          value: false,
        },
      ],
    },
    {
      title: "Deleted",
      key: "isDeleted",
      dataIndex: "isDeleted",
      render: (isDeleted) =>
        isDeleted ? (
          <p className="text-red-700 font-semibold">Deleted</p>
        ) : (
          <p className="text-green-700 font-bold">Not Deleted</p>
        ),
      filters: [
        {
          text: "Deleted",
          value: true,
        },
        {
          text: "Not Deleted",
          value: false,
        },
      ],
    },
    {
      title: "Price Per Hour",
      key: "pricePerHour",
      dataIndex: "pricePerHour",
    },
    {
      title: "Action",
      key: "x",
      render: (car) => {
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => handleEditCar(car)}
              style={{ color: "green" }}
            >
              <EditFilled />
            </Button>

            <Button
              onClick={() => handleDeleteCar(car.key)}
              style={{ color: "red" }}
            >
              <DeleteFilled />
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.color?.forEach((item) =>
        queryParams.push({ name: "color", value: item })
      );

      filters.features?.forEach((item) =>
        queryParams.push({ name: "features", value: item })
      );

      filters.isElectric?.forEach((item) =>
        queryParams.push({ name: "isElectric", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        scroll={{ x: 800 }}
      />
      <div className="flex justify-center mt-4">
        <Pagination
          className="dark:bg-white"
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
      </div>

      {selectedCar && (
        <UpdateCar
          visible={isModalVisible}
          carData={selectedCar}
          onClose={() => {
            setIsModalVisible(false);
            setSelectedCar(null);
          }}
        />
      )}
    </div>
  );
};

export default AllCars;
