const main = async () => {
    const [owner, randomperson] = await ethers.getSigners();

    const contractFactory = await hre.ethers.getContractFactory('BoardingPass');
    const plane = await contractFactory.deploy();
    await plane.deployed();

    console.log("Contract deployed to:", plane.address);

    let txnMint = await plane.mint("e","e","e","e","e",false,1,1000, {value : 1000});
    txnMint = await plane.mint("e","e","e","e","e",false,1,1000, {value : 1000});
    let tokensIds = await plane.getAllTokensFromAdress(owner.address);

    txnMint = await plane.getTokenURI(1);
    console.log(txnMint)
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