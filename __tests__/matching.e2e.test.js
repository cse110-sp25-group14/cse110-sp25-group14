beforeAll(async () => {
	await page.goto("http://localhost:3000/matching.html");
});

test("placeholder", async () => {
	const startButton = await page.$("#start-btn");
	expect(startButton).toBeDefined();
});