const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const User = require('../models/User');
const Result = require('../models/Result');
const { isAuthenticated, requireRole } = require('../middleware/auth');

// Protect all student routes
router.use(isAuthenticated, requireRole('student'));

// Dashboard - view own results
router.get('/dashboard', async (req, res) => {
  const student = await User.findById(req.session.userId);
  const results = await Result.find({ student: req.session.userId }).sort({ session: 1, term: 1 });
  res.render('student/dashboard', { student, results });
});

// Download results as PDF
router.get('/results/pdf', async (req, res) => {
  const student = await User.findById(req.session.userId);
  const results = await Result.find({ student: req.session.userId }).sort({ session: 1, term: 1 });

  const doc = new PDFDocument({ margin: 50 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${student.regNumber}-results.pdf`);
  doc.pipe(res);

  doc.fontSize(18).text('Student Results Portal', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Name: ${student.name}`);
  doc.text(`Reg Number: ${student.regNumber}`);
  doc.text(`Department: ${student.department || '-'}`);
  doc.text(`Level: ${student.level || '-'}`);
  doc.moveDown();

  doc.fontSize(11);
  results.forEach(r => {
    doc.text(
      `${r.session} | ${r.term} | ${r.courseCode} - ${r.courseTitle} | Score: ${r.score} | Grade: ${r.grade}`
    );
  });

  if (results.length === 0) {
    doc.text('No results available yet.');
  }

  doc.end();
});

module.exports = router;
