import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ERC721ABI from '../../config/abis/extendedERC721.json';
import { exportInstance } from '../../apiServices';

const MyNFTs = () => {
    const [nfts, setNfts] = useState([]);



    async function fetchNfts() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];

            const url = `https://testnets-api.opensea.io/api/v2/chain/amoy/account/${userAddress}/nfts`;
            const options = {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'x-api-key': '2e214afea34e408a8caa90d9059dcb2e'
                }
            };
            fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                 response.json().then((data)=>{
                    console.log(data)
                    setNfts(data?.nfts)
                });
               
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching NFTs:', error);
            });
        }
    }


    useEffect(() => {
        // const loadNFTs = async () => {
        //     if (window.ethereum) {
        //         const web3 = new Web3(window.ethereum);
        //         await window.ethereum.enable();
        //         const accounts = await web3.eth.getAccounts();
        //         const userAddress = accounts[0];

        //         // const nftContract = new web3.eth.Contract(ERC721ABI.abi, "0xf03f513Bd5d2B72E15FDb274302237CEa566528c");
        //         const nftContract=await exportInstance("0xb11Eb90be29cD8d522CD353E51D7232E6a22f609", ERC721ABI.abi);
        //         console.log("nft contract is------>>>",nftContract);
        //         const balance = await nftContract.balanceOf(userAddress);
        //         console.log("balance of user is------->",balance)

        //         let nftIds = [];
        //         for (let i = 0; i < balance; i++) {
        //             console.log("nft id is------>",i)
        //             const nftId = await nftContract.methods.tokenOfOwnerByIndex('0x2D86290D009f2ad72062d7C25aF1602c3bE18189', i).call();
        //             console.log("nft id and nft is----->>>",nftId,i)
        //             nftIds.push(nftId);
        //         }

        //         let fetchedNfts = [];
        //         for (const nftId of nftIds) {
        //             const tokenURI = await nftContract.methods.tokenURI(nftId).call();
        //             const response = await fetch(tokenURI);
        //             const metadata = await response.json();
        //             fetchedNfts.push(metadata);
        //         }
        //         console.log(fetchedNfts)
        //         setNfts(fetchedNfts);
        //     }
        // };

        // loadNFTs();
        fetchNfts()
    }, []);

    return (
        <div>
            {nfts.map((nft, index) => (
                <div key={index}>
                    <h3>{nft.name}</h3>
                    <h3>{nft.collection}</h3>
                    <img src={nft.image_url} alt={nft.name} />
                    <p>{nft.description}</p>
                </div>
            ))}
        </div>
    );
};

export default MyNFTs;
