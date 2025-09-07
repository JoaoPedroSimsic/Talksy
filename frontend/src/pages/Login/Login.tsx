import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './components/LoginForm';
import Logo from '../../components/Logo';

const messagesList = [
  'Olá, tudo bem?',
  'Hello, how are you?',
  "Wie geht's dir?",
  'Comment ça va?',
  'Ciao, come stai?',
  'こんにちは、お元気ですか？',
  '안녕하세요, 잘 지내세요?',
  'Привет, как дела?',
  '¡Hola! ¿Cómo estás?',
];

type ChatMessage = {
  id: number;
  text: string;
};

const Login: React.FC = (): React.ReactNode => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let index = 0;
    let idCounter = 0;

    const addMessage = (): void => {
      setMessages((prev) => {
        const newMessage = {
          id: idCounter++,
          text: messagesList[index % messagesList.length],
        };

        const updated = [...prev, newMessage];
        return updated.slice(-6);
      });
      index++;

      const randomDelay = Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;

      timeoutRef.current = window.setTimeout(addMessage, randomDelay);
    };

    addMessage();

    return (): void => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className='flex w-full items-center justify-between h-screen'>
      <div className='bg-[var(--primary)] lg:bg-[var(--bg-dark)] relative w-full lg:w-1/2 h-screen flex items-center justify-center overflow-hidden'>
        <div className='hidden z-1 lg:flex absolute top-10 left-10 h-10 w-40'>
          <Logo />
          <span className='flex items-center justify-center ml-1 text-[var(--text)] text-xl font-bold'>
            Talksy
          </span>
        </div>
        <img
          src='/assets/background.svg'
          className='lg:hidden absolute scale-150'
          alt='background'
        />
        <LoginForm />
      </div>
      <div className='relative h-full w-1/2 bg-[var(--bg)] py-5 px-8 flex flex-col justify-end overflow-hidden shadow-lg'>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className='mb-2 px-3 py-2 bg-[var(--primary)] text-[var(--bg)] rounded-lg self-start'
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
