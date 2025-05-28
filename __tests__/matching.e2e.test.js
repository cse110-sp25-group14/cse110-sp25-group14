beforeAll(async () => {
	await page.goto("http://192.168.1.161:5500/matching.html");
});

test("placeholder", async () => {
	const startButton = await page.$("#start-btn");
	expect(startButton).toBeDefined();
});