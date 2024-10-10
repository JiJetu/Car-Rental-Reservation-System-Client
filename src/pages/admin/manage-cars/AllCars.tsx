import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "@/redux/features/admin/carApi";
import { TCar, TQueryParam, TResponse } from "@/tyeps";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Button, Pagination, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

export type TTableData = Pick<
  TCar,
  | "name"
  | "color"
  | "pricePerHour"
  | "features"
  | "isElectric"
  | "type"
  | "isDeleted"
>;

const AllCars = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: carsData, isFetching } = useGetAllCarsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    ...params,
  ]);
  const metaData = carsData?.meta;
  const [deleteCar] = useDeleteCarMutation();

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
      features,
      pricePerHour,
      isDeleted,
      isElectric,
      type,
    }) => ({
      key: _id,
      _id,
      name,
      color,
      type,
      features,
      isDeleted,
      pricePerHour,
      isElectric,
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
          <div>
            <Link to={`/admin/update-cars/${car.key}`}>
              <Button style={{ color: "blue" }}>
                <EditFilled />
              </Button>
            </Link>

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
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        className="dark:bg-white"
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default AllCars;
