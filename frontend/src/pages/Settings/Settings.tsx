import React from 'react';
import { useNavigate } from 'react-router-dom';

import OptionCard from './components/OptionCard';

import { HiOutlineMail } from 'react-icons/hi';
import { LuKeyRound } from 'react-icons/lu';
import { MdLogout, MdOutlineNoAccounts } from 'react-icons/md';

const Settings: React.FC = (): React.ReactNode => {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      icon: HiOutlineMail,
      title: 'Change Email',
      description: 'Change your email',
      onClick: () => navigate('/change-email'), // redirect to URL
    },
    {
      icon: LuKeyRound,
      title: 'Change Password',
      description: 'Update your password',
      onClick: () => navigate('/change-password'), // redirect
    },
    {
      icon: MdLogout,
      title: 'Logout',
      description: 'Log out of your current account',
      onClick: () => navigate('/logout'), // could be your logout page or function
    },
    {
      icon: MdOutlineNoAccounts,
      title: 'Delete Account',
      description: 'Delete your current account forever',
      onClick: () => navigate('/delete-account'), // redirect
    },
  ];

  return (
    <div className='flex flex-col items-center h-full w-full'>
      {settingsOptions.map((opt, index) => (
        <OptionCard
          key={index}
          icon={opt.icon}
          title={opt.title}
          description={opt.description}
          onClick={opt.onClick}
        />
      ))}
    </div>
  );
};

export default Settings;
