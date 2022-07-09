const AppUtils = (() => {
	return {
		random(n) {
			return Math.floor(Math.random() * n);
		},
		randomRange(max, min) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
})();
export default AppUtils;