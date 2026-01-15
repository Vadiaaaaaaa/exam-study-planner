import { useState, useEffect } from "react";
import Exams from "./pages/Exams";
import Availability from "./pages/Availability";
import Syllabus from "./pages/Syllabus";
import Calendar from "./pages/Calendar";
import TodayTodo from "./pages/TodayTodo";

/* ---------- DATE HELPERS ---------- */
const parseLocalDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const formatLocalDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export default function App() {
  const [exams, setExams] = useState([]);
  const [topics, setTopics] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [calendar, setCalendar] = useState({});
  const [hydrated, setHydrated] = useState(false);

  /* ---------- LOAD FROM LOCAL STORAGE ---------- */
  useEffect(() => {
    const e = localStorage.getItem("exams");
    const t = localStorage.getItem("topics");
    const a = localStorage.getItem("assignments");
    const h = localStorage.getItem("hoursPerDay");
    const c = localStorage.getItem("calendar");

    if (e) setExams(JSON.parse(e));
    if (t) setTopics(JSON.parse(t));
    if (a) setAssignments(JSON.parse(a));
    if (h) setHoursPerDay(JSON.parse(h));
    if (c) setCalendar(JSON.parse(c));

    setHydrated(true);
  }, []);

  useEffect(() => {
  if (!hydrated) return;
  setCalendar({});
}, [topics, exams, hoursPerDay, hydrated]);


  /* ---------- SAVE TO LOCAL STORAGE ---------- */
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("exams", JSON.stringify(exams));
    localStorage.setItem("topics", JSON.stringify(topics));
    localStorage.setItem("assignments", JSON.stringify(assignments));
    localStorage.setItem("hoursPerDay", JSON.stringify(hoursPerDay));
    localStorage.setItem("calendar", JSON.stringify(calendar));
  }, [exams, topics, assignments, hoursPerDay, calendar, hydrated]);

  /* ---------- GENERATE CALENDAR ---------- */
  const generateCalendar = () => {
    if (!exams.length || !topics.length) return;

    const calendarMap = {};
    const dayHoursLeft = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    exams.forEach((exam) => {
      const examDate = parseLocalDate(exam.date);

      const subjectTopics = topics
        .filter((t) => t.subject === exam.subject)
        .map((t) => ({ ...t, remaining: t.difficulty }));

      let currentDay = new Date(today);

      while (
        subjectTopics.some((t) => t.remaining > 0) &&
        currentDay < examDate
      ) {
        const key = formatLocalDateKey(currentDay);

        if (!(key in dayHoursLeft)) {
          dayHoursLeft[key] = hoursPerDay;
        }

        if (dayHoursLeft[key] <= 0) {
          currentDay.setDate(currentDay.getDate() + 1);
          continue;
        }

        if (!calendarMap[key]) calendarMap[key] = [];

        for (const topic of subjectTopics) {
          if (topic.remaining <= 0) continue;
          if (dayHoursLeft[key] <= 0) break;

          const used = Math.min(topic.remaining, dayHoursLeft[key]);

          calendarMap[key].push({
            subject: exam.subject,
            topic: topic.name,
            duration: used,
          });

          topic.remaining -= used;
          dayHoursLeft[key] -= used;
        }

        currentDay.setDate(currentDay.getDate() + 1);
      }

      // 🔴 Revision day (day before exam)
      const reviseDate = new Date(examDate);
      reviseDate.setDate(reviseDate.getDate() - 1);
      const reviseKey = formatLocalDateKey(reviseDate);

      if (!(reviseKey in dayHoursLeft)) {
        dayHoursLeft[reviseKey] = hoursPerDay;
      }

      if (dayHoursLeft[reviseKey] > 0) {
        if (!calendarMap[reviseKey]) calendarMap[reviseKey] = [];

        const used = Math.min(hoursPerDay, dayHoursLeft[reviseKey]);

        calendarMap[reviseKey].push({
          subject: exam.subject,
          topic: `Revise for ${exam.subject}`,
          duration: used,
          isRevision: true,
        });

        dayHoursLeft[reviseKey] -= used;
      }
    });

    setCalendar(calendarMap);
  };

  return (
    <div className="min-h-screen bg-[#FDECEF] px-10 py-14">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold mb-12">
          🌸 Exam Study Planner
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN */}
          <div className="space-y-10">
            <Exams
              exams={exams}
              setExams={setExams}
              assignments={assignments}
              setAssignments={setAssignments}
            />

            <Syllabus
              topics={topics}
              setTopics={setTopics}
              exams={exams}
            />

            <Availability
              hoursPerDay={hoursPerDay}
              setHoursPerDay={setHoursPerDay}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(167,139,250,0.25)] flex justify-between">
              <h2 className="text-2xl font-medium">
                Generate calendar
              </h2>

              <button
                onClick={generateCalendar}
                className="
                  rounded-full border-2 border-[#963e96]
                  bg-[#FDECEC] text-[#963e96]
                  font-semibold px-6 h-[50px]
                  shadow-[4px_4px_0_0_#963e96]
                "
              >
                Generate
              </button>
            </div>

            <TodayTodo calendar={calendar} />
            <Calendar
              calendar={calendar}
              exams={exams}
              assignments={assignments}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
