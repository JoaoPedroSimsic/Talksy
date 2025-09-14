// src/components/BottomSheet.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') onClose();
		};
		if (isOpen) {
			document.addEventListener('keydown', handleEsc);
		}
		return (): void => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [isOpen, onClose]);

	const handleDragEnd = (_: unknown, info: PanInfo): void => {
		if (info.offset.y > 100) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-50 flex flex-col justify-end'
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 1 }}
					transition={{ duration: 0.3, ease: 'easeInOut' }}
					onClick={onClose}
				>
					<motion.div
						className='fixed inset-x-0 bottom-0 z-50 bg-[var(--bg-dark)] p-6 rounded-t-[var(--round)] shadow-xl max-h-[90vh] overflow-y-auto'
						onClick={(e) => e.stopPropagation()}
						initial={{ y: '100%' }}
						animate={{ y: '0%' }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.15, type: "tween" }}
						drag='y'
						dragConstraints={{ top: 0 }}
						dragElastic={0.5}
						onDragEnd={handleDragEnd}
					>
						<div className='flex justify-center mb-4'>
							<div className='w-12 h-1.5 rounded-full bg-[var(--text)] cursor-grab' />
						</div>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default BottomSheet;
