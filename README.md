<img align="right" width="90" height="90" top="100" src="./public/logo.png">

# 💡 Lux Wallet 
### Lux is a wallet extension for Lukso Network

## Team Members
 - **Naveen Sahu** (<a href="mailto:thenvnsahu@gmail.com">thenvnsahu@gmail.com</a>)

## NOTE
- Project was tested with Chrome browser
- See [minor issues](#known-minor-issues)

## Installation

Either download the `.zip` package for extension or clone the repo to run as both - a web app or built chrome extension:

### Download
- Download package from [here](https://lux-wallet.vercel.app/).  
- Unzip the downloaded file.
- Load the extension in Chrome by going through `Manage Extensions -> Load Unpacked` and choosing the unzipped directory.

### Build & Test Locally
The project is bootstrapped with Create React App.

Clone the repo:
```
git clone https://github.com/theNvN/lux-wallet.git
```

Install dependencies:
```
yarn install
```

You can now optionally start it as web app:
```
yarn start
```

or build it to load as an extension (outputs to `./build`)
```
yarn build
```

After build, load the directory (`./build`) into chrome as extension:   

Go to `Manage Extensions -> Load Unpacked`. Then locate outputted `./build` directory & choose it.

## Tools/Libraries
Some notable dependencies used in the app:
- `web3.js` for querying chain data & sending transactions
- `erc725.js` for interacting with the ERC-725 schemas easily
- `@lukso/lsp-smart-contracts` for contract ABIs
- `eth-keyring-controller` for managing/encrypting credentials securely
- `chakra-ui` for customizable themed UI
- `react-router-dom` for elegantly routing across different screens
- `react-hook-form` + `yup` for building robust forms
- `react-query` for all async network calls & related state management elegantly
- `dexie` for interacting with browser IndexDB
- `i18next` for internationalization

## Known minor issues
- Any updates corresponding to confirmed transactions (e.g. balance update) might take a little while & reflects after switching between components. Can be solved by invalidating cache after transaction confirmation.
- Vaults are not showing up. This is not a bug of the extension actually. See [here](https://lux-wallet.vercel.app/issues).