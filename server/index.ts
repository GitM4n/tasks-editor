import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router  from './api/tasks';

const app = express();
const port = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://chatbot996788:Login@cluster0.zqizxr3.mongodb.net/TASKS_DB?retryWrites=true&w=majority');


app.use('/api/tasks', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
