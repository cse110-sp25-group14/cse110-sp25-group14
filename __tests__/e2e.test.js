describe("basic user flow", () => {	
	test("homepage should have navigation to all pages", async () => {
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


		await page.goto("http://localhost:3000/source/homepage.html");

		const leaderboardButton = await page.$("#leaderboard-btn");
		expect(leaderboardButton).not.toBeNull();

		await Promise.all([
			page.waitForNavigation(),
			page.click("#leaderboard-btn"),
		]);
		expect(page.url()).toBe("http://localhost:3000/source/leaderboard.html");
	});

	test("matching game should allow interaction", async () => {
		await page.goto("http://localhost:3000/source/matching.html");

		const cards = await page.$$(".card");
		expect(cards.length).toBe(16);

		await page.click("#start-btn");
		await page.waitForSelector("#start-btn", { hidden: true });

		const firstCard = cards[0];
		await firstCard.click();
		const firstCardImage = await firstCard.getProperty("src");
		expect(firstCardImage).not.toBe("../assets/G14.png");
	});

	test("sequence game should allow interaction", async () => {
		await page.goto("http://localhost:3000/source/sequence.html");

		await page.click("#start-btn");
		await page.waitForSelector("#start-btn", { hidden: true });

		const cards = await page.$$(".card");
		expect(cards.length).toBe(9);

		const firstCard = cards[0];
		await firstCard.click();

		await page.waitForFunction(
			card => card.classList.contains("flipped"),
			{},
			firstCard
		);

		const className = await firstCard.evaluate(el => el.className);
		expect(className.includes("flipped")).toBe(true);
	});

	test("records page should allow interaction", async () => {
		await page.goto("http://localhost:3000/source/records.html");

		await page.select("#record-dropdown", "matching");
		const selectedGame = await page.$eval("#record-dropdown", el => el.value);
		expect(selectedGame).toBe("matching");

		await page.select("#header-dropdown", "moves");
		const sortBy = await page.$eval("#header-dropdown", el => el.value);
		expect(sortBy).toBe("moves");
	});
});

