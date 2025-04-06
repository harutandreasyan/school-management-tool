import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from '@mui/material'

interface LogoutModalProps {
	open: boolean
	onConfirm: () => void
	onCancel: () => void
}

const LogoutModal: React.FC<LogoutModalProps> = ({
	open,
	onConfirm,
	onCancel,
}) => {
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>Confirm Logout</DialogTitle>
			<DialogContent>
				<Typography>Are you sure you want to logout?</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} color='primary'>
					No
				</Button>
				<Button onClick={onConfirm} color='primary' variant='contained'>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default LogoutModal
