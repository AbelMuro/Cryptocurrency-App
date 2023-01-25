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


        //find out about cURL

        //authorization key:  GKbxxwHiNpjy9UkbdQOGbiAgV0SCX4gHAQ6NUC3P
        //secret: iMZ1l1ZH1LJS0jVNq1u6PpY7GFZZXYtk0ErYi8bBhgZ8fo9JSq4GaHT3QpXjIdP6
    useEffect(() => {
        fetch("https://api.printful.com/store/products", {
            headers: {
                Authorization: "Bearer GKbxxwHiNpjy9UkbdQOGbiAgV0SCX4gHAQ6NUC3P"
              }
        })
            .then((response) => {
                console.log("hehe", response);
                return response.json()
            })
            .then((results) => {
                console.log(results);
            })

    })


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