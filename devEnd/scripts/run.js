const main = async () => {
    const contractFactory = await hre.ethers.getContractFactory('BoardingPass');
    const plane = await contractFactory.deploy();
    await plane.deployed();

    console.log("Contract deployed to:", plane.address);
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