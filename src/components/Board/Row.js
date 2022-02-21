import React from "react";
import Tile from "./Tile/Tile";

const Row = ({ tiles }) => {
	return (
		<React.Fragment>
			{tiles.map((tile) => {
				return <Tile key={tile.id} letter={tile.letter} status={tile.status} />;
			})}
		</React.Fragment>
	);
};

export default Row;
