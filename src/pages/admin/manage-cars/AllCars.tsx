import { useGetAllCarsQuery } from "@/redux/features/admin/carApi";
import { TCar, TQueryParam } from "@/tyeps";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";

export type TTableData = Pick<
  TCar,
  "name" | "color" | "pricePerHour" | "features" | "isElectric" | "type"
>;

const AllCars = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: carsData, isFetching } = useGetAllCarsQuery(params);

  const tableData = carsData?.data?.map(
    ({ _id, name, color, features, pricePerHour, isElectric, type }) => ({
      key: _id,
      _id,
      name,
      color,
      type,
      features,
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
      title: "Price Per Hour",
      key: "pricePerHour",
      dataIndex: "pricePerHour",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AllCars;
