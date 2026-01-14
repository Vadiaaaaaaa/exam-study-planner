import { addExam } from '../api';

export default function AddExam() {
  const handleAdd = async () => {
    await addExam({ subject: 'Maths', day: 10 });
    alert('Exam added');
  };

  return <button onClick={handleAdd}>Add Sample Exam</button>;
}
