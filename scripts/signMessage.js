
async function main() {
  const [deployer] = await ethers.getSigners();

  //sign a message to prove I own the address
  const message = "ethsd";
  const sig = await deployer.signMessage(message);
  console.log("Signed message", sig);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});