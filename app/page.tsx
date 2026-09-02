"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Learn JavaScript", completed: false },
    { id: 2, title: "Build To-Do App", completed: true },
    { id: 3, title: "Study React", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <main
      className={`min-h-screen px-6 py-10 transition-colors ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Stay organized
            </p>

            <h1 className="text-3xl font-semibold tracking-tight">
              My Tasks
            </h1>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-gray-800 shadow-sm hover:bg-gray-50"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* Add Task */}
        <section className="mb-8">
          <div
            className={`flex gap-3 rounded-2xl border p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ${
              darkMode
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-white"
            }`}
          >
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
              placeholder="Add a new task..."
              className={`flex-1 bg-transparent px-3 outline-none ${
                darkMode
                  ? "placeholder:text-gray-500"
                  : "placeholder:text-gray-400"
              }`}
            />

            <button
              onClick={addTask}
              className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Add
            </button>
          </div>
        </section>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {(["all", "active", "completed"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                filter === item
                  ? darkMode
                    ? "bg-white text-gray-900"
                    : "bg-gray-900 text-white"
                  : darkMode
                    ? "text-gray-400 hover:bg-gray-900"
                    : "text-gray-500 hover:bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Task List */}
        <section
          className={`overflow-hidden rounded-2xl border shadow-[0_10px_35px_rgba(0,0,0,0.12)] ${
            darkMode
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          {filteredTasks.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p
                className={`text-lg font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                No tasks here
              </p>

              <p
                className={`mt-2 text-sm ${
                  darkMode ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Add a task to get started.
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-4 border-b px-6 py-5 last:border-b-0 ${
                  darkMode ? "border-gray-800" : "border-gray-100"
                }`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
                    task.completed
                      ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900"
                      : darkMode
                        ? "border-gray-600"
                        : "border-gray-300"
                  }`}
                >
                  {task.completed && "✓"}
                </button>

                <p
                  className={`flex-1 ${
                    task.completed
                      ? "text-gray-400 line-through"
                      : darkMode
                        ? "text-gray-200"
                        : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-sm text-gray-400 transition hover:text-red-500"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </section>

        {/* Footer */}
        <div className="mt-5 flex justify-between px-2">
          <p
            className={`text-sm ${
              darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            {remainingTasks}{" "}
            {remainingTasks === 1 ? "task" : "tasks"} remaining
          </p>

          <p
            className={`text-sm ${
              darkMode ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {tasks.length} total
          </p>
        </div>
      </div>
    </main>
  );
}