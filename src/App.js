import SignIn from './SignIn';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Signup';
import TaskEdit from './TaskEdit';
import "./estilo.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />        
        <Route path="/tasks" element={<Home />} />
        <Route path="/tasks" >
          <Route path=":id" element={<TaskEdit />} />
        </Route>
        <Route path="/" index element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}