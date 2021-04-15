var dg = [
	"noll",
	"ett",
	"två",
	"tre",
	"fyra",
	"fem",
	"sex",
	"sju",
	"åtta",
	"nio",
];
var tn = [
	"tio",
	"elva",
	"tolv",
	"tretton",
	"fjorton",
	"femton",
	"sexton",
	"sjutton",
	"arton",
	"nitton",
];
var tw = [
	"",
	"",
	"tjugo",
	"trettio",
	"förtio",
	"femtio",
	"sextio",
	"sjuttio",
	"åttio",
	"nittio",
];
var th = ["", "tusen", "miljon", "miljard"];
var bojning = ["ett", "en", "en", "en", "en", "en", "en"];

function numberToSwedishText(value) {
	var numberlength = value.toString().length;
	if (numberlength > 12) {
		return "För stort tal";
	}
	var numberstring = value.toString();
	var i = numberstring.length - 1;
	var finalOutput = [];
	while (numberstring.length > 3) {
		var tempTrippleDigit = numberstring.substring(
			numberstring.length,
			numberstring.length - 3
		);
		finalOutput.push(tempTrippleDigit);
		numberstring = numberstring.substring(0, numberstring.length - 3);
	}
	finalOutput.push(numberstring);
	var textOutputs = [];
	for (let j = 0; j < finalOutput.length; j++) {
		if (finalOutput[j].length === 3) {
			var tempString = "";
			if (parseInt(finalOutput[j]) !== 0 && parseInt(finalOutput[j][0]) !== 0) {
				tempString = dg[parseInt(finalOutput[j][0])] + "hundra";
			}

			if (parseInt(finalOutput[j].substring(1, finalOutput[j].length)) < 20) {
				if (parseInt(finalOutput[j].substring(1, finalOutput[j].length)) < 10) {
					if (
						parseInt(finalOutput[j].substring(1, finalOutput[j].length)) !== 0
					) {
						tempString = tempString + dg[parseInt(finalOutput[j][2])];
					}
				} else {
					tempString =
						tempString +
						tn[
							parseInt(finalOutput[j].substring(1, finalOutput[j].length)) - 10
						];
				}
			} else {
				tempString = tempString + tw[parseInt(finalOutput[j][1])];
				if (parseInt(finalOutput[j][2]) !== 0) {
					tempString = tempString + dg[parseInt(finalOutput[j][2])];
				}
			}
			textOutputs.push(tempString);
		} else if (finalOutput[j].length === 2) {
			if (parseInt(finalOutput[j]) < 20) {
				if (parseInt(finalOutput[j]) < 10) {
					if (parseInt(finalOutput[j]) !== 0) {
						textOutputs.push(dg[parseInt(finalOutput[j])]);
					} else {
						textOutputs.push("");
					}
				} else {
					textOutputs.push(tn[parseInt(finalOutput[j]) - 10]);
				}
			} else {
				var tempString = tw[parseInt(finalOutput[j][0])];
				if (parseInt(finalOutput[j]) !== 0) {
					tempString = tempString + dg[parseInt(finalOutput[j])];
				}
				textOutputs.push(tempString);
			}
		} else {
			if (parseInt(finalOutput[j]) !== 0) {
				textOutputs.push(dg[parseInt(finalOutput[j])]);
			} else {
				textOutputs.push("");
			}
		}
	}
	var resultString = "";
	for (let k = textOutputs.length - 1; k >= 0; k--) {
		var tempOutput = textOutputs[k];
		if (textOutputs[k] === "ett") {
			tempOutput = bojning[textOutputs.length - 1 - k];
		}
		var tempPrefix = "";
		if (tempOutput !== "") {
			if (textOutputs[k] === "ett" && th[k] === "tusen") {
				tempPrefix = "usen";
			} else {
				tempPrefix = th[k];
			}
		}
		if (parseInt(finalOutput[k]) > 1 && 2 <= k) {
			tempPrefix = tempPrefix + "er";
		}
		if (!(tempOutput === "" && tempPrefix === "")) {
			resultString = resultString + tempOutput + tempPrefix + " ";
		}
	}
	return resultString;
}
