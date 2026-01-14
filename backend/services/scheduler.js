function generateSchedule({ topics, startDay, endDay, minutesPerDay }) {
const schedule = {};


for (let day = startDay; day <= endDay; day++) {
let available = minutesPerDay;
schedule[day] = [];


const ready = topics
.filter(t => !t.completed && t.remainingMinutes > 0 && t.deadlineDay >= day)
.sort((a, b) => {
const scoreA = (a.weight / a.remainingMinutes);
const scoreB = (b.weight / b.remainingMinutes);
return scoreB - scoreA;
});


for (const topic of ready) {
if (available <= 0) break;


const alloc = Math.min(available, topic.remainingMinutes);


schedule[day].push({
topic: topic.name,
subject: topic.subject,
minutes: alloc
});


topic.remainingMinutes -= alloc;
available -= alloc;


if (topic.remainingMinutes === 0) topic.completed = true;
}
}


return schedule;
}


module.exports = { generateSchedule };