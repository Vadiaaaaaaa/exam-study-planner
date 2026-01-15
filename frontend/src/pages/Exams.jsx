import { useState } from "react";

export default function Exams({
  exams,
  setExams,
  assignments,
  setAssignments,
}) {
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDate, setAssignmentDate] = useState("");

  /* ---------- ADD EXAM ---------- */
  const addExam = () => {
    if (!subject || !date) return;

    setExams((prev) => [
      ...prev,
      {
        id: Date.now(),
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

  /* ---------- ADD ASSIGNMENT ---------- */
  const addAssignment = () => {
    if (!assignmentName || !assignmentDate) return;

    setAssignments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: assignmentName,
        date: assignmentDate,
      },
    ]);

    setAssignmentName("");
    setAssignmentDate("");
  };

  const deleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(167,139,250,0.25)]">
      <h2 className="text-2xl font-medium mb-6">Exams</h2>

      {/* ---------- ADD EXAM FORM ---------- */}
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
            font-semibold
            px-6 h-[50px]
            shadow-[4px_4px_0_0_#963e96]
            transition-all
            hover:bg-white
            active:shadow-[2px_2px_0_0_#963e96]
            active:translate-x-[2px]
            active:translate-y-[2px]
          "
        >
          Add Exam
        </button>
      </div>

      {/* ---------- EXAM LIST ---------- */}
      {exams.length > 0 && (
        <div className="space-y-3 mb-8">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between bg-pink-50 rounded-xl px-4 py-3"
            >
              <div>
                <p className="font-medium">{exam.subject}</p>
                <p className="text-sm text-gray-500">{exam.date}</p>
              </div>

              <button
                onClick={() => deleteExam(exam.id)}
                className="text-rose-500 hover:text-rose-700 hover:bg-rose-100 rounded-lg px-3 py-1 transition"
                title="Delete exam"
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ---------- ASSIGNMENTS ---------- */}
      <h3 className="text-xl font-medium mb-3">Assignments</h3>

      <div className="space-y-3 mb-6">
        <input
          placeholder="Assignment name"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
          className="w-full border rounded-xl px-4 py-2"
        />

        <input
          type="date"
          value={assignmentDate}
          onChange={(e) => setAssignmentDate(e.target.value)}
          className="w-full border rounded-xl px-4 py-2"
        />

        <button
          onClick={addAssignment}
          className="
            inline-flex items-center justify-center
            rounded-full
            border-2 border-[#963e96]
            bg-[#FDECEC]
            text-[#963e96]
            font-semibold
            px-6 h-[50px]
            shadow-[4px_4px_0_0_#963e96]
            transition-all
            hover:bg-white
            active:shadow-[2px_2px_0_0_#963e96]
            active:translate-x-[2px]
            active:translate-y-[2px]
          "
        >
          Add Assignment
        </button>
      </div>

      {/* ---------- ASSIGNMENT LIST ---------- */}
      {assignments.length > 0 && (
        <div className="space-y-3">
          {assignments.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between bg-purple-50 rounded-xl px-4 py-3"
            >
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="text-sm text-gray-500">{a.date}</p>
              </div>

              <button
                onClick={() => deleteAssignment(a.id)}
                className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg px-3 py-1 transition"
                title="Delete assignment"
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
