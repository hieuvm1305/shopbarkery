import React from 'react'
import { Modal, Box } from '@mui/material'
function ProductModal({open, hide, productItem}) {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };
  const closeModal = () => {
    hide();
  }
  return (
    <div><Modal open={open} onClose={hide}>
      <Box sx={style}>

      </Box>
      </Modal></div>
  )
}

export default ProductModal