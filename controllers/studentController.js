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
      role: 'student',
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
  
  exports.applyJob = async (req, res) => {
    const { jobId, resume, coverMessage } = req.body;
  
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ msg: 'Job not found' });
      }
  
      const application = new Application({
        jobId,
        studentId: req.user.id,
        resume,
        coverMessage,
        status: 'pending',
      });
  
      await application.save();
  
      res.json(application);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  exports.searchJobs = async (req, res) => {
    const { title, location, salary, experienceLevel, keywords } = req.query;
  
    try {
      let query = Job.find();
  
      if (title) {
        query.where('title').regex(new RegExp(title, 'i'));
      }
      if (location) {
        query.where('location').regex(new RegExp(location, 'i'));
      }
      if (salary) {
        query.where('salary').gte(salary);
      }
      if (experienceLevel) {
        query.where('experienceLevel').lte(experienceLevel);
      }
      if (keywords) {
        query.where('tags').all(keywords.split(','));
      }
  
      const jobs = await query.exec();
  
      res.json(jobs);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
