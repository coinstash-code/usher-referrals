import Arweave from "arweave";

let arweave: Arweave;
export const getArweaveClient = () => {
	if (!arweave) {
		arweave = Arweave.init({
			host: "arweave.net",
			port: 443,
			protocol: "https"
		});
	}
	return arweave;
};
