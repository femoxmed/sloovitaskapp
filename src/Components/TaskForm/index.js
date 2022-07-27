import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { addTaskAction, removeTaskAction, toggleShowTaskComponentAction, updateTaskAction } from '../../redux/slices/tasks';
import axiosClient from '../../utils/axiosClient';
import ConfirmModal from '../ConfirmModal';
import './task-form.css';

const TaskForm = ({ toggleShowTaskComponent, currentTask, setCurrentTask }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users || []);
  const [ formLoading, setFormLoading ] = useState(false);
  const [ taskDetail , setTaskDetail ] = useState({ 
    assigned_user:  currentTask ? currentTask?.assigned_user : '',
    task_date: currentTask ? currentTask?.assigned_user : '',
    task_time: currentTask ? currentTask?.assigned_user : '',
    is_completed: 0,
    time_zone: Date.now() / 1000,
    task_msg: currentTask ? currentTask?.task_msg : '',
  });

  useEffect(() => {
    if (currentTask) {
      const time = new Date(currentTask?.task_time * 1000).toISOString().substring(11, 16)
      setTaskDetail({ 
        assigned_user:  currentTask ? currentTask?.assigned_user : '',
        task_date: currentTask ? currentTask?.task_date : '',
        task_time: currentTask ? time : Date.now(),
        is_completed: 0,
        time_zone: Date.now() / 1000,
        task_msg: currentTask ? currentTask?.task_msg : '',
      })
    }
  },[currentTask])

  const handleChange = async (event) => {
      let property = event.target.name;
      const value = event.target.value;
      setTaskDetail({...taskDetail, [property]: value});
      console.log(taskDetail)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormLoading(true)
    const company_id = localStorage.getItem('company_id')
    const token = localStorage.getItem('login-token')
    const { data } = await axiosClient.post(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
    { ...taskDetail , 
         time_zone: parseInt(Date.now() /1000), 
         task_time: parseInt(taskDetail.task_time.split(':').reduce((acc,time) => (60 * acc) + +time)) },
    { headers: {'Authorization' : `Bearer ${token}`}});
    if(data.code === 201) {
    dispatch(addTaskAction(data.results));
    setFormLoading(false)
    dispatch(setCurrentTask(null))
    dispatch(toggleShowTaskComponentAction())
    }
}

    const handleUpdate = async (event) => {
      event.preventDefault()
      setFormLoading(true)
      const company_id = localStorage.getItem('company_id')
      const token = localStorage.getItem('login-token')
      const { data } = await axiosClient.put(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${currentTask.id}?company_id=${company_id}`,
      {    assigned_user: taskDetail.assigned_user,
            is_completed: currentTask.is_completed,
            task_msg: taskDetail.task_msg,
            task_date: taskDetail.task_date,
          time_zone: parseInt(Date.now() /1000), 
          task_time: parseInt(taskDetail.task_time.split(':').reduce((acc,time) => (60 * acc) + +time)) },
      { headers: {'Authorization' : `Bearer ${token}`}});
      if(data.code === 202) {
        dispatch(updateTaskAction(data.results));
        setFormLoading(false)
      }
    }

    const handleDelete = async () => {
      setFormLoading(true)
      const company_id = localStorage.getItem('company_id')
      const token = localStorage.getItem('login-token')
      const { data } = await axiosClient.delete(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${currentTask.id}?company_id=${company_id}`,
      { headers: {'Authorization' : `Bearer ${token}`}});
      if(data.code === 204) {
        await dispatch(removeTaskAction(currentTask));
        setFormLoading(false)
        dispatch(setCurrentTask(null))
        dispatch(toggleShowTaskComponentAction())
      }
    }
    return (
      
        <Form aria-disabled={formLoading} onSubmit={!currentTask ? handleSubmit: handleUpdate} className='task-form-container'>
        <Form.Group className="mb-3" controlId="formBasicTaskDescription">
          <Form.Label className='w-100 text-left'>Task Description </Form.Label>
          <Form.Control 
           disabled={formLoading}
           name='task_msg'
           onChange={handleChange}
           value={taskDetail.task_msg}
           className='task-input' 
           type="text" 
           placeholder="Enter task description" />
        </Form.Group>

        <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="formBasicTaskDescription">
          {/* <Form.Label className='w-100 text-left'>Task Description</Form.Label> */}
          <Form.Control
           disabled={formLoading}
           name='task_date'
           onChange={handleChange}
           value={taskDetail.task_date}
          className='task-input' type="date" placeholder="Enter Date" />
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group  as={Col} md="6" controlId="formBasicTaskDescription">
          <Form.Control
            disabled={formLoading}
            name='task_time'
            step="2"
            onChange={handleChange}
            value={taskDetail.task_time}
            className='task-input' type="time" placeholder="Enter email2" />
        </Form.Group>
        </Row>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className='w-100 text-left'>Assign User</Form.Label>
          <Form.Select 
            disabled={formLoading}
            name='assigned_user'
            onChange={handleChange}
            value={taskDetail.assigned_user}
            aria-label="Default select example">
          <option value=''>Select User</option>
            {
              users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))
            }
         </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 d-flex justify-content-between w-100" controlId="formBasicPassword">
        <span className='my-auto cursor-pointer'>
        {<ConfirmModal 
        modalTitle={'Delete Task'}
        modalText={'Are you sure you want to delete this task?'}
        actionText='Delete Now'
        actionMethod={() => handleDelete()}
        RenderComponent={
        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
        </svg>}/>}
      
        </span>
       
        <span>
    
            <Button 
              disabled={formLoading}
              onClick={()=> {
              toggleShowTaskComponent()
              setCurrentTask(null)
            }
              
              } variant="primary" className='mr-5' type="submit">
            Cancel
            </Button>
            <span className='mx-2'></span>
            <Button disabled={formLoading} variant="primary" className='pl-5 ml-5' type="submit">
             { !currentTask ? formLoading ? 'Submitting' : 'Subbit' : formLoading ? 'Updating'  : 'Update' }
            </Button>
          </span>
        </Form.Group>
        
        
      </Form>
    )
}

export default TaskForm;