import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskByIdAPI } from "../api/tasks";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import toast from "react-hot-toast";
import { ArrowLeft, Terminal, FileText, RefreshCw } from "lucide-react";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTask = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await getTaskByIdAPI(id);
      setTask(res.data);
    } catch {
      toast.error("Failed to fetch task");
      navigate("/dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  useEffect(() => {
    if (!task) return;
    if (task.status === "pending" || task.status === "running") {
      const interval = setInterval(() => fetchTask(), 3000);
      return () => clearInterval(interval);
    }
  }, [task, fetchTask]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <p className="text-gray-500 text-sm">Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-white font-bold text-xl">{task.title}</h1>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={task.status} />
              <button
                onClick={() => fetchTask(true)}
                className="text-gray-500 hover:text-white transition"
                title="Refresh"
              >
                <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs mb-1">Operation</p>
              <span className="text-gray-300 bg-gray-800 px-2.5 py-1 rounded-full text-xs">
                {task.operation}
              </span>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">Created</p>
              <p className="text-gray-300 text-xs">{formatDate(task.createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={15} className="text-gray-400" />
            <h2 className="text-white font-medium text-sm">Input Text</h2>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed bg-gray-800 rounded-lg p-4">
            {task.inputText}
          </p>
        </div>

        {task.result && (
          <div className="bg-gray-900 border border-green-500/20 rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <h2 className="text-white font-medium text-sm">Result</h2>
            </div>
            <p className="text-green-300 text-sm leading-relaxed bg-gray-800 rounded-lg p-4">
              {task.result}
            </p>
          </div>
        )}

        {(task.status === "pending" || task.status === "running") && (
          <div className="bg-gray-900 border border-blue-500/20 rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-3">
              <RefreshCw size={16} className="text-blue-400 animate-spin" />
              <p className="text-blue-300 text-sm">
                {task.status === "pending"
                  ? "Task is queued, waiting for worker..."
                  : "Worker is processing your task..."}
              </p>
            </div>
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={15} className="text-gray-400" />
            <h2 className="text-white font-medium text-sm">Logs</h2>
          </div>
          <div className="bg-gray-950 rounded-lg p-4 space-y-1.5">
            {task.logs && task.logs.length > 0 ? (
              task.logs.map((log, index) => (
                <p key={index} className="text-gray-400 text-xs font-mono">
                  <span className="text-gray-600 mr-2">[{index + 1}]</span>
                  {log}
                </p>
              ))
            ) : (
              <p className="text-gray-600 text-xs font-mono">No logs yet...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
