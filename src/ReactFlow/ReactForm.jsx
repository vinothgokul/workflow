import { useForm } from "react-hook-form";
import nodeData from "./data.json";
import { useEffect, useState } from "react";

export default function NodeConfigPanel({
  selectedNode,
  updateNode,
  resetSelection,
}) {
  const [nodeConfig, setNodeConfig] = useState();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: selectedNode.data,
  });

  useEffect(() => {
    if (selectedNode) {
      const nodeConfig = nodeData.find(
        (config) => config.nodeType === selectedNode.data.nodeType
      );
      setNodeConfig(nodeConfig);
      console.log(selectedNode);
      reset(selectedNode.data);
    }
  }, [selectedNode, reset]);

  const onSubmit = (formData) => {
    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        ...formData,
      },
    };
    console.log(updatedNode)
    updateNode(updatedNode);
    resetSelection();
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-4">
        {selectedNode.data.nodeType} Configuration
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {nodeConfig?.registerValues.map((key, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-medium">
              {nodeConfig.labels[index]}
            </label>
            <input
              {...register(key)}
              className="border p-2 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Save
          </button>
          <button
            type="button"
            onClick={resetSelection}
            className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
