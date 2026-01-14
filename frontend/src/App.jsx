import { useState, useEffect } from "react";
import Exams from "./pages/Exams";
import Availability from "./pages/Availability";
import Syllabus from "./pages/Syllabus";
import Calendar from "./pages/Calendar";
import TodayTodo from "./pages/TodayTodo";

export default function App() {
  const [exams, setExams] = useState([]);
  const [topics, setTopics] = useState([]);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [calendar, setCalendar] = useState({});
  const [hydrated, setHydrated] = useState(false);

  // ✅ LOAD ONCE
  useEffect(() => {
    const e = localStorage.getItem("exams");
    const t = localStorage.getItem("topics");
    const h = localStorage.getItem("hoursPerDay");
    const c = localStorage.getItem("calendar");

    if (e) setExams(JSON.parse(e));
    if (t) setTopics(JSON.parse(t));
    if (h) setHoursPerDay(JSON.parse(h));
    if (c) setCalendar(JSON.parse(c));

    setHydrated(true);
  }, []);

  // ✅ SAVE ONLY AFTER LOAD
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("exams", JSON.stringify(exams));
  }, [exams, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("hoursPerDay", JSON.stringify(hoursPerDay));
  }, [hoursPerDay, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("calendar", JSON.stringify(calendar));
  }, [calendar, hydrated]);

  // ❌ DO NOT AUTO-CLEAR CALENDAR
  // User explicitly regenerates it

  const generateCalendar = () => {
    if (!exams.length || !topics.length || !hoursPerDay) return;

    const plan = [];

    exams.forEach((exam) => {
      const subjectTopics = topics.filter(
        (t) => t.subject === exam.subject
      );

      const start = new Date();
      const end = new Date(exam.date);
      const days =
        Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      let idx = 0;

      for (let i = 0; i < days && idx < subjectTopics.length; i++) {
        let remaining = hoursPerDay;
        const sessions = [];

        while (remaining > 0 && idx < subjectTopics.length) {
          const topic = subjectTopics[idx];
          const used = Math.min(remaining, topic.difficulty);

          sessions.push({
            subject: exam.subject,
            topic: topic.name,
            duration: used,
          });

          remaining -= used;
          idx++;
        }

        plan.push({
          date: new Date(start.getTime() + i * 86400000),
          sessions,
        });
      }
    });

    const map = {};
    plan.forEach((d) => {
      map[d.date.toISOString().split("T")[0]] = d.sessions;
    });

    setCalendar(map);
  };

  return (
    <div className="min-h-screen bg-[#FDECEF] px-10 py-14">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold mb-12">
          Exam Study Planner
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-10">
            <Exams exams={exams} setExams={setExams} />
            <Syllabus topics={topics} setTopics={setTopics} exams={exams} />
            <Availability hoursPerDay={hoursPerDay} setHoursPerDay={setHoursPerDay} />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 shadow-lg flex justify-between">
              <h2 className="text-2xl font-medium">Generate calendar</h2>

              <button
                onClick={generateCalendar}
                className="
                  rounded-full border-2 border-[#963e96]
                  bg-[#FDECEC] text-[#963e96]
                  font-semibold px-6 h-[50px]
                  shadow-[4px_4px_0_0_#963e96]
                  hover:bg-white
                  active:shadow-[2px_2px_0_0_#963e96]
                  active:translate-x-[2px]
                  active:translate-y-[2px]
                "
              >
                Generate
              </button>
            </div>

            <TodayTodo calendar={calendar} />
            <Calendar calendar={calendar} exams={exams} />
          </div>
        </div>
      </div>
    </div>
  );
}
