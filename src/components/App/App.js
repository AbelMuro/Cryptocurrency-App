import React, {useState, useEffect, useRef} from 'react';
import {Pagination, useMediaQuery} from '@mui/material';
import {styled} from "@mui/system";
import "./styles.css";


const CustomPagination = styled(Pagination)`
    & .MuiPaginationItem-root{
        color: white;
    }
`


function App(){
    const [coinData, setCoinData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = useRef(8);
    const mobile = useMediaQuery("(max-width: 580px)");
    console.log(mobile);

    const handlePageChange = (e, newPage) => {
        setCurrentPage(newPage)
    }

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then((res) => {
                return res.json();
            })
            .then((results) => {
                setCoinData(results);  
            })
    }, []);

    const lastPostIndex = currentPage * postsPerPage.current;
    const firstPostIndex = lastPostIndex - postsPerPage.current;
    const currentPosts = coinData.slice(firstPostIndex, lastPostIndex);

    return(
        <main className="grid">
            <h1 className="title">Crypto Coins</h1>
            {currentPosts.length ? currentPosts.map((coin) => {
                return(
                    <div className="coin">
                        <img src={coin.image} className="coinImage"/>
                        <h3 className="coinTitle">{coin.name}</h3>
                        <p className="coinPrice">{"$ " + coin.current_price}</p>
                    </div>
                )
            }) : ""}
            <CustomPagination
                className="pagination"
                page={currentPage}
                onChange={handlePageChange}
                count={11}
                color="secondary"
                size= {mobile ? "small" : "large"}
            />            
        </main>

    )

}

export default App;