const main = async () => {
	// Fetch the contract compile it and generate the artifacts
	const nftContractFactory = await hre.ethers.getContractFactory("MyEpicNFT");
	// Create local Eth network, generating a new blockchain aka. refresh local server
	const nftContract = await nftContractFactory.deploy();
	// Wait until contract is officially minted and deployed to local blockchain
	await nftContract.deployed();
	console.log("Contract deployed to:", nftContract.address);

	// Call the function
	let txn = await nftContract.makeAnEpicNFT();
	// Wait for txn to be mined.
	await txn.wait();
	console.log("Minted NFT #1");

	// Mint another NFT for fun.
	txn = await nftContract.makeAnEpicNFT();
	// Wait for it to be mined.
	await txn.wait();
	console.log("Minted NFT #2");
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
