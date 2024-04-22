import { TodoStatus, type Todo } from "@/types/types"
import { computed, reactive } from "vue";

interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    [TodoStatus.inProgress]: Todo[];
    [TodoStatus.Completed]: Todo[];
}

const defaultVal = {
    [TodoStatus.Pending]: [
        {
            id: 1,
            title: 'Learn Vue 3',
            description: 'Learn Vue 3 and its composition API',
            status: TodoStatus.Pending
        },
    ],
    [TodoStatus.inProgress]: [],
    [TodoStatus.Completed]: []
}

const todoStore = reactive<TodoStore>(defaultVal)

export default () => {
    const getTodosByStatus = function(todoStatus: TodoStatus) {
        return computed(() => todoStore[todoStatus])
    };

    const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
        todo.status = newStatus;
    }

    const addNewTodo = (todo: Todo) => {
        todoStore[todo.status].push(todo)
    }

    const deleteTodo = (todoToDelete: Todo) => {
            todoStore[todoToDelete.status] = todoStore[todoToDelete.status].filter(
                (todo) => todo.id !== todoToDelete.id
        );
    }

    return {
        getTodosByStatus, addNewTodo, deleteTodo, updateTodo
    }
}
