import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { axiosClientU } from '../../utils/axiosClient';

function LoginForm() {
    const navigate = useNavigate();
    const [ loginDetail , setLoginDetail ] = useState({ email: '', password: ''});
    const [loading, setLoading] = useState(false)

    const handleChange = async (event) => {
        let property = event.target.name;
        const value = event.target.value;
        setLoginDetail({...loginDetail, [property]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const { data } = await axiosClientU.post('/login', loginDetail)
        if(data?.code === 200){
            await localStorage.setItem('login-token',  data.results.token);
            await localStorage.setItem('company_id',  data.results.company_id);
            await localStorage.setItem('user',  JSON.stringify(data.results));
            navigate('/');
        }
        setLoading(false)
    }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
         disabled={loading}
         type="email" 
         placeholder="Enter email"
         name='email'
         onChange={handleChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
            disabled={loading}  
            type="password" 
            placeholder="Password" 
            name='password'
            onChange={handleChange}
            />
      </Form.Group>

      <Button disabled={loading} className='w-100 mt-5' variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default LoginForm;