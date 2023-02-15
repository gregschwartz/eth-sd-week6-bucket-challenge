async function main() {
  const [deployer] = await ethers.getSigners();

  const myTokenAddress = "0x04f5FBcCfC5C5ca62C84Cc5Bb71bD99a6cA43874";
  const bucketAddress = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";
  const amount = 1000;
  
  /**
   *     function approve(address spender, uint256 value) public returns (bool success) {
          allowed[msg.sender][spender] = value;
          emit Approval(msg.sender, spender, value);
          return true;
      }
  
          require(IERC20(erc20).transferFrom(msg.sender, address(this), amount));
  */
    
  const Token = await ethers.getContractFactory("GregToken", deployer);
  const token = await Token.attach(myTokenAddress);
  const responseApproval = await token.approve(bucketAddress, amount);
  console.log("GregToken .approve(", bucketAddress, ",", amount, "), tx: https://goerli.etherscan.io/tx/", responseApproval.hash);
  console.log(responseApproval);

  const Bucket = await ethers.getContractFactory("Bucket", deployer);
  const bucket = await Bucket.attach(bucketAddress);
  const responseDrop = await bucket.drop(myTokenAddress, amount);
  console.log(responseDrop);
  console.log("Bucket .drop(", myTokenAddress, ",", amount, "), tx: https://goerli.etherscan.io/tx/", responseDrop.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});