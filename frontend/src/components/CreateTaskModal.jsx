import { useState } from "react";
import { createTaskAPI } from "../api/tasks";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const OPERATIONS = ["uppercase", "lowercase", "reverse", "wordcount"];

const CreateTaskModal = ({ onClose, onTaskCreated }) => {
  const [form, setForm] = useState({
    title: "",
    inputText: "",
    operation: "uppercase",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createTaskAPI(form);
      toast.success("Task created successfully!");
      onTaskCreated(res.data.task);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Task Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Convert my text"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Input Text</label>
            <textarea
              name="inputText"
              value={form.inputText}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter the text to process..."
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Operation</label>
            <select
              name="operation"
              value={form.operation}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            >
              {OPERATIONS.map((op) => (
                <option key={op} value={op}>
                  {op.charAt(0).toUpperCase() + op.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-2.5 rounded-lg text-sm transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;