import { useNavigate } from "react-router-dom";
import { Cpu, Zap, Shield, BarChart2, ArrowRight, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <Zap size={20} className="text-indigo-400" />,
    title: "Async Task Processing",
    description: "Tasks run in the background via a Redis queue. No waiting, no blocking.",
  },
  {
    icon: <Shield size={20} className="text-indigo-400" />,
    title: "Secure by Default",
    description: "JWT authentication, bcrypt password hashing, and rate limiting out of the box.",
  },
  {
    icon: <BarChart2 size={20} className="text-indigo-400" />,
    title: "Real-time Status",
    description: "Track every task from pending to success with live status updates and logs.",
  },
  {
    icon: <Cpu size={20} className="text-indigo-400" />,
    title: "Python Worker",
    description: "A dedicated Python worker handles all processing — scalable to multiple replicas.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create a Task",
    description: "Enter your text, choose an operation and submit. Task is instantly queued.",
  },
  {
    step: "02",
    title: "Worker Processes It",
    description: "Python worker picks it up from Redis, processes it and updates the status.",
  },
  {
    step: "03",
    title: "View Results & Logs",
    description: "See the output, full logs and status history on the task detail page.",
  },
];

const operations = ["UPPERCASE", "lowercase", "esrever", "Word: 4"];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="text-indigo-400" size={22} />
            <span className="font-semibold text-lg">AI Task Platform</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-gray-400 hover:text-white transition px-4 py-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <Zap size={12} />
          Async · Scalable · Production Ready
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
          Process AI Tasks
          <br />
          <span className="text-indigo-400">at any scale</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          A full-stack task processing platform built with MERN stack, Redis queues,
          and a Python worker. Built for speed, security, and scale.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            Start for free
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 font-medium px-6 py-3 rounded-lg transition"
          >
            Sign in
          </button>
        </div>

        {/* Hero Visual */}
        <div className="mt-16 bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl mx-auto text-left">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-600 text-xs ml-2">task_processor.py</span>
          </div>
          <div className="space-y-2 font-mono text-sm">
            <p><span className="text-purple-400">def</span> <span className="text-blue-400">process_task</span><span className="text-gray-400">(operation, text):</span></p>
            <p className="pl-6"><span className="text-purple-400">if</span> operation == <span className="text-green-400">"uppercase"</span>: <span className="text-gray-400">→</span> <span className="text-yellow-300">{operations[0]}</span></p>
            <p className="pl-6"><span className="text-purple-400">if</span> operation == <span className="text-green-400">"lowercase"</span>: <span className="text-gray-400">→</span> <span className="text-yellow-300">{operations[1]}</span></p>
            <p className="pl-6"><span className="text-purple-400">if</span> operation == <span className="text-green-400">"reverse"</span>:   <span className="text-gray-400">→</span> <span className="text-yellow-300">{operations[2]}</span></p>
            <p className="pl-6"><span className="text-purple-400">if</span> operation == <span className="text-green-400">"wordcount"</span>: <span className="text-gray-400">→</span> <span className="text-yellow-300">{operations[3]}</span></p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Everything you need</h2>
          <p className="text-gray-400">Built with production-grade tools and best practices.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500/40 transition">
              <div className="bg-indigo-500/10 w-9 h-9 rounded-lg flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">How it works</h2>
          <p className="text-gray-400">Three simple steps from task creation to result.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="relative bg-gray-900 border border-gray-800 rounded-xl p-6">
              <span className="text-5xl font-bold text-gray-800 absolute top-4 right-5">
                {s.step}
              </span>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={16} className="text-indigo-400" />
                <h3 className="text-white font-semibold text-sm">{s.title}</h3>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">
            Create your account and run your first task in under a minute.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition"
          >
            Create free account
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="text-indigo-400" size={16} />
            <span className="text-gray-500 text-sm">AI Task Platform</span>
          </div>
          <p className="text-gray-600 text-xs">Built with MERN + Redis + Python</p>
        </div>
      </footer>

    </div>
  );
};

export default Landing;