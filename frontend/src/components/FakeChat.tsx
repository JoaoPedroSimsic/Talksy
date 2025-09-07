import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ChatMessage = {
	id: number;
	text: string;
	sender?: 'me' | 'other';
	type: 'message' | 'system';
};

const messagesList = [
	{ text: 'Olá, tudo bem?', language: 'portuguese' },
	{ text: 'Hello, how are you?', language: 'english' },
	{ text: "Wie geht's dir?", language: 'german' },
	{ text: 'Comment ça va?', language: 'french' },
	{ text: 'Ciao, come stai?', language: 'italian' },
	{ text: 'こんにちは、お元気ですか？', language: 'japanese' },
	{ text: '안녕하세요, 잘 지내세요?', language: 'korean' },
	{ text: 'Привет, как дела?', language: 'russian' },
	{ text: '¡Hola! ¿Cómo estás?', language: 'spanish' },
	{ text: 'Salam, haluka?', language: 'arabic' },
	{ text: 'नमस्ते, कैसे हो?', language: 'hindi' },
	{ text: 'Hallóhvernig hefur þú það?', language: 'icelandic' },
	{ text: 'Merhaba, nasılsın?', language: 'turkish' },
	{ text: 'Szia, hogy vagy?', language: 'hungarian' },
	{ text: 'Bună, ce faci?', language: 'romanian' },
	{ text: 'Selamat pagi, apa kabar?', language: 'indonesian' },
	{ text: 'สวัสดี, สบายดีไหม?', language: 'thai' },
	{ text: 'Chào bạn, bạn khỏe không?', language: 'vietnamese' },
	{ text: 'Shalom, ma shlomcha?', language: 'hebrew' },
	{ text: 'Kumusta, kamusta ka?', language: 'filipino' },
	{ text: 'Jambo, habari gani?', language: 'swahili' },
	{ text: 'Sawubona, unjani?', language: 'zulu' },
	{ text: 'Hallo, hoe gaat het?', language: 'dutch' },
	{ text: 'Γεια σου, τι κάνεις;', language: 'greek' },
	{ text: 'Dobrý den, jak se máš?', language: 'czech' },
	{ text: 'Ahoj, ako sa máš?', language: 'slovak' },
	{ text: 'Sveiki, kā jums klājas?', language: 'latvian' },
	{ text: 'Labas, kaip sekasi?', language: 'lithuanian' },
	{ text: 'Tere, kuidas läheb?', language: 'estonian' },
];

const namesByLanguage: Record<string, string[]> = {
	portuguese: ['João', 'Maria', 'Pedro', 'Ana'],
	english: ['Alice', 'Bob', 'Charlie', 'Diana'],
	german: ['Lukas', 'Sophie', 'Max', 'Emma'],
	french: ['Pierre', 'Claire', 'Julien', 'Sophie'],
	italian: ['Luca', 'Giulia', 'Marco', 'Francesca'],
	japanese: ['Haruto', 'Yui', 'Sota', 'Hana'],
	korean: ['Minho', 'Jiwoo', 'Seojun', 'Soojin'],
	russian: ['Ivan', 'Anna', 'Dmitry', 'Olga'],
	spanish: ['Carlos', 'Lucia', 'Diego', 'Sofia'],
	arabic: ['Ahmed', 'Fatima', 'Omar', 'Layla'],
	hindi: ['Arjun', 'Priya', 'Rohan', 'Ananya'],
	icelandic: ['Jón', 'Anna', 'Björn', 'Sigríður'],
	turkish: ['Emir', 'Elif', 'Can', 'Zeynep'],
	hungarian: ['Bence', 'Eszter', 'Gábor', 'Lilla'],
	romanian: ['Andrei', 'Ioana', 'Mihai', 'Ana'],
	indonesian: ['Budi', 'Sari', 'Agus', 'Dewi'],
	thai: ['Somchai', 'Malee', 'Niran', 'Suda'],
	vietnamese: ['Minh', 'Lan', 'Tuan', 'Thao'],
	hebrew: ['David', 'Maya', 'Noam', 'Yael'],
	filipino: ['Juan', 'Maria', 'Jose', 'Ana'],
	swahili: ['Juma', 'Amina', 'Kofi', 'Zuri'],
	zulu: ['Sibusiso', 'Thandi', 'Mandla', 'Nomsa'],
	dutch: ['Jan', 'Emma', 'Hendrik', 'Sanne'],
	greek: ['Nikos', 'Maria', 'Giorgos', 'Elena'],
	czech: ['Jan', 'Eva', 'Petr', 'Lucie'],
	slovak: ['Marek', 'Zuzana', 'Peter', 'Katarina'],
	latvian: ['Jānis', 'Anna', 'Mārtiņš', 'Elīna'],
	lithuanian: ['Jonas', 'Agnė', 'Tomas', 'Eglė'],
	estonian: ['Jaan', 'Liis', 'Kalev', 'Mari'],
};

const FakeChat: React.FC<{ maxMessages?: number; minDelay?: number; maxDelay?: number }> = ({
	maxMessages = 20,
	minDelay = 3000,
	maxDelay = 6000,
}) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		let idCounter = 0;

		const addMessage = (): void => {
			setMessages((prev) => {
				let newMessage: ChatMessage;

				if (Math.random() < 0.2) {
					const randomLangMessage = messagesList[Math.floor(Math.random() * messagesList.length)];
					const lang = randomLangMessage.language;
					const names = namesByLanguage[lang];
					const name = names[Math.floor(Math.random() * names.length)];

					newMessage = {
						id: idCounter++,
						text: `${name} entered the group`,
						type: 'system',
					};
				} else {
					let randomText: string;
					do {
						randomText = messagesList[Math.floor(Math.random() * messagesList.length)].text;
					} while (prev.length > 0 && randomText === prev[prev.length - 1].text);

					newMessage = {
						id: idCounter++,
						text: randomText,
						sender: Math.random() > 0.5 ? ('me' as const) : ('other' as const),
						type: 'message',
					};
				}

				const updated = [...prev, newMessage];
				return updated.slice(-maxMessages);
			});

			const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
			timeoutRef.current = window.setTimeout(addMessage, randomDelay);
		};

		addMessage();

		return (): void => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [maxMessages, minDelay, maxDelay]);

	return (
		<div className='flex flex-col justify-end h-full overflow-hidden py-5 px-8 bg-[var(--bg)] shadow-lg'>
			<AnimatePresence initial={false}>
				{messages.map((msg) =>
					msg.type === 'system' ? (
						<motion.div
							key={msg.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
							className='mb-2 text-center text-[var(--primary)] text-sm italic'
						>
							{msg.text}
						</motion.div>
					) : (
						<motion.div
							key={msg.id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
						className={`mb-2 px-5 py-3 rounded-lg max-w-xs break-words ${msg.sender === 'me'
									? 'bg-[var(--primary)] text-[var(--bg)] self-end'
									: 'bg-[var(--bg-dark)] text-[var(--text)] self-start'
								}`}
						>
							{msg.text}
						</motion.div>
					),
				)}
			</AnimatePresence>
		</div>
	);
};

export default FakeChat;
