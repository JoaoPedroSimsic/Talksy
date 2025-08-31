import React, { useState } from 'react';

import OptionCard from './components/OptionCard';
import Modal from '../../components/Modal';
import ChangeEmailModal from './components/ChangeEmailModal';
import LogoutModal from './components/LogoutModal';

import handleChangeEmail from './utils/handleChangeEmail';
import handleLogout from './utils/handleLogout';

const Settings: React.FC = (): React.ReactNode => {
  const [changeEmail, showChangeEmail] = useState(false);
  const [logoutModal, showLogoutModal] = useState(false);

  const settingsOptions = [
    {
      title: 'Change Email',
      description: 'Change your email',
      onClick: (): void => showChangeEmail(true),
    },
    { title: 'Change Password', description: 'Update your password' },
    {
      title: 'Logout',
      description: 'Log out of your current account',
      onClick: (): void => showLogoutModal(true),
    },
  ];

  return (
    <div className='flex flex-col items-center h-full w-full'>
      {settingsOptions.map((opt, index) => (
        <OptionCard
          key={index}
          title={opt.title}
          description={opt.description}
          onClick={opt.onClick}
        />
      ))}

      <Modal isOpen={changeEmail} onClose={(): void => showChangeEmail(false)}>
        <ChangeEmailModal onClose={() => showChangeEmail(false)} onConfirm={handleChangeEmail} />
      </Modal>

      <Modal isOpen={logoutModal} onClose={(): void => showLogoutModal(false)}>
        <LogoutModal onClose={() => showLogoutModal(false)} onConfirm={handleLogout} />
      </Modal>
    </div>
  );
};

export default Settings;
