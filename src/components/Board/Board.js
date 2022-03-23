import React, { useRef, useEffect } from 'react';
import styles from './Board.module.css';

const Board = ({ boardConfig }) => {
	const keyboardHeight = 200;
	const bannerHeight = 50;
	/*
	Status:
	- "" = nothing
	- pending = has a letter
	- placed = green
	- present = yellow
	- absent = grey
	*/
	const boardEl = useRef(null);

	const onResize = () => {
		boardEl.current.style.width =
			((window.innerHeight - keyboardHeight - bannerHeight) * 5) / 6 + 'px';
	};

	useEffect(() => {
		if (boardEl && boardEl.current) {
			onResize();
			window.addEventListener('resize', onResize);
		}

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return (
		<div className={styles.board}>
			<div className={styles.tileContainer} ref={boardEl}>
				{boardConfig.map((row, i) => {
					return (
						<React.Fragment key={i}>
							{row.map((tile) => {
								const divStyle = { backgroundColor: tile.status };
								return (
									<div
										key={tile.id}
										className={`${styles.tile} ${tile.status}`}
										style={divStyle}
										data-status={tile.status}
									>
										{tile.letter}
									</div>
								);
							})}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};

export default Board;
