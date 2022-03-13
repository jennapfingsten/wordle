import React from 'react';
import Key from './Key/Key';
import styles from './Keyboard.module.css';
import { keys } from '../../data/keyboard';

const Keyboard = ({ onEnter, onDelete, onLetter, keyboardConfig }) => {
	const callKeyboardFunctions = (key) => {
		key = key.toLowerCase();
		if (key === 'tab') {
			return;
		} else if (key === 'enter') {
			onEnter();
		} else if (key === 'backspace' || key === 'back') {
			onDelete();
		} else if (keys.includes(key)) {
			onLetter(key);
		}
	};

	React.useEffect(() => {
		const listener = (e) => {
			callKeyboardFunctions(e.key);
		};
		document.addEventListener('keydown', listener);

		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [callKeyboardFunctions]);

	return (
		<div className={styles.keyboard}>
			{keyboardConfig.map((letter, i) => {
				return (
					<Key
						key={i}
						letter={letter.letter}
						onClick={callKeyboardFunctions}
						status={letter.status}
					/>
				);
			})}
		</div>
	);
};

export default Keyboard;
