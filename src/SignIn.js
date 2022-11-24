import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { db } from './firebase.config';
import { query, collection, where, getDocs } from '@firebase/firestore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import Copyright from './Copyright';

const theme = createTheme();

export default function SignIn() {
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
            setSnackMessage("Usuário e/ou senha incorretos");
            setSnackSeverity("error");
            setOpenSnack(true);
        }

        setOpenBackdrop(false);
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Entrar
                </Button>
                <Grid container>
                    <Grid item>
                    <Link href="/signup" variant="body2">
                        {"Não tem uma conta? Clique aqui"}
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