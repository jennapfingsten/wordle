import styles from "./Key.module.css";

const Key = ({ letter, onClick }) => {
	let classes = styles.key;
	if (letter === "enter" || letter === "back") {
		classes += " " + styles.col3;
	}

	const onClickHandler = () => {
		onClick(letter);
	};

	return (
		<>
			{letter === "a" && <div></div>}

			<button className={classes} onClick={onClickHandler}>
				{letter}
			</button>
		</>
	);
};

export default Key;
