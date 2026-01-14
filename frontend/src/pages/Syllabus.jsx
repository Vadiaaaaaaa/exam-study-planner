import { useState } from "react";

export default function Syllabus({ topics, setTopics, exams }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState(1);

  const addTopic = () => {
    if (!name || !subject) return;

    setTopics([
      ...topics,
      {
        name,
        subject,
        difficulty: Number(difficulty),
      },
    ]);

    setName("");
    setSubject("");
    setDifficulty(1);
  };

  const deleteTopic = (indexToDelete) => {
    setTopics(topics.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(167,139,250,0.25)]">
      <h2 className="text-2xl font-medium mb-6">
        Syllabus Topics
      </h2>

      {/* Add topic form */}
      <div className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Topic name"
          className="w-full border rounded-xl px-4 py-2"
        />

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border rounded-xl px-4 py-2"
        >
          <option value="">Select subject</option>
          {exams.map((exam, i) => (
            <option key={i} value={exam.subject}>
              {exam.subject}
            </option>
          ))}
        </select>

        <div>
          <label className="text-sm text-gray-600">
            Hours Required: {difficulty}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full"
          />
        </div>

        <button
          onClick={addTopic}
          className="
            inline-flex items-center justify-center
            rounded-full
            border-2 border-[#963e96]
            bg-[#FDECEC]
            text-[#963e96]
            font-semibold
            px-6 h-[44px]
            shadow-[4px_4px_0_0_#963e96]
            transition-all
            hover:bg-white
            active:shadow-[2px_2px_0_0_#963e96]
            active:translate-x-[2px]
            active:translate-y-[2px]
            select-none
          "
        >
          Add Topic
        </button>
      </div>

      {/* Topic list */}
      {topics.length > 0 && (
        <div className="mt-8 space-y-3">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="
                flex items-center justify-between
                bg-pink-50
                rounded-xl
                px-4 py-3
              "
            >
              <div>
                <p className="font-medium">
                  {topic.name}
                </p>
                <p className="text-sm text-gray-600">
                  {topic.subject} • Difficulty {topic.difficulty}
                </p>
              </div>

              <button
                onClick={() => deleteTopic(index)}
                className="
                  text-rose-500
                  hover:text-rose-700
                  hover:bg-rose-100
                  rounded-lg
                  px-3 py-1
                  transition
                "
                title="Delete topic"
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
