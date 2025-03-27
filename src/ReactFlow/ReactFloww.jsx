import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TextUpdaterNode from "./TextUpdaterNode";
import ReactForm from "./ReactForm";
import ReactTable from "./ReactTable";

const initialNodes = [
  {
    id: "node-1",
    position: { x: 0, y: 0 },
    type: "default",
    data: {
      nodeType: "Task",
      label: "Review Doc",
      assignee: "Gokul",
      dueDate: "1/1/2025",
      status: "Active",
    },
  },
  {
    id: "node-2",
    position: { x: 0, y: 100 },
    type: "default",
    data: {
      nodeType: "Condition",
      label: "Invoice Check",
      conditionType: "If Amount > $100",
      nextStep: "Manager Approval",
      status: "Inactive",
    },
  },
  {
    id: "node-3",
    position: { x: 0, y: 200 },
    data: {
      label: "Task Completed",
      nodeType: "Notification",
      message: "Your document review task is complete!",
      recipient: "Bob Williams",
      status: "Inactive",
    },
    type: "default",
  },
];

const ReactFloww = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const tableRef = useRef(null);
  const flowRef = useRef(null);

  const onNodesChange = useCallback((changes) => {
    setNodes((prevNodes) => {
      const updatedNodes = applyNodeChanges(changes, prevNodes);
      const nodeChanged = changes.find((change) => change.selected === true);
      if (nodeChanged) {
        const nodeSelected = updatedNodes.find(
          (node) => node.id === nodeChanged.id
        );
        setSelectedNode(nodeSelected);
      }

      return updatedNodes;
    });
  }, []);

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      console.log("Edge :", changes);
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
      console.log("Connect :", params);
    },
    [setEdges]
  );

  const onNodeDelete = (id) => {
    const deleteNode = nodes.filter((node) => node.id !== id);
    setNodes(deleteNode);
    const deleteEdge = edges.filter(
      (edge) => edge.source !== id && edge.target !== id
    );
    setEdges(deleteEdge);
    setSelectedNode(null);
  };

  const updateNodeData = (newData) => {
    setNodes((prev) => {
      const checkIf = nodes.find((node) => node.id === newData.id);
      return !checkIf
        ? [...prev, newData]
        : prev.map((node) => (node.id === newData.id ? newData : node));
    });
  };

  const handleScrollToTable = () => {
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFlow = () => {
    flowRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen overflow-auto">
      <div className="h-screen relative" ref={flowRef}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
        <button
          onClick={handleScrollToTable}
          className="absolute top-4 left-32 bg-blue-600 text-white px-4 py-12 rounded shadow hover:bg-blue-700 cursor-pointer"
        >
          View Table
        </button>
        <button
          type="button"
          onClick={() => onNodeDelete(selectedNode.id)}
          disabled={!selectedNode}
          className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 cursor-pointer"
        >
          Delete Node
        </button>
      </div>
      {selectedNode && (
        <div className="absolute top-0 right-0 w-80 bg-white shadow-lg p-5 h-full overflow-auto">
          <ReactForm
            selectedNode={selectedNode}
            updateNode={updateNodeData}
            resetSelection={() => setSelectedNode(null)}
          />
        </div>
      )}
      <div className="p-4 bg-gray-100 min-h-screen" ref={tableRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Node Data Table</h2>
          <button
            onClick={scrollToFlow}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
          >
            Back to Flow
          </button>
        </div>

        <ReactTable
          nodes={nodes}
          updateNode={updateNodeData}
          deleteNode={onNodeDelete}
        />
      </div>
    </div>
  );
};

export default ReactFloww;
