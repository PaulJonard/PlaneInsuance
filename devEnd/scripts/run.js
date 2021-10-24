const main = async () => {
    const planeContractFactory = await hre.ethers.getContractFactory('Plane');
    const planeContract = await planeContractFactory.deploy();
    await planeContract.deployed();
    console.log("Contract deployed to:", planeContract.address);
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