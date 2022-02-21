import { useState } from "react";
import styles from "./Tile.module.css";

const Tile = (props) => {
	const [tile, setTile] = useState({ letter: props.letter, color: "grey" });

	const tileClickHandler = () => {
		setTile({ letter: "A", color: "blue" });
	};

	return (
		<button className={styles.tile} onClick={tileClickHandler}>
			{tile.letter}
		</button>
	);
};

export default Tile;
