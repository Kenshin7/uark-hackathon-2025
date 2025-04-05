export function validate(s) {
	//remove all characters but digits and the first decimal point; also remove leading 0s and following decimal points
	return s.replaceAll(/[^\d\.]/g, "").replaceAll(/^0+(?=\d)/g, "").replaceAll(/\.(?<!^\d*\.\d*)/g, "");
}
