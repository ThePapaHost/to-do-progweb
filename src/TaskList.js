import { Box, Container, Typography, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import "./TaskList.css";
import { db } from './firebase.config';
import { query, collection, where, getDocs } from '@firebase/firestore';

export default function TaskList(props) {
    const [ user, setUser ] = useState({});
    const [ tasks, setTasks ] = useState([]);
    const [ category, setCategory ] = useState('Trabalho');

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
            })
        }
    }, [setUser, props, user]);

    const handleDelete = () => {
        window.location.href = "/tasks";
    };

    const parseDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate() + 1}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
    };

    return (
        <div className='TaskAdd-center'>
            <Container maxWidth="xl" sx={{ mb: 4 }}>
                <div id="principal-container">
                    <div id="secundario-container" style={{
                        marginTop: '30px',
                    }}>
                        <input type="submit" style={{
                            backgroundColor: category === 'Trabalho' && '#65AD21',
                            marginTop: 0,
                        }} 
                        onClick={() => setCategory('Trabalho')} value="Trabalho"/>
                        
                        <input type="submit" style={{
                            backgroundColor: category === 'Lazer' && '#65AD21',
                            marginTop: 0,
                        }} 
                        onClick={() => setCategory('Lazer')}
                        value="Lazer"/>

                        <input type="submit" style={{
                            backgroundColor: category === 'Estudo' && '#65AD21',
                            marginTop: 0,
                        }} 
                        onClick={() => setCategory('Estudo')}
                        value="Estudo"/>
                    </div>
                    <hr style={{border: "inset"}} />

                    {
                        tasks.filter((task) => task.category === category).map((task, index) => {
                            return (
                                <div id="tasksLister"
                                    key={index}
                                    onClick={() => window.location.href = "/tasks/" + task.id}>
                                    <span style={{
                                        borderRadius: '50%',
                                        border: '1px solid black',
                                        display: 'inline-block',
                                        width: 20,
                                        height: 20,
                                        backgroundColor: task.color
                                    }}/>
                                    <p>
                                    {task.title}
                                    </p>
                                    <p>|</p>
                                    <p>
                                    {parseDate(task.calendar)}
                                    </p>
                                    <p>-</p>
                                    <p>
                                    {task.status.toLowerCase()}
                                    </p>
                                </div>
                            )
                        })
                    }
                
                    {
                        tasks.filter((task) => task.category === category).length === 0 && 
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} mb>
                            <Typography variant='h7'>Nenhuma tarefa encontrada</Typography>
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
                </div>
            </Container>
        </div>
    )
}