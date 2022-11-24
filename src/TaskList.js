import { Box, Container, Paper, ButtonGroup, Button, Divider, Typography, Chip, Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import "./TaskList.css";
import { TaskStatus, TaskStatusTranslated } from './TaskStatus';
import { db } from './firebase.config';
import { query, collection, where, getDocs } from '@firebase/firestore';
import { TaskCategories, TaskCategoriesTranslated } from './TaskCategory';

export default function TaskList(props) {
    const [ user, setUser ] = useState({});
    const [ tasks, setTasks ] = useState([]);
    const [ category, setCategory ] = useState(TaskCategories[0]);
    const [openBackdrop, setOpenBackdrop] = useState(true);

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            setUser(props.user)
            const q = query(collection(db, 'tasks'), where('user', '==', props.user.id));
            getDocs(q).then((querySnapshot) => {
                let tasks = querySnapshot.docs.map(doc => ({ 
                    ...doc.data(),
                    id: doc.id,  
                }))
                if (props.searchTerm) {
                    tasks = tasks.filter(task => task.title.includes(props.searchTerm));
                }
                setTasks(tasks);
                setOpenBackdrop(false);
            })
        }
    }, [setUser, props, user]);

    const handleDelete = () => {
        window.location.href = "/tasks";
    };

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    return (
        <div className='TaskAdd-center'>
            <Container maxWidth="xl" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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
                                        sx={{ width: 150, height: 40 }}
                                        >{TaskCategoriesTranslated[index]}
                                        </Button>
                                    )
                                })
                            }
                            <Button 
                                variant={category === "ALL" ? 'contained': 'outlined' } 
                                onClick={() => setCategory("ALL")}
                                sx={{ width: 150, height: 40 }}
                                >Todas
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {
                            tasks.filter((task) => category === "ALL" || task.category === category).map((task, index) => {
                                return (
                                    <Container key={index} className="TaskList-container" sx={{ 
                                        width: '100%', 
                                        margin: 1, 
                                        '&:hover': {
                                            backgroundColor: '#e0e0e0',
                                            cursor: 'pointer'
                                        }}}>
                                        <div
                                            onClick={() => window.location.href = "/tasks/" + task.id}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                width: '100%',
                                                height: '100%',
                                                padding: 1,
                                                
                                            }}
                                        >
                                            <span style={{
                                                borderRadius: '50%',
                                                display: 'inline-block',
                                                width: 20,
                                                height: 20,
                                                backgroundColor: task.color
                                            }}/>
                                            <Typography
                                                variant='h5'
                                                sx={{
                                                    padding: 1,
                                                }}
                                            >
                                            {task.title}
                                            </Typography>

                                            {
                                                category === "ALL" &&
                                                <Typography
                                                    variant='h6'
                                                    sx={{
                                                        float: 'right',
                                                        marginLeft: 'auto',
                                                    }}
                                                >
                                                {TaskCategoriesTranslated[TaskCategories.indexOf(task.category)]}
                                                </Typography>
                                            }

                                            <Typography
                                                variant='h6'
                                                style={{
                                                    float: 'right',
                                                    marginLeft: 'auto',
                                                }}
                                            >
                                            {TaskStatusTranslated[TaskStatus.indexOf(task.status)]}
                                            </Typography>
                                        </div>
                                    </Container>
                                )
                            })
                        }
                    </Box>

                    {
                        tasks.length === 0 && 
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} mb>
                            <Typography variant='h5'>Nenhuma tarefa encontrada.</Typography>
                        </Box>
                    }
                    {
                        props.searchTerm && 
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Typography variant="h7" component="div">
                                Busca: 
                                    <Chip sx={{ marginLeft: 1 }} color="primary" onDelete={handleDelete} label={props.searchTerm}/>
                            </Typography>
                        </Box>
                    }
                    
                </Paper>
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
                onClick={handleCloseBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}