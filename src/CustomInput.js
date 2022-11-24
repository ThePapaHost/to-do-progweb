import { Paper, IconButton, InputBase } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import "./CustomInput.css"

function CustomizedInputBase() {
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="add">
          <PostAddIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Título da tarefa"
          inputProps={{ 'aria-label': 'título da tarefa' }}
        />
      </Paper>
    );
}

function CustomizedInputBaseDark(props) {
  return (
    <Paper
      component="form"
      className='CustomInput-dark'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto', boxShadow: 'none' }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="add">
        <PostAddIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Título da tarefa"
        inputProps={{ 'aria-label': 'título da tarefa' }}
        onChange={props.onChange}
        value={props.value}
      />
    </Paper>
  );
}

export { CustomizedInputBase, CustomizedInputBaseDark };