import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { db } from './firebase.config';
import { addDoc, collection } from '@firebase/firestore';

export default function SignUp() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const name = data.get('name');
        
        const docRef = await addDoc(collection(db, 'users'), {
            email: email,
            password: password,
            name: name
        })

        localStorage.setItem('user', JSON.stringify({id: docRef.id, email: email, name: name}));

        alert("Usuário cadastrado com sucesso");

        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    };

    return (
        <main>
            <div id="area-cabecalho">
                <h1>To Do</h1>
                <h3>Organize suas atividades de uma forma muito mais simples!</h3>
            </div>
            <Container component="main" maxWidth="xs">
            <Box id="login-container">
                <h2>Criar Conta</h2>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <label for="email">E-mail</label>
                    <input
                        margin="normal"
                        required
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        type="text"
                        placeholder="Digite seu email"
                    />
                    <label for="passwords">Senha</label>
                    <input
                        margin="normal"
                        required
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder="Digite a sua senha"
                    />
                    <input type="submit" value="registrar" />
                    <div id="register-container">
                        <p>Tem uma conta?</p>
                        <a href="/signin">Entrar</a>
                    </div>
                </Box>
            </Box>
            </Container>
    </main>
    )
}