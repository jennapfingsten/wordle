import React, { useState, useReducer, useContext } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Keyboard from './components/Keyboard/Keyboard';
import Board from './components/Board/Board';
import BoardContext from './store/board-context';
import { guesses } from './data/guesses';
import { answers } from './data/answers';
import { keys } from './data/keyboard';
import * as CONSTANTS from './data/constants.js';

const { NUM_LETTERS, NUM_ROWS } = CONSTANTS;

const defaultBoard = Array.from({ length: NUM_ROWS }, (v, i) => {
	return Array.from({ length: NUM_LETTERS }, (w, j) => {
		const id = i + '-' + j;
		return { letter: '', id: id, status: '' };
	});
});

const keyboardConfig = Array.from(keys, (v, i) => {
	return {
		letter: v,
		status: '',
	};
});

const randomNumber = Math.floor(Math.random(answers.length) * answers.length);
const todaysWord = answers[randomNumber];
console.log(todaysWord);

const fullList = guesses.concat(answers);

const isWordInWordlist = (word) => {
	return fullList.includes(word);
};

const getTileStatus = (letter, index) => {
	if (todaysWord.includes(letter)) {
		if (todaysWord.charAt(index) === letter) {
			return CONSTANTS.PLACED;
		} else {
			return CONSTANTS.PRESENT;
		}
	} else {
		return CONSTANTS.ABSENT;
	}
};

function App() {
	const [currentGuess, setCurrentGuess] = useState('');
	const [board, setBoard] = useState(defaultBoard);
	const [keyboard, setKeyboard] = useState(keyboardConfig);
	const [row, setRow] = useState(0);
	const [gameOver, setGameOver] = useState(0); //0/1 F/T

	React.useEffect(() => {
		let currentRow = board[row];

		if (row < NUM_ROWS) {
			setBoard((curr) => {
				let workingRow = curr[row].slice();
				let workingBoard = curr.slice();
				for (let i = 0; i < NUM_LETTERS; i++) {
					workingRow[i].letter = currentGuess.charAt(i);
					workingRow[i].status = currentGuess.charAt(i)
						? CONSTANTS.PENDING
						: '';
				}

				workingBoard[row] = workingRow;

				return workingBoard;
			});
		}
	}, [currentGuess]);

	const updateBoardStatuses = () => {
		setBoard((curr) => {
			let workingRow = curr[row].slice();
			let workingBoard = curr.slice();
			for (let i = 0; i < NUM_LETTERS; i++) {
				workingRow[i].status = getTileStatus(currentGuess.charAt(i), i);
			}
			workingBoard[row] = workingRow;
			return workingBoard;
		});
	};

	const updateKeyboardStatuses = () => {
		setKeyboard((curr) => {
			let workingKeyboard = curr.slice();
			for (let i = 0; i < NUM_LETTERS; i++) {
				const letter = currentGuess.charAt(i);
				const status = getTileStatus(letter, i);
				workingKeyboard.find((key) => key.letter === letter).status = status;
			}
			return workingKeyboard;
		});
	};

	const onEnter = () => {
		if (gameOver) return;
		if (currentGuess.length !== NUM_LETTERS) return;
		if (isWordInWordlist(currentGuess)) {
			updateBoardStatuses();
			updateKeyboardStatuses();
			if (currentGuess === todaysWord) {
				endGame(true);
			} else {
				if (row === NUM_ROWS - 1) {
					endGame(false);
				} else {
					increaseRow();
					setCurrentGuess('');
				}
			}
		} else {
			alert('Not in word list');
			//TODO: jiggle
		}
	};

	const onDelete = () => {
		if (gameOver) return;
		if (currentGuess.length > 0 && currentGuess.length < 6) {
			setCurrentGuess((curr) => {
				return curr.slice(0, curr.length - 1);
			});
		}
	};

	const onLetter = (letter) => {
		if (gameOver) return;
		if (currentGuess.length < NUM_LETTERS) {
			setCurrentGuess((curr) => curr + letter);
		}
	};

	const increaseRow = () => {
		setRow((curr) => curr + 1);
	};

	const endGame = (didWin) => {
		const message = didWin ? 'You win!' : 'Game over! Word was ' + todaysWord;
		setGameOver(1);

		setTimeout(() => {
			alert(message);
		}, 300);
	};

	return (
		<div className={styles.container}>
			<header>
				<Header />
			</header>
			<main>
				<Board boardConfig={board} key={board} />

				<Keyboard
					onEnter={onEnter}
					onDelete={onDelete}
					onLetter={onLetter}
					keyboardConfig={keyboardConfig}
				/>
			</main>
		</div>
	);
}

export default App;
