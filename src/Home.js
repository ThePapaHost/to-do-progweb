/* eslint-disable jsx-a11y/anchor-is-valid */
import { Navigate } from 'react-router-dom';
import { Box} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom'
import "./Home.css";
import TaskAdd from './TaskAdd';
import TaskList from './TaskList';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

export default function Home() {
    const [ user, setUser ] = useState({});
    const [value, setValue] = useState(0);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const loggedInUser = localStorage.getItem("user");
    

    useEffect(() => {
        if (Object.keys(user).length === 0 && loggedInUser) {
            const newUser = JSON.parse(loggedInUser);
            setUser(newUser);
        }
        if (location.pathname === "/tasks" && value !== 1) {
            setValue(1);
        }
    }, [setUser, loggedInUser, user, setValue, location, searchParams, value]);

    if (!loggedInUser) {
        return <Navigate to="/signin" />
    }

    // eslint-disable-next-line no-unused-vars
    const doLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <>
            <div id="inicio-cabecalho">
                <input type="text" name="tarefa" 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        window.location.href = "/tasks?q=" + e.target.value;
                    }
                }}
                id="tarefa-input" placeholder="Pesquise uma tarefa" autoComplete="off" />
                <div id="inicio-perfil">
                    <div>perfil</div>
                </div>
            </div>
            <hr style={{marginTop: '6px', border: '3px inset'}} />
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '82vh', backgroundColor: '#F8FAB7' }}
                >
                <div id="area-esquerda">
                    <a href="#" style={{ textDecoration: 'none'  }}>
                        <input type="submit" style={{ border: value === 0? '1px solid black' : 'none' }} onClick={() => window.location.href = '/'} value="+ criar tarefa" />
                    </a>
                    <a href="#" style={{ textDecoration: 'none'}}>
                        <input type="submit" style={{ border: value === 1? '1px solid black' : 'none' }} onClick={() => setValue(1)} value="lista de tarefas" />
                    </a>
                    <a href="#" style={{ textDecoration: 'none'}}>
                        <input type="submit" value="calendário" />
                    </a>
                </div>
                <TabPanel value={value} index={0}>
                    <TaskAdd user={user} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                   <TaskList user={user} searchTerm={searchParams.get("q")} />
                </TabPanel>
            </Box>
        </>
    )
}