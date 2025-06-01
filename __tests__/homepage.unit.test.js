/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { shuffle } from "../scripts/matching.js";

test("shuffle properly shuffles array", () => {
	const orig = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	let arr = [...orig];

	let sameOrderCount = 0;
	for (let i = 0; i < 100; i++) {
		shuffle(arr);
		if (JSON.stringify(arr) === JSON.stringify(orig)) {
			sameOrderCount++;
		}
	}

	expect(sameOrderCount).toBeLessThan(5);
});

test("shuffle doesn't modify elements", () => {
	const orig = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	let arr = [...orig];

	shuffle(arr);
	arr.sort((a, b) => a - b);

	console.log(arr);
	expect(arr).toEqual(orig);
});