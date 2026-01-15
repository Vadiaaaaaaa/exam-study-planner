export default function Calendar({ calendar, exams }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startWeekday = firstDay.getDay(); // 0 = Sunday
  const totalDays = lastDay.getDate();

  // ✅ LOCAL DATE KEY (CRITICAL)
  const formatLocalDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const days = [];

  // Empty cells before month starts
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }

  // Actual days
  for (let d = 1; d <= totalDays; d++) {
    days.push(new Date(year, month, d));
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(167,139,250,0.25)]">
      <h2 className="text-2xl font-medium mb-6">
        Study Calendar
      </h2>

      {!Object.keys(calendar).length && (
        <p className="text-gray-500">
          Generate your study plan to see the calendar
        </p>
      )}

      <div className="grid grid-cols-7 gap-4 text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-medium text-gray-600">
            {d}
          </div>
        ))}

        {days.map((date, i) => {
          if (date === null) {
            return <div key={i} className="min-h-[110px]" />;
          }

          // ✅ FIXED KEY (NO ISO, NO UTC)
          const key = formatLocalDateKey(date);

          const sessions = calendar[key] || [];
          const examForDay = exams.find((e) => e.date === key);

          const isExamDay = Boolean(examForDay);
          const isPastDay = date < today;
          const isToday =
            date.getTime() === today.getTime();

          return (
            <div
              key={i}
              className={`
                rounded-xl p-2 min-h-[110px] flex flex-col border transition
                ${
                  isPastDay
                    ? "bg-gray-100 text-gray-400 opacity-60 line-through"
                    : isExamDay
                    ? "bg-red-50 border-red-400"
                    : "bg-white"
                }
                ${isToday ? "ring-2 ring-pink-300" : ""}
              `}
            >
              <div
                className={`text-xs font-semibold mb-1 ${
                  isExamDay ? "text-red-600" : ""
                }`}
              >
                {date.getDate()}
                {isExamDay && (
                  <span className="ml-1">
                    • {examForDay.subject} EXAM
                  </span>
                )}
              </div>

              {!isPastDay && (
                <div className="space-y-1 overflow-hidden">
                  {sessions.map((s, j) => (
                    <div
                      key={j}
                      className={`rounded-md px-2 py-1 text-[11px]
                        ${
                          s.isRevision
                            ? "bg-purple-100 text-purple-700"
                            : "bg-pink-100"
                        }
                      `}
                    >
                      {s.subject}: {s.topic} ({s.duration}h)
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
