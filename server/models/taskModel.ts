import { Schema, model, Document } from 'mongoose';

interface Task extends Document {
  task_id: number;
  title: string;
  description: string;
  createdAt: Date;
  dueDate?: Date;
  labels?: string[];
}

const TaskSchema = new Schema<Task>({
  task_id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
  labels: { type: [String] },
});

export default model<Task>('Task', TaskSchema);
