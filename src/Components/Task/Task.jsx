import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTaskAction, setTasksAction, toggleShowTaskComponentAction } from '../../redux/slices/tasks';
import { setUsersAction } from '../../redux/slices/users';
import axiosClient from '../../utils/axiosClient';
import TaskForm from '../TaskForm';
import TaskItem from '../TaskItem';
import './task.css'

const Task = ({ token, company_id}) => {
    const dispatch  = useDispatch();
    const showTaskComponent = useSelector(state => state.tasks.showTaskComponent);
    const currentTask = useSelector(state => state.tasks.currentTask);
    const tasks = useSelector(state => state.tasks.tasks);
    const fetchUsers = async () => {
      try {
        let users =  axiosClient.get(`/team?product=outreach&company_id=${company_id}`, {
          headers: {'Authorization' : `Bearer ${token}`}
      });

      let tasks = axiosClient.get(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`, {
        headers: {'Authorization' : `Bearer ${token}`}
    });

    const result = await Promise.all([users, tasks]);
    
    users = await result[0].data.results.data;
    tasks = await result[1].data.results;
    tasks = tasks.map((task) => {
      let user = users.find((user) => user.id === task.assigned_user)
      return {
       ...task,
       user_avatar: user.icon
      }})
      dispatch(setUsersAction(users))
      dispatch(setTasksAction(tasks))
      } catch (error) {
        console.log('errorin APp.js' , error)
      }
     
      }

      const toggleShowTaskComponent = async () => {
        dispatch(toggleShowTaskComponentAction())
      }
      const setCurrentTask = (payload) => dispatch(setCurrentTaskAction(payload));
    
    
      useEffect(() => {
        fetchUsers()
  
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [company_id, token])

    return (
        <div className="task-container">
            <div className='task-header'>
                <div className='task-count'>
                    Task{tasks.length  > 1 ?'s':'' }: {tasks.length}
                </div>
                <div className='task-header-action'> 
                 {
                    !showTaskComponent && <i  onClick={() => toggleShowTaskComponent()} className="bi-plus plus-style" ></i>
                 }
                 </div>
            </div>
            { ((showTaskComponent && currentTask) || showTaskComponent) &&  
            <TaskForm  
            setCurrentTask={setCurrentTask}
            currentTask={currentTask}
            toggleShowTaskComponent={toggleShowTaskComponent} /> }
            <div className='taskitem-box'>
            { (!showTaskComponent) && tasks.map((task => (
                <TaskItem currentTask={currentTask} key={task.id} task={task}/>
            )))}
            </div>
           
           

        </div>
    )

}
export default Task;