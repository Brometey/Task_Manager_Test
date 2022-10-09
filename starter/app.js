const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleWare = require('./middleware/error-handler');
//middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandlerMiddleWare);

// api.get('/api/v1/tasks')        - get all the tasks
// api.post('/api/v1/tasks')       - create a new task
// api.get('/api/v1/tasks/:id')    - get single task
// api.patch('/api/v1/tasks/:id')  - update task
// api.delete('/api/v1/tasks/:id') - delete task

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (err) => {
      if (err) throw err;
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
