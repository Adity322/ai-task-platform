import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { ChevronRight, Clock } from "lucide-react";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      onClick={() => navigate(`/tasks/${task._id}`)}
      className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-indigo-500/50 transition group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm truncate">{task.title}</h3>
          <p className="text-gray-500 text-xs mt-1 truncate">{task.inputText}</p>
        </div>
        <ChevronRight
          size={16}
          className="text-gray-600 group-hover:text-indigo-400 transition mt-0.5 shrink-0"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <StatusBadge status={task.status} />
          <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">
            {task.operation}
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 text-xs">
          <Clock size={11} />
          {formatDate(task.createdAt)}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;