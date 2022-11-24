import { Snackbar, Alert, Box, Container, Paper, Divider, ButtonGroup, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import "./TaskAdd.css";
import { CustomizedInputBaseDark } from './CustomInput';
import { TaskStatus, TaskStatusTranslated } from './TaskStatus';
import { TaskCategories, TaskCategoriesTranslated } from './TaskCategory';
import { TaskColors } from './TaskColors';
import { db } from './firebase.config';
import { addDoc, collection } from '@firebase/firestore';

export default function TaskAdd(props) {
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");
    const [openSnack, setOpenSnack] = useState(false);
    const [ user, setUser ] = useState({});
    const [ status, setStatus ] = useState(TaskStatus[0]);
    const [ title, setTitle ] = useState("");
    const [ category, setCategory ] = useState(TaskCategories[0]);
    const [ color, setColor ] = useState("red");

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            setUser(props.user)
        }
    }, [setUser, props, user]);

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleAddTask = async () => {
        if (title === "") {
            setSnackMessage("Preencha o título da tarefa");
            setSnackSeverity("error");
            setOpenSnack(true);
            return;
        }

        await addDoc(collection(db, 'tasks'), {
            title: title,
            status: status,
            category: category,
            color: color,
            user: user.id
        })
        setSnackMessage("Tarefa criada com sucesso!");
        setSnackSeverity("success");
        setOpenSnack(true);
        setTitle("");
    };

    return (
        <div className='TaskAdd-center'>
            <Container maxWidth="xl" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <CustomizedInputBaseDark value={title} onChange={(event) => setTitle(event.target.value)}/>
                    <Divider sx={{ my: 2 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                        >
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            {
                                TaskStatus.map((taskStatus, index) => {
                                    return (
                                        <Button 
                                        variant={status === taskStatus ? 'contained': 'outlined' } 
                                        key={index} 
                                        onClick={() => setStatus(taskStatus)}
                                        sx={{ width: 150, height: 40 }}
                                        >{TaskStatusTranslated[index]}
                                        </Button>
                                    )
                                })
                            }
                        </ButtonGroup>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                        >
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                        {
                            TaskCategories.map((taskCategory, index) => {
                                return (
                                    <Button 
                                        variant={category === taskCategory ? 'contained': 'outlined' } 
                                        key={index} 
                                        onClick={() => setCategory(taskCategory)}
                                        sx={{ width: 150, height: 40}}
                                    >{TaskCategoriesTranslated[index]}
                                    </Button>
                                )
                            })
                        }
                        </ButtonGroup>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                        >
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            {
                                TaskColors.map((taskColor, index) => {
                                    return (
                                        <Button 
                                        key={index} 
                                        variant={color === taskColor ? 'contained': 'outlined' } 
                                        onClick={() => setColor(taskColor)}
                                        sx={{ 
                                            backgroundColor: taskColor,
                                            opacity: color === taskColor ? 1 : 0.3,
                                            height: 40, 
                                            width: 150,
                                            '&:hover': {
                                                backgroundColor: taskColor,
                                                boxShadow: 3,
                                            }
                                        }}
                                        ></Button>
                                    )
                                })
                            }
                        </ButtonGroup>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                        <Button variant="contained" onClick={handleAddTask}>Adicionar Tarefa</Button>
                    </Box>
                </Paper>
            </Container>

            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>{snackMessage}</Alert>
            </Snackbar>
        </div>
    )
}