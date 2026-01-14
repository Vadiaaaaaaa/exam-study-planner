import { generateSchedule } from '../api';

export default function Schedule() {
  const handleGenerate = async () => {
    const res = await generateSchedule({
      startDay: 0,
      endDay: 10,
      minutesPerDay: 240
    });
    console.log('Generated Schedule:', res.data);
    alert('Schedule generated – check console');
  };

  return <button onClick={handleGenerate}>Generate Schedule</button>;
}
