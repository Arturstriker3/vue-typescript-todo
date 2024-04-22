<script setup lang="ts">
import type { Todo, TodoStatus } from '@/types/types';
import { reactive, ref } from 'vue';
import useTodos from '@/stores/userTodos';

interface Props {
  status: TodoStatus;
}

const props = defineProps<Props>();

const shoulddisplayForm = ref(false);

const { addNewTodo } = useTodos();

const newTodo = reactive<Omit<Todo, "id">>({
    title: '',
    description: '',
    status: props.status,
});

const resetForm = () => {
    shoulddisplayForm.value = false;
    newTodo.title = '';
    newTodo.description = '';
};

const handleOnSubmit = () => {
    addNewTodo({
        ...newTodo,
        id: Math.random() * 1000000000000000,
    })
    resetForm();
};

</script>

<template>
    <div>
        <h3 v-if="!shoulddisplayForm" @click="shoulddisplayForm = !shoulddisplayForm">Create New</h3>
        <template v-else>
            <form @submit.prevent="handleOnSubmit">
                <div>
                    <input type="text" placeholder="Title" v-model="newTodo.title">
                </div>
                <div>
                    <textarea type="text" placeholder="Title" v-model="newTodo.description"></textarea>
                </div>

                <button type="submit">Submit</button>
                <button type="button" @click="resetForm">Cancel</button>
            </form>
        </template>
    </div>
</template>