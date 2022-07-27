import './index.css';
import Image from 'react-bootstrap/Image';
import { setCurrentTaskAction, toggleShowTaskComponentAction } from '../../redux/slices/tasks';
import { useDispatch } from 'react-redux';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch()
    const { task_msg, task_date , user_avatar } = task;
    const setCurrentTask = async () => {
       await  dispatch(toggleShowTaskComponentAction())
        dispatch(setCurrentTaskAction(task))
    }
    return (
    <div className="taskitem-container d-flex w-100 justify-content-between">
        <div className='d-flex flex-row'>
            <Image 
                className='rounded mr-10'
                height={50}
                width={50}
                src={user_avatar ? 
                    user_avatar :
                    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAGQAZAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAABgMFAQIEB//EADUQAAICAQEDCAgGAwAAAAAAAAABAgMEEQYhUQUSMUFxgZHBEyIjMlKh0eEUM0JDYvFhcrH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAgMEAQX/xAAhEQEAAgIBBAMBAAAAAAAAAAAAAQIDERITMUFRBCEyIv/aAAwDAQACEQMRAD8ArgAem80AAA5hGU3pCLk+EVqbjkPkhZa/EZKfoU/Viv1fYpqqq6YKFUIwiuqK0KL54rOoX0wzaNyhJY98FrOm2K4uDRjPoR4OUOSsfNi24qFvVZFb+/iRr8j3CU4PUowGTIosxr502rScHozGae7OAAOAAAAAAcpOUlGPS3ojgyUS5t9cn0Kab8RLq7x6o0UwqgvVhFRRkAPMeiAACa2roUbaL0t8k4y7ujzNCUu1kvYY8etzb+X3Jo3YJ/iGLN+wAFqoAAAAAA960AAvMG78Rh03fHBN9vWZyc2YzlFSw7Glq+dX5rz8SjPPvXjbTfS3KuwAw5WRXi0TutekYrXtIJ9k5tRcp5ldS/bhv7X/AEjSmXJulkX2XWe9OWr/AMGI9GleNYhgvPK2wAEkAAAAAANni8h5uQk5QVUX12Pf4Hr2YwozlPLsinzHza9ePWylM+XNNZ1DRjxRMblN5Wz06qIzxLZTujvafq69nA4x+X8jGfoc6hylHr92XeilOltNVy0trhNcJRTKepv6vG1vT191nTSWbTUqPs8exv8Ak0l5niUM/l22Mp+zx09z00iuziyjhg4kHrHFpT4qtHoHUrX8wcLT+pTeXs3NetiXar4bPqjT5WJfiSUciqUNeh9T7y8MOXjV5WPOm1axkvB8SVc9o7o2wRPZBA73VyptnVP3oScX3HQ2MoAA4AB9DAtORKvRcl4665R53jvPedKIejphWv0xSO55szudvRrGo0AA46AAAAAI/aKr0fKk2lusipeXkaw321kNL8efxRkvBr6mhN+Kd0hhyRq8gALFYOjewA6vMXLoyoc+iyM11pPeu1Gc+exbjJSi2pLoa3NHto5Xz6d0ciUlwn63/TLb48+JaY+RHmFqCXq2kyI/m0Vz/wBW4/U9MNpqtPXxprskmVzhv6WRlpPlvwaN7S4+m7Hufbp9TBZtM/28TvlZ9jnRv6OrT2ozhtJask7doM6e6DrrX8Y6v5mvvysjJ/PunYuEnu8CcfHt5QnPXw2u02VRfOiumyM3Dnc5xeqWum75GkANVK8Y0zWtynYACSIAAAAAAAOgADgAAAAAAAD/2Q=='
                }/>
            <span>
            <div className="taskitem-description">{task_msg}</div>
            
            <div className="taskitem-date">{task_date.replace(/-/g,'/')}</div>
            </span>
           
        </div>
        
        <div className="taskitem-action-container my-auto">
        <button onClick={()=> {
            setCurrentTask()
        } 
        }
            type="button" className="btn btn-outline-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"></path>
            </svg>
        </button>
        </div>
     </div>
    )
    
}

export default TaskItem;