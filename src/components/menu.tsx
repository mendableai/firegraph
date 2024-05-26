import React from "react";

export default function Menu({
  padding,
  setPadding,
}: {
  padding: number;
  setPadding: (padding: number) => void;
}) {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-transparent p-4 rounded-lg bg-slate-700">
      <div className="flex items-center space-x-2">
        <span className="text-white">Padding</span>
        <select
          className="bg-gray-700 text-white p-1 rounded"
          value={padding}
          onChange={(e) => setPadding(Number(e.target.value))}
        >
          <option value={16}>16</option>
          <option value={32}>32</option>
          <option value={64}>64</option>
          <option value={128}>128</option>
        </select>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add data
      </button>
      <button className="bg-red-600 text-white px-4 py-2 rounded">
        Export
      </button>
    </div>
  );
}
