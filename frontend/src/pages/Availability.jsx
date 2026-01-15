export default function Availability({ hoursPerDay, setHoursPerDay }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(167,139,250,0.25)]">

      <h2 className="text-2xl font-medium mb-4">
        Availability
      </h2>

      <p className="mb-6 text-gray-600">
        How many hours can you study per day?
      </p>

      <label className="block text-sm font-medium mb-1">
  Hours you can study per day
      </label>

      <input
        type="range"
        min="1"
        max="16"
        value={hoursPerDay}
        onChange={(e) => setHoursPerDay(Number(e.target.value))}
        className="w-full accent-#973F96"
      />

      <p className="text-xs text-gray-500 mt-1">
        {hoursPerDay} hours/day
      </p>


      <div className="mt-4 text-lg font-medium">
        {hoursPerDay} hours / day
      </div>
    </div>
  );
}
