
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/users';
import tasksReducer from './slices/tasks'; 
import mainReducer from './slices/main'; 

  const store = configureStore({
    reducer: {
      main: mainReducer,
      users: usersReducer,
      tasks: tasksReducer
    }
  });

  export default store;
