const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Result = require('../models/Result');
const { isAuthenticated, requireRole } = require('../middleware/auth');

// Protect all admin routes
router.use(isAuthenticated, requireRole('admin'));

// Dashboard
router.get('/dashboard', async (req, res) => {
  const studentCount = await User.countDocuments({ role: 'student' });
  const resultCount = await Result.countDocuments();
  res.render('admin/dashboard', { studentCount, resultCount, name: req.session.name });
});

// ---- STUDENT CRUD ----

// CREATE - form
router.get('/students/new', (req, res) => {
  res.render('admin/student-form', { student: null, error: null });
});

// CREATE - submit
router.post('/students', async (req, res) => {
  try {
    const { name, regNumber, email, password, department, level } = req.body;
    await User.create({ name, regNumber, email, password, department, level, role: 'student' });
    res.redirect('/admin/students');
  } catch (err) {
    res.render('admin/student-form', { student: null, error: 'Could not create student (reg number may already exist).' });
  }
});

// READ - list all students
router.get('/students', async (req, res) => {
  const students = await User.find({ role: 'student' }).sort({ createdAt: -1 });
  res.render('admin/students', { students });
});

// UPDATE - form
router.get('/students/:id/edit', async (req, res) => {
  const student = await User.findById(req.params.id);
  res.render('admin/student-form', { student, error: null });
});

// UPDATE - submit
router.put('/students/:id', async (req, res) => {
  try {
    const { name, email, department, level } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email, department, level });
    res.redirect('/admin/students');
  } catch (err) {
    res.status(500).send('Update failed');
  }
});

// DELETE
router.delete('/students/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  await Result.deleteMany({ student: req.params.id }); // clean up their results too
  res.redirect('/admin/students');
});

// ---- RESULT CRUD ----

// CREATE - form (pick a student first)
router.get('/results/new/:studentId', async (req, res) => {
  const student = await User.findById(req.params.studentId);
  res.render('admin/result-form', { student, result: null, error: null });
});

// CREATE - submit
router.post('/results/:studentId', async (req, res) => {
  try {
    const { session, term, courseCode, courseTitle, score } = req.body;
    await Result.create({ student: req.params.studentId, session, term, courseCode, courseTitle, score });
    res.redirect(`/admin/students/${req.params.studentId}/results`);
  } catch (err) {
    res.status(500).send('Could not add result');
  }
});

// READ - list a student's results
router.get('/students/:studentId/results', async (req, res) => {
  const student = await User.findById(req.params.studentId);
  const results = await Result.find({ student: req.params.studentId }).sort({ createdAt: -1 });
  res.render('admin/results', { student, results });
});

// UPDATE - form
router.get('/results/:id/edit', async (req, res) => {
  const result = await Result.findById(req.params.id).populate('student');
  res.render('admin/result-form', { student: result.student, result, error: null });
});

// UPDATE - submit
router.put('/results/:id', async (req, res) => {
  try {
    const { session, term, courseCode, courseTitle, score } = req.body;
    const result = await Result.findById(req.params.id);
    Object.assign(result, { session, term, courseCode, courseTitle, score });
    await result.save(); // triggers grade recalculation
    res.redirect(`/admin/students/${result.student}/results`);
  } catch (err) {
    res.status(500).send('Update failed');
  }
});

// DELETE
router.delete('/results/:id', async (req, res) => {
  const result = await Result.findById(req.params.id);
  const studentId = result.student;
  await Result.findByIdAndDelete(req.params.id);
  res.redirect(`/admin/students/${studentId}/results`);
});

module.exports = router;
