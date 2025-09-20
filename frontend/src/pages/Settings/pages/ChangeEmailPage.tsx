import React from "react";

interface Props {
	onClose: () => void;
	onConfirm: (newEmail: string) => Promise<void>;
}

const ChangeEmailPage: React.FC<Props> = ({ onClose, onConfirm }) => {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<h1 className="text-2xl font-bold mb-4">Change Email</h1>
			{/* your form goes here */}
			<button onClick={onClose} className="mt-4">Back</button>
		</div>
	);
};

export default ChangeEmailPage;
