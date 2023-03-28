const User = require('../models/user');
const Job = require('../models/job');
const Application = require('../models/application');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, contact, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      role: 'employer',
      name,
      email,
      contact,
      password,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  const { name, contact } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (name) {
      user.name = name;
    }
    if (contact) {
      user.contact = contact;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.postJob = async (req, res) => {
  const { title, description, tags, location, salary, experienceLevel } = req.body;

  try {
    const job = new Job({
      employerId: req.user.id,
      title,
      description,
      tags,
      location,
      salary,
      experienceLevel,
    });

    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.reviewApplications = async (req, res) => {
  const { jobId } = req.params;
  const { applicationId, status } = req.body;

  try {
    const job = await Job.findById(jobId);

    if (!job || job.employerId.toString() !==     req.user.id) {
        return res.status(400).json({ msg: 'Job not found or not authorized' });
      }
  
      const application = await Application.findById(applicationId);
  
      if (!application || application.jobId.toString() !== jobId) {
        return res.status(400).json({ msg: 'Application not found' });
      }
  
      application.status = status;
      await application.save();
  
      res.json(application);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
