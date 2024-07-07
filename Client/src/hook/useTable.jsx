import { colorTableDictionary } from "../lib/tableUtils";
import { Chip } from "../components/chip/Chip";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Space } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import "../components/table/Table.css";

export const useTable = (
  data = [],
  addTagsOn = [],
  addSortOn = [],
  addFilterOn = [],
  addSearchOn = [],
  onEdit = null,
  onDelete = null,
  onView = () => {},
) => {
  const [columns, setColumns] = useState([]);
  const [_, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [loading, setLoading] = useState(true);
  const [filteredColumns, setFilteredColumns] = useState(null);

  useEffect(() => {
    setLoading(true);
    const cols = generateColumns();
    generateFilteredColumns(cols);
    setLoading(false);
  }, []);

  const generateColumns = () => {
    if (data.length < 1) return;
    const _c = Object.keys(data[0]);
    const cols = _c.map((col) => {
      return {
        title: col[0].toUpperCase() + col.slice(1),
        dataIndex: col.toLowerCase(),
        key: col.toLowerCase(),
        render: col === "picture" ? renderPictureColumn : undefined,
        width: col === "razon" ? 1450 : undefined,
        className: col === "razon" ? "razon-column" : undefined,
      };
    });

    cols.push({
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          {onEdit && (
            <Button icon={<EditOutlined />} onClick={() => onEdit(record.id)} />
          )}
          {onDelete && (
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => onDelete(record.id)}
            />
          )}
          <Button icon={<EyeOutlined />} onClick={() => onView(record.id)} />
        </Space>
      ),
    });

    setColumns(cols);
    return cols;
  };

  const generateFilteredColumns = (columns = []) => {
    let tableColumns = addTagsOn.length > 0 ? checkTableTags(columns) : columns;
    tableColumns =
      addSortOn.length > 0 ? checkTableSort(tableColumns) : tableColumns;
    tableColumns =
      addFilterOn.length > 0 ? checkTableFilter(tableColumns) : tableColumns;
    tableColumns =
      addSearchOn.length > 0 ? checkTableSearch(tableColumns) : tableColumns;
      
    tableColumns = tableColumns.filter((column) => column.key !== "id");
    tableColumns = checkTableState(tableColumns); // add state chip to table

    setFilteredColumns(tableColumns);
  };

  const renderPictureColumn = (text, record) => (
    <div className="flex items-center">
      <img src={record.picture} alt="image" className="w-12 h-12 rounded-full" />
    </div>
  );

  const checkTableState = (columns = []) => {
    return columns.map((column) => {
      if (column.key === "estado") {
        return {
          ...column,
          render: (_, record) => {
            const estado = record[column.key];
            const stateColor =
              estado?.toString().toLowerCase() === "activo"
                ? "circle-state-chip active"
                : estado?.toString().toLowerCase() === "inactivo"
                  ? "circle-state-chip inactive"
                  : "circle-state-chip none";
            return <Chip className={stateColor}>{estado}</Chip>;
          },
        };
      }
      return column;
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };

  //handler to add tags on table in any column
  const checkTableTags = (data = []) => {
    //verify addTagsOn is not empty
    if (addTagsOn.length < 1) return data;
    //mapping new array with the render Tag component for the table column
    return data.map((column) => {
      //check if addTagsOn includes keys from the data to add the render component
      if (addTagsOn.includes(column.key))
        return {
          //add previous columns
          ...column,
          render: (_, record) => {
            const tagsToBeAdded = [record[column.key]].flat(1); // get tagsToBeAdded by column key
            return (
              <div className="flex flex-row gap-1">
                {tagsToBeAdded && tagsToBeAdded.length > 0 ? (
                  tagsToBeAdded.map((tag) => {
                    const colorTag = colorTableDictionary[
                      tag.toString().toLowerCase()
                    ]
                      ? colorTableDictionary[tag.toString().toLowerCase()]
                      : colorTableDictionary["default"];
                    const stateColor =
                      tag.toString().toLowerCase() === "activo"
                        ? "circle-state-chip active"
                        : tag.toString().toLowerCase() === "inactivo"
                          ? "circle-state-chip inactive"
                          : "circle-state-chip none";
                    return (
                      <Chip
                        className={`${colorTag}`}
                        classNameStatus={`${stateColor}`}
                        key={record.key + tag}
                      >
                        {tag}
                      </Chip>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            );
          },
        };
      return column;
    });
  };

  //handler to add Sort in any column of the table
  const checkTableSort = (data = []) => {
    //verify addSortOn is not empty
    if (addSortOn.length < 1) return data;
    //mapping new array with the render Tag component for the table column
    return data.map((column) => {
      //check if addSortOn includes keys from the data to add the render component
      if (addSortOn.includes(column.key))
        return {
          //add previous columns
          ...column,
          sorter: (a, b) => {
            if (
              typeof a[column.key] === "number" &&
              typeof b[column.key] === "number"
            )
              return a[column.key] - b[column.key];
            else if (
              typeof a[column.key] === "string" &&
              typeof b[column.key] === "string"
            )
              return a[column.key].localeCompare(b[column.key]);
          },
        };
      return column;
    });
  };

  //handler to add filter on table in any column
  const checkTableFilter = (columns = []) => {
    //verify addFilterOn is not empty
    if (addFilterOn.length < 1) return columns;
    //mapping new array with the render Tag component for the table column
    return columns.map((column) => {
      if (column.key === "picture") return column;
      //check if addFilterOn includes keys from the columns to add the render component

      //local filtered options to avoid repeated items on list
      const _filteredOptions = [];
      data.forEach((_d) => {
        if (_d[column.key] && !_filteredOptions.includes(_d[column.key])) {
          _filteredOptions.push(_d[column.key]);
        }
      });

      //filtered options list
      const filters = _filteredOptions.map((_option) => {
        console.log("_option", _option);
        return {
          text: _option.toString().toLowerCase(),
          value: _option.toString().toLowerCase(),
        };
      });

      if (filters.length >= 1) {
        return {
          //add previous columns
          ...column,
          //custom columns
          filters: filters,
          onFilter: (value, record) => record[column.key] === value,
        };
      }
      return column;
    });
  };

  //handler to add search in any column of the table
  const checkTableSearch = (data = []) => {
    //verify addSearchOn is not empty
    if (addSearchOn.length < 1) return data;
    //mapping new array with the render Tag component for the table column
    const mappedObj = data.map((column) => {
      //check if addSearchOn includes keys from the data to add the render component
      if (addSearchOn.includes(column.key)) {
        // setDataIndex(column.key);
        return {
          ...column,
          filterDropdown: filterDropdown(column.key),
          filterIcon,
          onFilter: onFilter(column.key),
          onFilterDropdownOpenChange,
          render: render(column.key),
        };
      }

      return column; // if addSearchOn does not have any key in it then it just return current column
    });
    return mappedObj;
  };

  const filterDropdown =
    (dataIndex) =>
    // eslint-disable-next-line react/display-name
    ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            className="bg-quaternary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              handleReset(clearFilters, confirm);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    );

  const filterIcon = (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? "#1677ff" : undefined,
      }}
    />
  );

  const onFilter = (dataIndex) => (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());

  const onFilterDropdownOpenChange = (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  };

  const render = (dataIndex) => (text) =>
    searchedColumn === dataIndex ? text : text;

  return {
    loading,
    filteredColumns,
  };
};