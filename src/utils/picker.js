import AppUtils from "./app-utils";


class Picker {
	constructor() {}

	pick() {}
}


export class Classic {
	constructor() {}
	pick(choicesArray, rmFcn) {
		let res = null;
		if (choicesArray.length > 1) {
			let rand = AppUtils.random(choicesArray.length);
			res = choicesArray[rand];
			rmFcn(rand);
		}
		else {
			res = rmFcn(0);
		}
		return res;
	}
}

export class LastPick {

}

export class AveragePick {

}

export class StonksPick {

}