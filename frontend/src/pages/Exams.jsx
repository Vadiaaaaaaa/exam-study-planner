import { useState } from "react";

export default function Exams({ exams, setExams }) {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  const addExam = () => {
    if (!subject || !date) return;

    setExams([
      ...exams,
      {
        id: Date.now(), // ✅ stable id
        subject,
        date,
      },
    ]);

    setSubject("");
    setDate("");
  };

  const deleteExam = (id) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(167,139,250,0.25)]">
      <h2 className="text-2xl font-medium mb-6">
        Exams
      </h2>

      {/* Add exam form */}
      <div className="space-y-4 mb-6">
        <input
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Subject (e.g. Maths)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          className="w-full rounded-xl border px-4 py-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={addExam}
          className="
            inline-flex items-center justify-center
            rounded-full
            border-2 border-[#963e96]
            bg-[#FDECEC]
            text-[#963e96]
            font-semibold text-lg
            px-6 h-[50px]
            shadow-[4px_4px_0_0_#963e96]
            transition-all
            hover:bg-white
            active:shadow-[2px_2px_0_0_#963e96]
            active:translate-x-[2px]
            active:translate-y-[2px]
            select-none
          "
        >
          Add Exam
        </button>
      </div>

      {/* Exam list */}
      {exams.length > 0 && (
        <div className="space-y-3">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="
                flex items-center justify-between
                bg-pink-50
                rounded-xl
                px-4 py-3
              "
            >
              <div>
                <p className="font-medium">
                  {exam.subject}
                </p>
                <p className="text-sm text-gray-500">
                  {exam.date}
                </p>
              </div>

              <button
                onClick={() => deleteExam(exam.id)}
                className="
                  text-rose-500
                  hover:text-rose-700
                  hover:bg-rose-100
                  rounded-lg
                  px-3 py-1
                  transition
                "
                title="Delete exam"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
