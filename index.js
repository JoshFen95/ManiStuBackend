const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require("path");
const cors = require("cors");
const logger = require("./utils/logger");
const morgan = require('morgan');
const override = require('method-override');
const config = require("./config/config");

dotenv.config();

//Import Routes
const studentRoutes = require("./studentRoutes/studentRoutes");
const authRoutes = require('./auth/authRoutes');
const teacherRoutes = require("./teacherRoutes/teacherRoutes");

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  logger.log("Connected to db")
);

mongoose.set('useFindAndModify', false);


//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(override());

//Route Handling
app.use("/student", studentRoutes);
app.use('/auth', authRoutes);
app.use("/teacher", teacherRoutes);

app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

app.listen(config.port, () => logger.log(`Server is running on port ${config.port}`));