import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
}): React.ReactNode => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black/10 z-50'>
			<div className='bg-bright p-6 rounded-2xl shadow-lg w-80'>
				<h2 className='text-lg mb-4'>{title}</h2>
				{description && (
					<p className='text-sm text-black/50 mb-6'>{description}</p>
				)}

				<div className='flex justify-end gap-3'>
					<button
						onClick={onClose}
						className='px-4 py-2 rounded-2xl bg-gray-200'
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='px-4 py-2 rounded-lg bg-red-500 text-white'
					>
						Confirm
					</button>
				</div>

				{/* Close "X" */}
				<button onClick={onClose} className='absolute top-2 right-2 text-gray-500'>
					✕
				</button>
			</div>
		</div>
	);
};

export default Modal;
