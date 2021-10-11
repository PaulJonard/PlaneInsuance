import {useWallet, UseWalletProvider} from 'use-wallet'
import React from 'react'

import "./ConnectWallet.css"


function ButtonBehaviour() {    
    const wallet = useWallet()
    let content = "Connect Wallet"
    const connectWallet = async (e) => {        
        e.preventDefault()
        await wallet.connect()
    }
    
    if(wallet.account != null){
        content = wallet.account
        if(wallet.chainId !== 4){
            alert('Vous n\'êtes pas connecté au réseau Rinkeby')
        }    
    }


    return (
        <div>
            <button 
                onClick={connectWallet} 
                activeClassName="active"
                className="ConnectButton" >{content}</button>
        </div>
    )
}

function Connection() {
    return (
        <UseWalletProvider 
        chainId={4}
        connectors={{
            provided: {provider: window.cleanEthereum}
        }}
        >
            <ButtonBehaviour />
        </UseWalletProvider>
    )
}

export default Connection;