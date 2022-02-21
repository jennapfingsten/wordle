import React from "react";
import Key from "./Key/Key";
import styles from "./Keyboard.module.css";

const allKeys = [
	"q",
	"w",
	"e",
	"r",
	"t",
	"y",
	"u",
	"i",
	"o",
	"p",
	"a",
	"s",
	"d",
	"f",
	"g",
	"h",
	"j",
	"k",
	"l",
	"enter",
	"z",
	"x",
	"c",
	"v",
	"b",
	"n",
	"m",
	"back",
];

const Keyboard = ({ onEnter, onDelete, onLetter }) => {
	const callKeyboardFunctions = (key) => {
		key = key.toLowerCase();
		if (key === "enter") {
			onEnter();
		} else if (key === "backspace" || key === "back") {
			onDelete();
		} else {
			onLetter(key);
		}
	};

	React.useEffect(() => {
		const listener = (e) => {
			callKeyboardFunctions(e.key);
		};
		document.addEventListener("keydown", listener);

		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [callKeyboardFunctions]);

	return (
		<div className={styles.keyboard}>
			{allKeys.map((letter, i) => {
				return <Key key={i} letter={letter} onClick={callKeyboardFunctions} />;
			})}
		</div>
	);
};

export default Keyboard;
