const axios = require('axios')

export const pinJSONToIPFS = (json) => {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

    return axios.post(url, json, 
        {
            headers: 
            {
                pinata_api_key: '110fa816776abfa66120',
                pinata_secret_api_key: '78d5ac0f9b8d71cbd56ae13aa11d66bc9bdcef669ca81971b49282eb8e2444b5'
            }
        })
        .then(function (response){
            //Handle response here
            console.log(response.data.IpfsHash)
            return response.data.IpfsHash
        })
        .then(function (error){
            //Handle error here
        })
}