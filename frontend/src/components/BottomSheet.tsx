import React, { useEffect, useState, useRef } from 'react';

interface BottomSheetProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
	const [visible, setVisible] = useState(false);
	const [animate, setAnimate] = useState(false);
	const closeTimer = useRef<number | null>(null);

	useEffect(() => {
		if (isOpen) {
			if (closeTimer.current) {
				clearTimeout(closeTimer.current);
				closeTimer.current = null;
			}

			setVisible(true);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setAnimate(true));
			});
		} else {
			setAnimate(false);
			closeTimer.current = setTimeout(() => {
				setVisible(false);
				closeTimer.current = null;
			}, 300);
		}
	}, [isOpen]);

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') onClose();
		};
		if (isOpen) document.addEventListener('keydown', handleEsc);
		return (): void => document.removeEventListener('keydown', handleEsc);
	}, [isOpen, onClose]);

	if (!visible) return null;

	return (
		<div className='fixed inset-0 z-50 flex flex-col justify-end' onClick={onClose}>
			<div
				className={`absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${animate ? 'opacity-30' : 'opacity-0'
					}`}
			/>

			<div
				className={`transform transition-transform duration-300 ease-in-out
          fixed inset-x-0 bottom-0 z-50
          bg-[var(--bg)]
          p-6 rounded-t-[var(--round)] shadow-xl
          max-h-[90vh] overflow-y-auto
          ${animate ? 'translate-y-0' : 'translate-y-full'}
        `}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default BottomSheet;
