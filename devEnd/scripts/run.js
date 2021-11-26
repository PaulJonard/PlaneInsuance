const main = async () => {
  const contractFactory = await hre.ethers.getContractFactory('BoardingPass');
  const plane = await contractFactory.deploy();
  await plane.deployed();
  
  console.log("Contract deployed to:", plane.address);

  let txn = plane.mint("QmRdyx1bSBbFjnRqWdt8zJr5t6zyfK7K2gnFno2MrXBF4k", 0.002)
  console.log(txn)
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