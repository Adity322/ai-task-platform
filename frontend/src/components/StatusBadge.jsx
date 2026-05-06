const statusStyles = {
  pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  running: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  success: "bg-green-500/10 text-green-400 border border-green-500/20",
  failed: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;