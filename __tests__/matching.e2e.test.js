describe("basic user flow", () => {	
	test("homepage should have navigation to both games", async () => {
		await page.goto("http://localhost:3000/source/homepage.html");

		const matchingButton = await page.$("#matching-button");
		expect(matchingButton).not.toBeNull();

		await Promise.all([
			page.waitForNavigation(),
			page.click("#matching-button"),
		]);
		expect(page.url()).toMatch("http://localhost:3000/source/matching.html");


		await page.goto("http://localhost:3000/source/homepage.html");

		const sequenceButton = await page.$("#sequence-button");
		expect(sequenceButton).not.toBeNull();

		await Promise.all([
			page.waitForNavigation(),
			page.click("#sequence-button"),
		]);
		expect(page.url()).toBe("http://localhost:3000/source/sequence.html");
	});

	test("matching game should allow interaction", async () => {
		await page.goto("http://localhost:3000/source/matching.html");

		const cards = await page.$$(".card");
		expect(cards.length).toBe(16);

		// await page.click("#start-btn");

		// await cards[0].click();
		// const flippedCard = await page.$(".flipped");
		// expect(flippedCard).toBe(cards[0]);
	});
});

