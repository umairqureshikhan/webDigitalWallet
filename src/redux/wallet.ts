import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { API, BASE_API_URL} from "../constants";
import axios from "axios";
import { addNetwork, addToken, createAccount, decrypt, getBalanceOfNative, getBalanceOfTokens, getTxHistory, importWallet, sendNativeToken, sendToken } from "../services/blockchain";



export interface WalletState {
  username: string;
  password: string;
  esp: string;
  data: any;
  loading: boolean;
  currentAccount: any;
  currentNetwork: any;
  currentAccountNumber: any;
  currentNetworkNumber: any;
  
  balance: string;
  currentTokens: any;
  currentToken: any;
  openNetworkMenu: boolean;
  
  reciever: any,
  operation: string,
  txHistory: any,
  accountDetails: any;
  importWallet: boolean;
  loadingCounter : any
  importedPhrase: any;
  error: string


}

const initialState: WalletState = {
  username: "",
  password: "",
  esp: "",
  loading: false,
  data: {},
  currentAccount: {},
  currentNetwork: {},
  currentAccountNumber: 0,
  currentNetworkNumber: 0,
  balance: "0.0",
  currentTokens: [],
  currentToken: {},
  reciever: {},
  operation: "",
  txHistory: [],
  accountDetails: {},
  importWallet: false,
  importedPhrase: [],
  loadingCounter : 0,
  error: '',
  openNetworkMenu: false
};

export const getWallet: any = createAsyncThunk("getWallet", async () => {


  const ph = window.localStorage.getItem("phraseHash")
  console.log(ph)
  const url = BASE_API_URL + API.WALLET + "/get"
  const data = await axios.post(url, { walletHash: ph })
  console.log(data)

  return data

})



export const walletAddNetwork: any = createAsyncThunk("walletAddNetwork", async (network: any) => {

  const data = await addNetwork(network)
  console.log(data)
  return data

})


export const walletDecrypt: any = createAsyncThunk("walletDecrypt", async (data: any) => {

  const { password, type, address } = data
  const res = await decrypt(password, type, address)
  console.log(res)
  return res

})


export const walletAddAccount: any = createAsyncThunk("walletAddAccount", async (accountData: any) => {

  const { esp, password, aountName, accountNumber } = accountData
  const data = await createAccount(esp, password, aountName, accountNumber)
  console.log(data)
  return data

})


export const walletGetBalance: any = createAsyncThunk("walletGetBalance", async (data: any) => {

  const { address, rpcUrl } = data
  const res = await getBalanceOfNative(address, rpcUrl)
  console.log(res)
  return res

})




export const walletAddToken: any = createAsyncThunk("walletAddToken", async (data: any) => {

  const { accountId, body } = data
  const res = await addToken(accountId, body)
  console.log(res)
  return res

})




export const walletGetToken: any = createAsyncThunk("walletGetToken", async (data: any) => {

  const { tokens, rpcUrl, address, network } = data
  const res = await getBalanceOfTokens(tokens, rpcUrl, address, network)
  console.log(res)
  return res

})




export const walletSendToken: any = createAsyncThunk("walletSendToken", async (data: any) => {

  const { operation, rpcUrl, epk, password, addressTo, addressFrom, amount, tokenAddress } = data
  console.log("to heeeee k nhi")

  if (operation === "sendNativeToken") {
    const res = await sendNativeToken(rpcUrl, epk, password, addressTo, addressFrom, amount)
    console.log(res)
    return res
  }
  else if (operation === "sendToken") {

    const res = await sendToken(rpcUrl, epk, password, addressTo, amount, tokenAddress)
    console.log(res)
    return res
  }


})


export const walletTxHistory: any = createAsyncThunk("walletTxHistory", async (data: any) => {

  const { address, chainId } = data

  const res = await getTxHistory(chainId, address)
  console.log(res)
  return res



})



export const walletImport: any = createAsyncThunk("walletImport", async (data: any) => {

  const { seedPhrase, password } = data

  const res = await importWallet(seedPhrase, password)
  console.log(res)
  return res



})


export const wallet = createSlice({
  name: "wallet",
  initialState,
  reducers: {

    saveUser: (state, action: PayloadAction<any>) => {
      if (action.payload.username && action.payload.password) {

        state.username = action.payload.username
        state.password = action.payload.password
      }
    },

    setOperation: (state, action: PayloadAction<any>) => {
      state.operation = action.payload
    },


    saveReciverDetails: (state, action: PayloadAction<any>) => {
      state.reciever = action.payload


    },
    changeAccount: (state, action: PayloadAction<any>) => {
      state.currentAccount = action.payload

    },

    setCurrentTokenForSend: (state, action: PayloadAction<any>) => {
      state.currentToken = action.payload
    },

    setCurrentNetwork: (state, action: PayloadAction<any>) => {
      state.currentNetwork = action.payload
    },

    setCurrentNetworkNumber : (state, action: PayloadAction<any>) => {
      state.currentNetworkNumber = action.payload
    },

    
    setCurrentAccountNumber : (state, action: PayloadAction<any>) => {
      state.currentAccountNumber = action.payload
    },

    setAccountDetails: (state, action: PayloadAction<any>) => {
      state.accountDetails = action.payload
    },
    setImportWallet: (state, action: PayloadAction<any>) => {
      state.importWallet = action.payload
    },
    setIMporteddPhrase: (state, action: PayloadAction<any>) => {
      state.importedPhrase = action.payload
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload
    },
    setOpenNetworkMenu: (state, action: PayloadAction<any>) => {
      state.openNetworkMenu = action.payload
    },
    erasePk: (state) => {
      state.esp = ''
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(getWallet.pending, (state, action) => {
        state.loadingCounter += 1;
        state.loading = true;
        console.log('pending', action);
        // state.error = null;
      })
      .addCase(getWallet.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.data = action.payload.data.wallet
        state.currentAccount = action.payload.data.wallet.accounts[state.currentAccountNumber]
        state.currentNetwork = action.payload.data.wallet.networks[state.currentNetworkNumber]
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(getWallet.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })


      // walletAddNetwork
      .addCase(walletAddNetwork.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletAddNetwork.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.data.networks.push(action.payload.network)
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletAddNetwork.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })



      // wallet DECRYPT SEEDPHRSE
      .addCase(walletDecrypt.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletDecrypt.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.esp = action.payload
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletDecrypt.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })


      // wallet Add Account
      .addCase(walletAddAccount.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletAddAccount.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.data.accounts.push(action.payload.account)
        state.currentAccount = action.payload.account
        state.data.accountCount += 1;
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletAddAccount.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })


      // get balnce
      .addCase(walletGetBalance.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletGetBalance.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.balance = action.payload
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletGetBalance.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })


      //walletAddToken
      .addCase(walletAddToken.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletAddToken.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.currentTokens.push({...action.payload.token, balance : "0.0"})
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletAddToken.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })


      //walletsendToken
      .addCase(walletSendToken.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletSendToken.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        // state.balance = action.payload
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletSendToken.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })
      // walletGetToken


      .addCase(walletGetToken.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletGetToken.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.currentTokens = action.payload
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletGetToken.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })



      // walletTxHistory
      .addCase(walletTxHistory.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletTxHistory.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.txHistory = action.payload
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletTxHistory.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })



      // walletImport

      .addCase(walletImport.pending, (state, action) => {
        console.log('pending', action);
        state.loading = true;
        state.loadingCounter += 1;
        // state.error = null;
      })
      .addCase(walletImport.fulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.loading = false;
        state.loadingCounter -= 1;
      })
      .addCase(walletImport.rejected, (state, action) => {
        console.log('rejected', action);
        state.loading = false;
        state.loadingCounter -= 1;
        // state.error = action.error.message;
      })




  }
});

export const {
  saveUser,
  saveReciverDetails,
  setOperation,
  setCurrentTokenForSend,
  changeAccount,
  setCurrentNetwork,
  setAccountDetails,
  setImportWallet,
  setIMporteddPhrase,
  setError,
  erasePk,
  setOpenNetworkMenu,
  setCurrentAccountNumber,
  setCurrentNetworkNumber
} = wallet.actions;
export default wallet.reducer;
