import './App.css';
import Task from './Components/Task/Task';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setMainAction } from './redux/slices/main';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function App() {
  const company_id = localStorage.getItem('company_id')
  const token = localStorage.getItem('login-token');
  let user = localStorage.getItem('user');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payload = { company_id , token, user: JSON.parse(user) };
  const dispatchMain = () => {
    if(user === null){
      navigate('/login');
    }
    dispatch(setMainAction(payload))
  }
  const userAuth = useSelector(state => state.main?.user);

  useEffect(() => {
    dispatchMain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const logOut = () => {
    localStorage.setItem('company_id', null)
    localStorage.setItem('login-token', null);
    localStorage.setItem('user', null);
    dispatch(setMainAction({ company_id: null , token: null, user: null}));
    navigate('/login');

  }

  return (
    <div className="App">
      <header className="App-header"> 
      
      <Navbar className='w-100' bg="transparent" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">Task Application</Navbar.Brand>
        <Navbar.Toggle  aria-controls="navbar-dark-example" />
        <Navbar.Collapse className='justify-content-end' id="navbar-dark-example">
          <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={`Welcome User`}
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={()=> logOut()} href="#">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      </header>
      <div className='d-flex justify-content-container flex-direction-row'>
      <div className='App-sidebar'></div>
      {
      userAuth &&  <Task company_id={company_id} token={token} /> 
      }
      </div>
    </div>
  );
}

export default App;
