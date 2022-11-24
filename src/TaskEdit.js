import { Snackbar, Alert, Box, Container, Paper, Divider, ButtonGroup, Button, Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import "./TaskAdd.css";
import { CustomizedInputBaseDark } from './CustomInput';
import { TaskStatus, TaskStatusTranslated } from './TaskStatus';
import { TaskCategories, TaskCategoriesTranslated } from './TaskCategory';
import { TaskColors } from './TaskColors';
import { db } from './firebase.config';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from '@firebase/firestore';

export default function TaskEdit(props) {
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");
    const [openSnack, setOpenSnack] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(true);
    const [ status, setStatus ] = useState(TaskStatus[0]);
    const [ title, setTitle ] = useState("");
    const [ category, setCategory ] = useState(TaskCategories[0]);
    const [ color, setColor ] = useState("red");
    const { id } = useParams();

    useEffect(() => {
        if (title === "") {
            const taskRef = doc(db, "tasks", id);
            getDoc(taskRef).then((doc) => {
                if (!doc.exists) {
                    console.log('No such document!');
                    window.location.href = "/tasks";
                } else {
                    doc = doc.data();
                    setTitle(doc.title);
                    setStatus(doc.status);
                    setCategory(doc.category);
                    setColor(doc.color);
                }
                setOpenBackdrop(false);
            });
        }
    }, [title, id, setTitle, setStatus, setCategory, setColor, setOpenBackdrop]);

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    const handleEditTask = async () => {
        setOpenBackdrop(true);
        if (title === "") {
            setSnackMessage("Preencha o título da tarefa");
            setSnackSeverity("error");
            setOpenSnack(true);
            return;
        }

        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
            title: title,
            status: status,
            category: category,
            color: color,
        });
        setOpenBackdrop(false);
        setSnackMessage("Tarefa atualizada com sucesso!");
        setSnackSeverity("success");
        setOpenSnack(true);
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
                        <Button variant="contained" onClick={handleEditTask}>Atualizar Tarefa</Button>
                    </Box>
                </Paper>
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
                onClick={handleCloseBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>{snackMessage}</Alert>
            </Snackbar>
        </div>
    )
}