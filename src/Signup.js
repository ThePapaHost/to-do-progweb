import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { db } from './firebase.config';
import { addDoc, collection } from '@firebase/firestore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import Copyright from './Copyright';

const theme = createTheme();
export default function SignUp() {
    const [openSnack, setOpenSnack] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [snackSeverity, setSnackSeverity] = useState("success");

    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
    };

    const handleCloseSnack = () => {
        setOpenSnack(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setOpenBackdrop(true)
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

        setSnackMessage("Usuário cadastrado com sucesso");
        setSnackSeverity("success");
        setOpenBackdrop(false);
        setOpenSnack(true);

        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    };

    return (
        <main>
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="name"
                    label="Nome"
                    type="text"
                    id="name"
                    autoComplete="name"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Cadastrar
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="/signin" variant="body2">
                        {"Tem uma conta? Clique aqui"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
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
        </ThemeProvider>
    </main>
    )
}