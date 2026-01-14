const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Exam = require('../models/Exam');
const { generateSchedule } = require('../services/scheduler');


router.post('/exam', async (req, res) => {
const exam = await Exam.create(req.body);
res.json(exam);
});


router.post('/topic', async (req, res) => {
  try {
    const topic = await Topic.create({
      ...req.body,
      remainingMinutes: req.body.estMinutes
    });
    res.json(topic);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        error: 'Topic with this name already exists'
      });
    }
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/generate', async (req, res) => {
const topics = await Topic.find();


const schedule = generateSchedule({
topics,
startDay: req.body.startDay,
endDay: req.body.endDay,
minutesPerDay: req.body.minutesPerDay
});


res.json(schedule);
});


module.exports = router;