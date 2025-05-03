import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';



export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  }
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  }

  const modelStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: '#282828',
    border: "none",
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    color: "#ffffff" ,
    whiteSpace: 'pre-line',
    height: 650,
    overflow:"auto",
  }

  const buttonStyle = {
    display:'inline',
    colr:'red',
  }

  return (
    <div className={props.className}>
      <button onClick={handleOpen} className={`${props.className}-btn`}>{props.title}</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modelStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {props.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} display="block">
                {props.content}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}