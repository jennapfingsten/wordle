import React, { useState, useReducer, useContext } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";
import Board from "./components/Board/Board";
import BoardContext from "./store/board-context";
import { guesses } from "./data/guesses";
import { answers } from "./data/answers";

let NUM_ROWS = 6;
let NUM_LETTERS = 5;

const defaultBoard = Array.from({ length: NUM_ROWS }, (v, i) => {
	return Array.from({ length: NUM_LETTERS }, (w, j) => {
		const id = i + "-" + j;
		return { letter: "", id: id, status: "" };
	});
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
			return "placed";
		} else {
			return "present";
		}
	} else {
		return "absent";
	}
};

function App() {
	const [currentGuess, setCurrentGuess] = useState("");
	const [board, setBoard] = useState(defaultBoard);
	const [row, setRow] = useState(0);

	React.useEffect(() => {
		let currentRow = board[row];

		setBoard((curr) => {
			let workingRow = curr[row].slice(); //array for the row we're working on
			let workingBoard = curr.slice();
			for (let i = 0; i < NUM_LETTERS; i++) {
				workingRow[i].letter = currentGuess.charAt(i);
				workingRow[i].status = currentGuess.charAt(i) ? "pending" : "";
			}

			workingBoard[row] = workingRow;

			return workingBoard;
		});
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

	const onEnter = () => {
		if (currentGuess.length === NUM_LETTERS) {
			if (isWordInWordlist(currentGuess)) {
				updateBoardStatuses();
				if (currentGuess === todaysWord) {
					alert("You win!");
				} else {
					//Find the wrong letters
					//Update state
					if (row === NUM_LETTERS) {
						//game over
					} else {
						increaseRow();
						setCurrentGuess("");
					}
				}
			} else {
				alert("Not in word list");
				//TODO: jiggle
			}
		}
	};

	const onDelete = () => {
		if (currentGuess.length > 0 && currentGuess.length < 6) {
			setCurrentGuess((curr) => {
				return curr.slice(0, curr.length - 1);
			});
		}
	};

	const onLetter = (letter) => {
		if (currentGuess.length < NUM_LETTERS) {
			setCurrentGuess((curr) => curr + letter);
		}
	};

	const increaseRow = () => {
		setRow((curr) => curr + 1);
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
					row={row}
				/>
			</main>
		</div>
	);
}

export default App;
