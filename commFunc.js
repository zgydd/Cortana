'use strict';
//Common function
var _getDefaultMultiples = function(proudctSize) {
	switch (proudctSize) {
		case "16-16":
			if (window.screen.height / window.screen.width === 9 / 16) return 5.63;
			else return 5.45;
		case "32-80":
			if (window.screen.height / window.screen.width === 9 / 16) return 2.35;
			else return 2.15;
		default:
			return 1;
	}
};