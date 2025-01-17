import React, { useCallback } from "react";

import Menu from "../Menu";

interface Props {
	menuId: string;
	isOpen: boolean;
	top: number;
	left: number;
	width: number;
	inputText: string;
	onInputChange: (value: string) => void;
}

export default function NumberCellEdit({
	menuId,
	isOpen,
	top,
	left,
	width,
	inputText,
	onInputChange,
}: Props) {
	const inputRef = useCallback(
		(node) => {
			if (node) {
				if (isOpen) {
					setTimeout(() => {
						node.focus();
					}, 1);
				}
			}
		},
		[isOpen]
	);
	return (
		<Menu id={menuId} isOpen={isOpen} top={top} left={left} width={width}>
			<input
				ref={inputRef}
				className="NLT__input NLT__input--number NLT__input--no-border"
				type="number"
				autoFocus
				value={inputText}
				onChange={(e) => onInputChange(e.target.value)}
			/>
		</Menu>
	);
}
