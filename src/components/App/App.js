import React, {useState} from 'react';
import CryptoCoins from './CryptoCoins';
import {Pagination, useMediaQuery} from '@mui/material';
import {styled} from "@mui/system";
import "./styles.css";

const CustomPagination = styled(Pagination)`
    & .MuiPaginationItem-root{
        color: white;
    }
`

function App(){
    const [currentPage, setCurrentPage] = useState(1);
    const mobile = useMediaQuery("(max-width: 580px)");

    const handlePageChange = (e, newPage) => {
        setCurrentPage(newPage)
    }

    return(
        <main className="grid">
            <h1 className="title">
                Crypto Coins
            </h1>
            <h2 className="desc">
                This app will display the current price for each crypto coin
            </h2>
            <CryptoCoins currentPage={currentPage}/>
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