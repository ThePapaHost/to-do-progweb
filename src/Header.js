import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import './Header.css';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './SearchInput';

export default function Header() {
    return (
        <div className="App">
            <header className="App-header" onClick={() => window.location.href = '/'}>
                <h1>Todo List</h1>
                <Avatar sx={{ m: 1, bgcolor: 'yellow', color: 'black' }}>
                    <EditIcon />
                </Avatar>
            </header>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Buscar tarefas"
                inputProps={{ 'aria-label': 'search' }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        window.location.href = "/tasks?q=" + e.target.value;
                    }
                }}
                />
            </Search>
        </div>
    )
}