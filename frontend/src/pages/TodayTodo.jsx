export default function TodayTodo({ calendar }) {
  const todayKey = new Date().toISOString().split("T")[0];
  const tasks = calendar[todayKey] || [];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(167,139,250,0.25)]">

      <h2 className="text-2xl font-medium mb-4">
        Today’s To-Do
      </h2>

      {tasks.length === 0 && (
        <p className="text-gray-500">
          No study tasks scheduled for today 🎉
        </p>
      )}

      <div className="space-y-3">
        {tasks.map((task, i) => (
          <label
            key={i}
            className="flex items-center justify-between bg-bg rounded-xl px-4 py-3 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 accent-pink-400"
              />

              <div>
                <div className="font-medium">
                  {task.subject}
                </div>
                <div className="text-sm text-gray-600">
                  {task.topic}
                </div>
              </div>
            </div>

            <div className="text-sm font-medium">
              {task.duration}h
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
