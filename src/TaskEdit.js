import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import "./TaskAdd.css";
import { db } from './firebase.config';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import "./estilo.css"

const now = new Date();
const todayFormatted = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

export default function TaskEdit(props) {
    const [ status, setStatus ] = useState('Realizada');
    const [ title, setTitle ] = useState("");
    const [ category, setCategory ] = useState('Trabalho');
    const [ color, setColor ] = useState("#F34146");
    const [ calendar, setCalendar ] = useState(todayFormatted);	
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
                    setCalendar(doc.calendar);
                }
            });
        }
    }, [title, id, setTitle, setStatus, setCategory, setColor]);

    const handleEditTask = async () => {
        if (title === "") {
            alert("Preencha o título da tarefa");
            return;
        }

        const taskRef = doc(db, "tasks", id);
        await updateDoc(taskRef, {
            title: title,
            status: status,
            category: category,
            color: color,
            calendar: calendar
        });
        alert("Tarefa atualizada com sucesso!");
        setTimeout(() => {
            window.location.href = "/tasks";
        }, 500);
    };

    return (
        <main>
            <div id="area-cabecalho">
                <h1>Editar Tarefa</h1>
            </div>
        <div className='TaskAdd-center' style={{ marginTop: '5%' }}>
            <Container maxWidth="xl" sx={{ mb: 4 }}>
                <div id="principal-container">
                    <input type="text" name="tarefa" value={title} onChange={(event) => setTitle(event.target.value)} id="tarefa" placeholder="Titulo da tarefa" autoComplete="off" />
                    <hr style={{border: "inset"}} />
                    <div style={{margin: 'auto', marginLeft: '10px', marginTop: '30px', fontWeight: 'bold'}}>STATUS</div>
                    <div id="secundario-container" style={{marginLeft: '85px', marginTop: '-18px'}}>
                        <input type="submit" style={{
                            backgroundColor: status === 'Realizado' && '#65AD21',
                        }}
                        onClick={() => setStatus('Realizado')} value="Realizado" />
                        
                        <input type="submit" style={{
                            backgroundColor: status === 'Pendente' && '#65AD21',
                        }}
                        onClick={() => setStatus('Pendente')} value="Pendente" />
                        
                        <input type="submit" style={{
                            backgroundColor: status === 'Cancelado' && '#65AD21',
                        }}
                        onClick={() => setStatus('Cancelado')} value="Cancelado" />
                    </div>

                    <hr style={{border: "inset"}} />

                    <div style={{margin: 'auto', marginLeft: '10px', marginTop: '30px', fontWeight: 'bold'}}>CATEGORIA</div>
                    <div id="secundario-container" style={{marginLeft: '85px', marginTop: '-18px'}}>
                        <input type="submit" style={{
                            backgroundColor: category === 'Trabalho' && '#65AD21',
                        }} 
                        onClick={() => setCategory('Trabalho')} value="Trabalho"/>
                        
                        <input type="submit" style={{
                            backgroundColor: category === 'Lazer' && '#65AD21',
                        }} 
                        onClick={() => setCategory('Lazer')}
                        value="Lazer"/>

                        <input type="submit" style={{
                            backgroundColor: category === 'Estudo' && '#65AD21',
                        }} 
                        onClick={() => setCategory('Estudo')}
                        value="Estudo"/>
                    </div>

                    <hr style={{border: "inset"}} />

                    <div style={{margin: 'auto', marginLeft: '10px', marginTop: '30px', fontWeight: 'bold'}}>TAG</div>
                    <div id="secundario-container" style={{marginLeft: '85px', marginTop: '-18px'}}>
                        <input type="submit" onClick={() => setColor('#F34146')} style={{backgroundColor: '#F34146', opacity: color === '#F34146' ? 1 : 0.5}} value="Urgente"/>
                        <input type="submit" onClick={() => setColor('#ECF137')} style={{backgroundColor: '#ECF137', opacity: color === '#ECF137' ? 1 : 0.5}} value="Importante"/>
                        <input type="submit" onClick={() => setColor('#69F42D')} style={{backgroundColor: '#69F42D', opacity: color === '#69F42D' ? 1 : 0.5}} value="Circunstancial"/>
                    </div>

                    <hr style={{border: "inset"}} />
                    <div style={{margin: 'auto', marginLeft: '10px', marginTop: '30px', fontWeight: 'bold'}}>DATA DE CONCLUSÃO:</div>
                    <input type="date" onChange={(event) => setCalendar(event.target.value)} value={calendar} name="data_conclusao" id="data_conclusao" required />
                    <div id="ad-tarefa">
                        <input type="submit" onClick={() => handleEditTask()} value="Editar Tarefa"/>
                    </div>
                </div>
                {
                    /*<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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
                        </Paper>*/}
            </Container>
        </div>
        </main>
    )
}