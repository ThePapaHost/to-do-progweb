import { Container} from '@mui/material';
import { useEffect, useState } from 'react';
import { db } from './firebase.config';
import { addDoc, collection } from '@firebase/firestore';
import './TaskAdd.css'

const now = new Date();
const todayFormatted = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

export default function TaskAdd(props) {
    const [ user, setUser ] = useState({});
    const [ status, setStatus ] = useState('Realizado');
    const [ title, setTitle ] = useState("");
    const [ category, setCategory ] = useState('Trabalho');
    const [ color, setColor ] = useState("#F34146");
    const [ calendar, setCalendar ] = useState(todayFormatted);

    useEffect(() => {
        console.log(props.user)
        if (Object.keys(user).length === 0) {
            setUser(props.user)
        }
    }, [setUser, props, user]);

    const handleAddTask = async () => {
        if (title === "") {
            alert("Preencha o título da tarefa");
            return;
        }

        await addDoc(collection(db, 'tasks'), {
            title: title,
            status: status,
            category: category,
            color: color,
            calendar: calendar,
            user: user.id
        })
        alert("Tarefa criada com sucesso!");
    };

    return (
        <div className='TaskAdd-center'>
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
                            <input type="submit" onClick={() => handleAddTask()} value="Adicionar Tarefa"/>
                        </div>
                    </div>
            </Container>
        </div>
    )
}