import { addTopic } from '../api';

export default function AddTopic() {
  const handleAdd = async () => {
  try {
    await addTopic({
      name: 'Algebra-' + Date.now(), // must be UNIQUE
      subject: 'Maths',
      estMinutes: 300,
      weight: 5,
      deadlineDay: 10
    });
    alert('Topic added');
  } catch (err) {
    alert(err.response?.data?.error || 'Failed to add topic');
  }
};

  return <button onClick={handleAdd}>Add Sample Topic</button>;
}
