import { Navigate } from 'react-router-dom';
import { Snackbar, Alert, Box, Tabs, Tab } from '@mui/material';
import { Logout } from '@mui/icons-material';
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
  
function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Home() {
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");
    const [openSnack, setOpenSnack] = useState(false);
    const [ user, setUser ] = useState({});
    const [value, setValue] = useState(0);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const loggedInUser = localStorage.getItem("user");
    

    useEffect(() => {
        if (Object.keys(user).length === 0 && loggedInUser) {
            const newUser = JSON.parse(loggedInUser);
            setUser(newUser);
            /*setSnackMessage(`Bem vindo, ${newUser.name}`);
            setSnackSeverity("success");
            setOpenSnack(true);*/
        }
        if (location.pathname === "/tasks" && value !== 1) {
            setValue(1);
        }
    }, [setUser, loggedInUser, user, setSnackMessage, setSnackSeverity, setOpenSnack, setValue, location, searchParams, value]);

    if (!loggedInUser) {
        return <Navigate to="/signin" />
    }

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const doLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '82vh' }}
                >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Criar Tarefa" {...a11yProps(0)} />
                    <Tab label="Lista de Tarefas" {...a11yProps(1)} />
                    <Tab label={<Logout />} {...a11yProps(2)} onClick={doLogout} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <TaskAdd user={user} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                   <TaskList user={user} searchTerm={searchParams.get("q")} />
                </TabPanel>
            </Box>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>{snackMessage}</Alert>
            </Snackbar>
        </>
    )
}