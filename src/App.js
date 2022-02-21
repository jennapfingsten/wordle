import React, { useState, useReducer } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Keyboard from "./components/Keyboard/Keyboard";
import Board from "./components/Board/Board";

//https://github.com/cwackerfuss/react-wordle
/*
Some notes from one git:
- onenter, ondelete, onchar methods in app, sent down w/ props
- keyboard listener in keyboard. In useEffect, is bound/unbound (cleanup) each time char is added
- in app, when a char is added, it checks if it's less than max and setCurrentGuess (state) w/ old state concat with new letter
- same with delete. Keep appending current guess
- on enter, get that value from state and do the things

*/

// const defaultBoard = [
// 	["", "", "", "", ""],
// 	["", "", "", "", ""],
// 	["", "", "", "", ""],
// 	["", "", "", "", ""],
// 	["", "", "", "", ""],
// 	["", "", "", "", ""],
// ];

const defaultBoard = [
	[
		{
			id: "1",
			letter: "W",
			status: "grey",
		},
		{
			id: "2",
			letter: "O",
			status: "yellow",
		},
		{
			id: "3",
			letter: "R",
			status: "green",
		},
		{
			id: "4",
			letter: "D",
		},
		{
			id: "5",
			letter: "S",
		},
	],
	[
		{
			id: "6",
			letter: "",
		},
		{
			id: "7",
			letter: "",
		},
		{
			id: "8",
			letter: "",
		},
		{
			id: "9",
			letter: "",
		},
		{
			id: "10",
			letter: "",
		},
	],
	[
		{
			id: "11",
			letter: "",
		},
		{
			id: "tile2",
			letter: "",
		},
		{
			id: "tile3",
			letter: "",
		},
		{
			id: "tile4",
			letter: "",
		},
		{
			id: "tile5",
			letter: "",
		},
	],
];

function App() {
	const [currentGuess, setCurrentGuess] = useState("");
	const [board, setBoard] = useState(defaultBoard);

	const initialPosition = {
		row: 0,
		col: 0,
	};

	const positionReducer = (state, action) => {
		switch (action.type) {
			case "increaseRow":
				return {
					...state,
					row: state.row + 1,
				};
			case "increaseCol":
				console.log(state.col);
				return {
					...state,
					col: state.col + 1,
				};
			case "decreaseCol":
				return {
					...state,
					col: state.col - 1,
				};
			default:
				return;
		}
	};

	const [position, updatePosition] = useReducer(
		positionReducer,
		initialPosition
	);

	const onEnter = () => {
		if (position.col < 5) updatePosition({ type: "increaseCol" });
	};

	const onDelete = () => {
		if (position.col > 0 && position.col < 6)
			updatePosition({ type: "decreaseCol" });
	};

	const onLetter = (letter) => {
		console.log("Pressed " + letter);
		//append to current guess
	};

	return (
		<div className={styles.container}>
			Column: {position.col} <br />
			Row: {position.row}
			<header>
				<Header />
			</header>
			<main>
				<Board boardConfig={board} />
				<Keyboard onEnter={onEnter} onDelete={onDelete} onLetter={onLetter} />
			</main>
		</div>
	);
}

export default App;
