import React, { useState, useContext } from "react";
import Row from "./Row";
import styles from "./Board.module.css";

const Board = ({ boardConfig }) => {
	return (
		<div className={styles.tileContainer}>
			{boardConfig.map((row, i) => {
				return <Row key={i} tiles={row} />;
			})}
		</div>
	);
};

export default Board;
