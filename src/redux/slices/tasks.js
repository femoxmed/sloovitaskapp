import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentTask: null,
  tasks: [],
  taskFetching: false,
  showTaskComponent: false
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTaskAction: (state, action) => {
        state.currentTask = action.payload;
      },
    setTasksAction: (state, action) => {
        const resortedData = action.payload.sort((a, b) => {
            a = new Date(a.created);
            a = Math.floor(a.getTime() / 1000);
            b = new Date(b.created);
            b = Math.floor(b.getTime() / 1000);
            return b - a;
        });
        state.tasks = resortedData;
      },
    addTaskAction: (state, action) => {
        state.tasks.unshift(action.payload);
    },
    updateTaskAction: (state, action) => {
        const index =  state.tasks.findIndex (task => task.id === action.payload.id );
        state.tasks[index] = action.payload;
    },
    removeTaskAction: (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload.id );
    },
    toggleShowTaskComponentAction: (state) => {
        state.showTaskComponent = !state.showTaskComponent
    }
    }
});

export const { setTasksAction, 
    toggleShowTaskComponentAction, 
    addTaskAction, 
    updateTaskAction,
    removeTaskAction,
    setCurrentTaskAction
} = taskSlice.actions

export default taskSlice.reducer;;

