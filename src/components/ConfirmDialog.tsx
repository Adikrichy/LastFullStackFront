import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  content,
  loading,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onCancel}
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'rgba(10, 14, 39, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 82, 82, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, rgba(255, 82, 82, 0.2) 0%, rgba(255, 23, 68, 0.2) 100%)',
          borderBottom: '1px solid rgba(255, 82, 82, 0.3)',
          color: '#FF5252',
          fontWeight: 800,
          fontSize: '1.5rem',
          pb: 2,
          letterSpacing: '0.5px',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ mt: 2, bgcolor: 'rgba(10, 14, 39, 0.5)' }}>
        <DialogContentText sx={{ fontSize: '1.1rem', color: '#B2EBF2', lineHeight: 1.6 }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2, bgcolor: 'rgba(10, 14, 39, 0.5)', borderTop: '1px solid rgba(255, 82, 82, 0.2)' }}>
        <Button 
          onClick={onCancel} 
          disabled={loading}
          sx={{
            color: '#80DEEA',
            '&:hover': {
              backgroundColor: 'rgba(0, 188, 212, 0.1)',
              color: '#00BCD4',
            },
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            borderRadius: 2,
            transition: 'all 0.3s ease',
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          disabled={loading} 
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #FF5252 0%, #FF1744 100%)',
            boxShadow: '0 4px 20px rgba(255, 82, 82, 0.4)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #FF1744 0%, #FF5252 100%)',
              boxShadow: '0 8px 30px rgba(255, 82, 82, 0.6)',
              transform: 'translateY(-2px) scale(1.02)',
            },
            '&:disabled': {
              background: 'rgba(255, 82, 82, 0.3)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
            px: 4,
            py: 1,
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: 2,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

