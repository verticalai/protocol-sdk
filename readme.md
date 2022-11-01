# Thred Protocol SDK

Thred is a decentralized App Store Protocol. Using Thred, developers can create installable web3 applications and list them for sale on App Store Clients. This SDK provides all the functions needed to create standalone App Stores with the Thred Protocol. 


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the Thred Protocol SDK.

```bash
npm install thred-protocol-sdk
```

### Import Module

```typescript
import * as protocolSDK from "thred-protocol-sdk"

// import the module 2 different ways

const protocolSDK = require("thred-protocol-sdk")
```

### App Transaction Listener

```typescript
//Listen for transactions sent from the currently active app

const sessionKey = "..." //Unique session key for the active app instance

protocolSDK.setAppListener(sessionKey, (data) => {

     //Handle transaction sent from the app
     //This is where you call the Smart Contract with the connected wallet
}) 
```
### Handling an App Transaction Request

Call the Smart Contract with the wallet connected to your App Store Client.

```typescript
const ethers = require("ethers")

const sessionKey = "..." //Unique session key for the active app instance

protocolSDK.setAppListener(sessionKey, async (data) => {

     //Contract Details
     const contractData = data.contract
     const address = contractData.address
     const abi = contractData.abi

     //Function Details
     const name = data.name
     const params = data.params
     const value = data.value
     const waitMode = data.waitMode

     //Get Connected Signer
     let provider = ... // retrieve connected ethers provider
     let signer = provider.getSigner() //retrieve signer

     //Use ethers.js to call the function on the contract with the current provider.
     let contract = new ethers.Contract(address, abi, signer);
     let transaction = await contract[name](...params, {
          value
     })

     //Check wait mode passed by the app
     if (waitMode == "wait" || waitMode == "wait_update"){
          if (waitMode == "wait_update"){
               protocolSDK.sendTransactionReceipt(transaction)
          }
          await transaction.wait()
     }

     protocolSDK.sendTransactionReceipt(transaction)

}) 
```



## License
[MIT](https://choosealicense.com/licenses/mit/)