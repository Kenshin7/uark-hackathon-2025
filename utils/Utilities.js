export function clamp(min, max, val) {
	return Math.max(min, Math.min(val, max));
};

export function findWeightOfDay(sequence, unix) {
	for(let i = 0; i < sequence.length; i++) {
		if(sequence[i][1] <= unix + 1000 * 60 * 60 * 24) {
			return sequence[i][0];
		}
	}
	return sequence[0][0];
};

export function round(x, digits) {
	return Math.round(x * Math.pow(10, digits)) / Math.pow(10, digits);
};

export function validate(s) {
	//remove all characters but digits and the first decimal point; also remove leading 0s and following decimal points
	return s.replaceAll(/[^\d\.]/g, "").replaceAll(/^0+(?=\d)/g, "").replaceAll(/\.(?<!^\d*\.\d*)/g, "");
};

