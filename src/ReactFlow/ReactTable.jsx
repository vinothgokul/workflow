import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import nodesConfig from "./data.json";

export default function ReactTable({ nodes, updateNode, deleteNode }) {
  const [updatedRow, setUpdatedRow] = useState(null);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (updatedRow) updateNode(updatedRow);
    setUpdatedRow(null);
  }, [updatedRow]);

  const handleUpdate = (rowIndex, columnId, value) => {
    const keys = columnId.split("_");
    nodes.map((row, index) => {
      if (index === rowIndex) {
        const updatedRow = {
          ...row,
          data: {
            ...row.data,
            [keys[1]]: value,
          },
        };
        setUpdatedRow(updatedRow);
      }
      return row;
    });
  };

  const columns = [
    {
      header: "Node Type",
      accessorKey: "data.nodeType",
      cell: ({ row, column }) => (
        <select
          value={row.original.data.nodeType}
          onChange={(e) => handleUpdate(row.index, column.id, e.target.value)}
          className={`rounded-xl ${
            row.original.data.nodeType === "Task"
              ? "bg-blue-100"
              : row.original.data.nodeType === "Condition"
              ? "bg-yellow-100"
              : row.original.data.nodeType === "Notification"
              ? "bg-red-100"
              : "bg-white"
          }`}
        >
          {nodesConfig.map((node) => (
            <option value={node.nodeType} key={node.id} className="bg-white">
              {node.nodeType}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: "Node Name",
      accessorKey: "data.label",
      cell: ({ getValue, row, column }) => {
        const initialValue = getValue();
        const [value, setValue] = useState(initialValue);

        const onBlur = () => {
          handleUpdate(row.index, column.id, value);
        };

        return (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        );
      },
    },
    {
      header: "Status",
      accessorKey: "data.status",
      cell: ({ row, column }) => {
        return (
          <select
            value={row.original.data.status}
            onChange={(e) => handleUpdate(row.index, column.id, e.target.value)}
            className={`rounded-xl ${
              row.original.data.status === "Active"
                ? "bg-green-600 text-white"
                : "bg-gray-600 text-white"
            }`}
          >
            <option value="Active" className="bg-white text-black">
              Active
            </option>
            <option value="Inactive" className="bg-white text-black">
              Inactive
            </option>
          </select>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }) => {
        return (
          <button
            onClick={() => deleteNode(row.original.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>
        );
      },
    },
  ];

  const tableInstance = useReactTable({
    columns,
    data: nodes,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddRow = (e) => {
    e.preventDefault();
    const newRowValues = {
      id: `node-${nodes.length + 1}`,
      position: {
        x: lastPosition.current.x + 50,
        y: lastPosition.current.y + 50,
      },
      type: "default",
    };
    let updatedRow = {};
    for (let i = 0; i < e.target.length; i++) {
      const input = e.target[i];
      if (input.name) {
        const keys = input.name.split("_");
        updatedRow[keys[1]] = input.value;
      }
    }
    setUpdatedRow({ ...newRowValues, data: { ...updatedRow } });
    lastPosition.current = newRowValues.position;
    e.target.reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleAddRow}
        className="p-4 bg-white shadow-md rounded-lg flex flex-wrap gap-4"
      >
        {tableInstance.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => {
            const id = header.id;
            switch (id) {
              case "data_status":
                return (
                  <select key={id} name={id} className="border p-2 rounded-md">
                    <option value="Inactive">Inactive</option>
                    <option value="Active">Active</option>
                  </select>
                );
              case "data_nodeType":
                return (
                  <select key={id} name={id} className="border p-2 rounded-md">
                    {nodesConfig.map((node) => (
                      <option value={node.nodeType} key={node.id}>
                        {node.nodeType}
                      </option>
                    ))}
                  </select>
                );
              case "id":
                return (
                  <button
                    type="submit"
                    key={id}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                  >
                    Submit
                  </button>
                );
              default:
                return (
                  <input
                    key={id}
                    type="text"
                    name={id}
                    placeholder={header.column.columnDef.header}
                    className="border p-2 rounded-md w-40"
                  />
                );
            }
          })
        )}
      </form>
      {nodes.length !== 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-700">
              {tableInstance.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-semibold"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstance.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="odd:bg-gray-70 even:bg-white hover:bg-gray-100 border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
