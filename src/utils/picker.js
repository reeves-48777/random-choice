import AppUtils from "./app-utils";


class Picker {
	constructor(nPicks) {}
	pick() {}
}

export class Classic {
	constructor(nPicks) {}
	pick(choicesArray, callback) {
		let res = null;
		if (choicesArray.length > 1) {
			let rand = AppUtils.random(choicesArray.length);
			res = choicesArray[rand];
			callback(rand);
		}
		else {
			res = callback(0);
		}
		return res;
	}
}

export class LastPick {
	constructor(nPicks) {this.nPicks = nPicks;}
	pick(choicesArray, callback) {
		let res = null;
		for (let i = 0; i < this.nPicks; i++) {
			res = choicesArray[AppUtils.random(choicesArray.length)];
			console.log(res);
		}
		callback();
		return res;
	}
}

export class AveragePick {
	constructor(nPicks) {this.nPicks = nPicks}
	pick(choicesArray, callback) {
		let indexCount = Array(choicesArray.length).fill(0);
		let averageIndex = null;
		
		// on compte le nombre de fois que l'index x apparait
		for (let i = 0; i < this.nPicks; i++) {
			const randIndex = AppUtils.random(choicesArray.length);
			indexCount[randIndex] += 1;
		}

		// on fait la moyenne de tous les index apparu pour choisir la réponse
		for(let i = 0; i < indexCount.length; i++) {
			averageIndex += indexCount[i];
		}
		averageIndex = Math.floor(averageIndex/indexCount.length);

		callback()
		return choicesArray[averageIndex];
	}
}


export class MostPick {
	constructor(nPicks) { this.nPicks = nPicks; }
	pick(choicesArray, callback) {
		let res = null;
		let indexCount = Array(choicesArray.length).fill(0);

		for (let i = 0; i < this.nPicks; i++) {
			indexCount[AppUtils.random(choicesArray.length)] += 1;
		}
		for (let i = 0; i < indexCount.length; i++) {
			if (indexCount[i] === Math.max(...indexCount)) {
				res = choicesArray[i];
			}
		}
		callback();
		return res;
	}
}


// TODO: implement
export class StonksPick {}


export const Types = {
	CLASSIC: "CLASSIC",
	LAST: "LAST",
	AVG: "AVERAGE",
	MOST: "MOST"
};
export const TypesArray = [ Types.CLASSIC, Types.LAST, Types.AVG, Types.MOST];
export function build(pickerType, nPicks) {
	switch (pickerType) {
		case Types.CLASSIC:
			return new Classic(1);
		case Types.LAST:
			return new LastPick(nPicks);
		case Types.AVG:
			return new AveragePick(nPicks);
		case Types.MOST:
			return new MostPick(nPicks);
	}
}