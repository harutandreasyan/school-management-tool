import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from '@mui/material'

interface DeleteModalProps {
	open: boolean
	title: string
	message: string
	onConfirm: () => void
	onCancel: () => void
	confirmText?: string
	cancelText?: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({
	open,
	title,
	message,
	onConfirm,
	onCancel,
	confirmText = 'Yes',
	cancelText = 'No',
}) => {
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Typography>{message}</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} color='primary'>
					{cancelText}
				</Button>
				<Button onClick={onConfirm} color='error' variant='contained'>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DeleteModal
