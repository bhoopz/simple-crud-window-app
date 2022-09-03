import React from "react";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";

const WidnowList = (props) => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Material",
      dataIndex: "material",
      key: "material",
      filters: [
        {
          text: "UPVC",
          value: "UPVC",
        },
        {
          text: "Wood",
          value: "Wood",
        },
        {
          text: "Aluminum",
          value: "Aluminum",
        },
        {
          text: "Other",
          value: "Other",
        },
      ],
      onFilter: (value, record) => record.material.indexOf(value) === 0,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price $",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 2,
      },
    },
    {
      title: "Edit / Delete",
      key: "action",
      render: (record) => {
        return (
          <>
            <div className="flex">
              <EditOutlined
                style={{ color: "blue" }}
                onClick={() => Edit(record)}
              />
              {props.isAdmin == "true" || props.isAdmin == true ? (
                <DeleteOutlined
                  style={{ color: "red", marginLeft: "20%" }}
                  onClick={() => Delete(record)}
                />
              ) : (
                <StopOutlined style={{ marginLeft: "20%" }} />
              )}
            </div>
          </>
        );
      },
    },
  ];

  const Edit = (record) => {
    props.setOpenEditDialog(true);
    props.setSelectedRow(record);
  };

  const Delete = (record) => {
    props.setOpenDeleteDialog(true);
    props.setSelectedRow(record);
  };

  return <Table columns={columns} dataSource={props.data} />;
};

export default WidnowList;
