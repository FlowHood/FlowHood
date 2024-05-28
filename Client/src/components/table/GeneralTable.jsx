import { Table } from "antd";
import { useTable } from "@/hooks/useTable";

const dummyData = [
  {
    key: "1",
    name: "activo",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: "nice",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 102,
    address: "London No. 1 Lake Park",
    tags: "inactivo",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Conteo A",
    tags: "activo",
  },
];
/*
this component has the following props:
 - data: is the data the table will display
 - columns: is the headers of the table 
 - addTagsOn: are tags inside the table it has the following structure
  {
    header: "header example",
    color: "#fff"
  }
 - addLinksOn: are links inside the table
 - addFiltersOn: addsFilters to the data
 }
*/
const dummyTags = ["age", "address", "tags"];
const dummySearch = ["address", "name"];
const dummySorter = ["age"];
const dummyFiltersOn = ["tags"];

export const TableComponent = ({
  data = dummyData,
  addTagsOn = dummyTags,
  addSearchOn = dummySearch,
  addSortOn = dummySorter,
  addFiltersOn = dummyFiltersOn,
}) => {
  const { filteredColumns, loading } = useTable(
    data,
    addTagsOn,
    addSortOn,
    addFiltersOn,
    addSearchOn,
  );

  return (
    <div className="w-full select-none">
      {loading ? (
        <span>Cargando...</span>
      ) : (
        <Table dataSource={data} columns={filteredColumns} />
      )}
    </div>
  );
};