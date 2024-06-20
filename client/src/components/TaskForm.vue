<script setup lang="ts">
  import { ref, watch, defineProps } from 'vue';
  
  const props = defineProps<{
    task: any;
  }>();

  const emit = defineEmits<{
    (e: 'save', task: any): void,
    (e: 'close'): void
  }>();
  
  const localTask = ref<any>({ title: '', description: '', dueDate: '', labels: [] });
  const newLabel = ref('');
  
  watch(() => props.task, (newTask) => {
    if (newTask) {
      localTask.value = { ...newTask };
    }
  }, { immediate: true });
  
  const save = () => {
    if (!localTask.value.title || !localTask.value.description) return;
    emit('save', localTask.value);
  };
  
  const addLabel = () => {
    if (newLabel.value) {
      if (!localTask.value.labels) {
        localTask.value.labels = [];
      }
      localTask.value.labels.push(newLabel.value);
      newLabel.value = '';
    }
  };


  const close = () => {
    emit('close');
  };
</script>


<template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ task?.id ? 'Edit Task' : 'New Task' }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="localTask.title" label="Title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="localTask.description" label="Description"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="localTask.dueDate" label="Due Date" type="date"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-chip-group v-model="localTask.labels" column>
                <v-chip v-for="label in localTask.labels || []" :key="label">{{ label }}</v-chip>
                <v-text-field v-model="newLabel" label="Add Label" @keyup.enter="addLabel"></v-text-field>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1"  @click="close">Cancel</v-btn>
        <v-btn color="blue-darken-1"  @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  