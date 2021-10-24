# HardHat basic commands

Hardhat is used to deploy on a local copy of ethereum blockchain, cleaned up at each start. Or deploying to a testnet.
Hardhat provide some commands to retrieve deployer accounts, compiling infos...

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat run scripts/run.js    --to debug the smartContract
npx hardhat run scripts/deploy.js --network rinkeby  --to deploy on testnet
npx hardhat run scripts/deploy.js --network localhost  --to deploy on localhost
npx hardhat help
```
