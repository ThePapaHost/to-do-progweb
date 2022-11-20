/* eslint-disable jsx-a11y/anchor-is-valid */
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { db } from './firebase.config';
import { query, collection, where, getDocs } from '@firebase/firestore';

export default function SignIn() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        let failed = true;
        
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          if (doc.data().password === password) {
            localStorage.setItem('user', JSON.stringify({id: doc.id, email: doc.data().email, name: doc.data().name}));
            failed = false;
            window.location.href = '/';
          } 
        });

        if (failed || querySnapshot.empty) {
            alert('Usuário ou senha inválidos');
        }
    };

    return (
        <main>
            <div id="area-cabecalho">
                <h1>To Do</h1>
                <h3>Organize suas atividades de uma forma muito mais simples!</h3>
            </div>
            <Container component="main" maxWidth="xs">
            <Box id="login-container">
                <h2>Login</h2>
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
                    <a href="#" id="forgot-pass">Esqueceu a senha?</a>
                    
                    <input type="submit" value="login" />
                    <div id="register-container">
                        <p>Ainda nao tem uma conta?</p>
                        <a href="/signup">Registrar</a>
                    </div>
                </Box>
            </Box>
            </Container>
    </main>
    )
}