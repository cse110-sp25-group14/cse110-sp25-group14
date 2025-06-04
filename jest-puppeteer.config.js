export default {
	launch: {
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		headless: true,
	},
	server: {
		command: "npm run start",
		port: 3000,
		launchTimeout: 10000,
		debug: true
	}
};