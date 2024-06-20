<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import TaskForm from './TaskForm.vue';
  import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskservice';

  interface ITask {
    _id:string;
    task_id: number;
    title: string;
    description: string;
    createdAt: string;
    dueDate: string;
    labels: string[];
  }

  const dialogDelete = ref(false);
  const deletedTask = ref<ITask | null>(null);

  const tasks = ref<ITask[]>([]);
  const headers = [
    { title: 'Task №', value: 'task_id' },
    { title: 'Title', value: 'title' },
    { title: 'Description', value: 'description' },
    { title: 'Created At', value: 'createdAt' },
    { title: 'Completed At', value: 'completedAt' },
    { title: 'Labels', value: 'labels' },
    { title: 'Actions', value: 'actions',},
  ];
  
  const dialog = ref(false);
  const editedTask = ref<ITask | null>(null);
  

  
  const closeDialog = () => {
    dialog.value = false;
    editedTask.value = null;
  };
  
  const saveTask = async (task: ITask) => {
    if (task._id) {
      await updateTask(task._id, task);
    } else {
      task.task_id = tasks.value.length + 1
      await createTask(task);
    }
    tasks.value = await fetchTasks();
    closeDialog();
  };
  
  const editTask = (task: ITask) => {
    editedTask.value = { ...task };
    dialog.value = true;
  };
  
  const removeTask = (task: ITask) => {
    deletedTask.value = task;
    dialogDelete.value = true;
  };

  const closeDelete = () => {
    dialogDelete.value = false
  }

  const deleteItemConfirm = async() => {
    if (deletedTask.value) {
        await deleteTask(deletedTask.value._id);
        tasks.value = await fetchTasks();
    }
    closeDelete()
  }



  onMounted(async () => {
    tasks.value = await fetchTasks();
  });

  </script>
  

  <template>
    <v-data-table :headers="headers" :items="tasks" hide-default-footer>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>TASKS EDITOR</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
                <v-btn class="mb-2" variant="elevated" color="primary" v-bind="props">
                  New Item
                </v-btn>
              </template>
            <task-form :task="editedTask" @save="saveTask" @close="closeDialog"></task-form>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  variant="text" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  variant="text"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
        <tr>
            <td>{{ item.task_id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>{{ new Date(item.createdAt).toLocaleString() }}</td>
            <td>{{ item.dueDate ? new Date(item.dueDate).toLocaleString() : ''}}</td>
            <td style="max-width: 150px;">{{ item.labels.join(', ') }}</td>
            <td>
              <v-icon
                small
                class="mr-2"
                @click="editTask(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="removeTask(item)"
              >
                mdi-delete
              </v-icon>
            </td>
          
        </tr>
      </template>
      
    
    </v-data-table>
  </template>