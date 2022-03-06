import React, { useState, useEffect } from 'react';

const defaultBoardSetup = [
	[
		{
			id: '1',
			letter: 'w',
		},
		{
			id: '2',
			letter: 'o',
		},
		{
			id: '3',
			letter: 'r',
		},
		{
			id: '4',
			letter: 'd',
		},
		{
			id: '5',
			letter: 's',
		},
	],
	[
		{
			id: '6',
			letter: '',
		},
		{
			id: '7',
			letter: '',
		},
		{
			id: '8',
			letter: '',
		},
		{
			id: '9',
			letter: '',
		},
		{
			id: '10',
			letter: '',
		},
	],
	[
		{
			id: '1',
			letter: '',
		},
		{
			id: '12',
			letter: '',
		},
		{
			id: '13',
			letter: '',
		},
		{
			id: '14',
			letter: '',
		},
		{
			id: '15',
			letter: '',
		},
	],
];

// const BoardContext = React.createContext({
// 	tiles: defaultBoardSetup,
// 	currentRow: 0,
// 	currentColumn: 0,
// 	increaseRow: () => {},
// 	increaseCol: () => {},
// });
const BoardContext = React.createContext();

export const BoardContextProvider = (props) => {
	const [board, setBoard] = useState(defaultBoardSetup);
	const [currentRow, setCurrentRow] = useState(0);
	const [currentCol, setCurrentCol] = useState(0);

	const increaseRowHandler = () => {
		setCurrentRow((curr) => {
			return curr + 1;
		});
	};
	const increaseColHandler = () => {
		setCurrentCol((curr) => {
			return curr + 1;
		});
	};

	const decreaseColHandler = () => {
		setCurrentCol((curr) => {
			return curr - 1;
		});
	};

	const updateBoardHandler = (row, guess) => {
		setBoard((curr) => {
			let workingRow = curr[row].slice(); //array for the row we're working on
			let workingBoard = curr.slice();
			for (let i = 0; i < guess.length; i++) {
				workingRow[i].letter = guess.charAt(i);
			}

			workingBoard[row] = workingRow;

			return workingBoard;
		});
	};

	return (
		<BoardContext.Provider
			value={{
				board: board,
				currentRow: currentRow,
				currentCol: currentCol,
				increaseRow: increaseRowHandler,
				increaseCol: increaseColHandler,
				decreaseCol: decreaseColHandler,
				updateBoard: updateBoardHandler,
			}}
		>
			{props.children}
		</BoardContext.Provider>
	);
};

export default BoardContext;
