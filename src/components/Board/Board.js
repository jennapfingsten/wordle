import React, { useState, useContext } from "react";
import styles from "./Board.module.css";

const Board = ({ boardConfig }) => {
	/*
	Status:
	- "" = nothing
	- pending = has a letter
	- placed = green
	- present = yellow
	- absent = grey
	*/

	return (
		<div className={styles.tileContainer}>
			{boardConfig.map((row, i) => {
				return (
					<React.Fragment key={i}>
						{row.map((tile) => {
							const divStyle = { backgroundColor: tile.status };
							return (
								<button
									key={tile.id}
									className={`${styles.tile} ${tile.status}`}
									style={divStyle}
									data-status={tile.status}
								>
									{tile.letter}
								</button>
							);
						})}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default Board;
