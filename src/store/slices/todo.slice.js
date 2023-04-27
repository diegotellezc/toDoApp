import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    isShowModal: false,
    taskToEdit: null
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        changeShowModal: (state) => {
            state.isShowModal = !state.isShowModal
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        changeDoneTask: (state, action) => {
            const newTasks = state.tasks.map((task) => {
                if(action.payload === task.id) {
                    return {...task, done: !task.done}
                } else {
                    return task
                }
            })
            state.tasks = newTasks
        },
        deleteTask: (state, action) => {
            const newTasks = state.tasks.filter((task) => task.id !== action.payload)
            state.tasks = newTasks
        },
        setTaskToEdit: (state, action) => {
            state.taskToEdit = action.payload
        }
        
        
        
    }

})

export const {changeShowModal, addTask, changeDoneTask, deleteTask, setTaskToEdit  } = todoSlice.actions

export default todoSlice.reducer