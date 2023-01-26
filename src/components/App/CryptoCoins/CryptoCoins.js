import React, {useState, useEffect, useRef, memo} from 'react';
import {v4 as uuid} from 'uuid';
import "./styles.css";

function CryptoCoins({currentPage, getTotalPages}) {
    const [coinData, setCoinData] = useState([]);
    const postsPerPage = useRef(8);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then((res) => {
                return res.json();
            })
            .then((results) => {
                setCoinData(results); 
                getTotalPages(Math.round(results.length / postsPerPage.current)) ;
            })
    }, []);


//================================= IGNORE ========================================================
        //find out about cURL

        //authorization key:  pTDGf2VLaR2gzB61mwiibG6zXUV04zWihMUfBWNl

        //curl -X GET "https://api.printful.com/store/products" \ -H 'Authorization: Basic smk_pTDGf2VLaR2gzB61mwiibG6zXUV04zWihMUfBWNl'
    useEffect(() => {
        fetch("http://example.com",{

        })
        .then((response) => {
            console.log(response);
            return response.json()
        })
        .then((results) => {
            console.log(results);
        })
    })
//=========================================================================================================================


    const lastPostIndex = currentPage * postsPerPage.current;
    const firstPostIndex = lastPostIndex - postsPerPage.current;
    const currentPosts = coinData.slice(firstPostIndex, lastPostIndex);

    return(
        <>
            {currentPosts.length ? currentPosts.map((coin) => {
                return(
                    <div className="coin" key={uuid()}>
                        <img src={coin.image} className="coinImage"/>
                        <h3 className="coinTitle">{coin.name}</h3>
                        <p className="coinPrice">{"$ " + coin.current_price}</p>
                    </div>
                )
            }) : ""}        
        </>

    )
}
export default memo(CryptoCoins);