import React from 'react';
import axios from 'axios';
import Markprice from './Markprice';
import './table.css'

function Table() {
    const [products, setProducts] = React.useState([]);
    React.useEffect(()=>{
        axios.get("https://api.delta.exchange/v2/products")
        .then((res)=>{
            setProducts(res.data.result);
            // console.log(products);
            // console.log(res.data.result)
        })
        .catch((err)=>console.log(err))
    }, [])
  return (
    <div>
        <table class="table-fixed">
            <thead>
            <tr>
                <th>Symbol</th>
                <th>Description</th>
                <th>Underlying Asset</th>
                <th>Mark Price</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product)=>(
            <tr className='table_row'>
            <td key={product.id}>{product.symbol}</td>
            <td key={product.id}>{product.description}</td>
            <td key={product.id}>{product.underlying_asset.symbol}</td>
            <td key={product.id}><Markprice symbol={product.symbol} underlying_asset_symbol={product.underlying_asset.symbol}/></td>
            </tr>
            
        ))}</tbody>
        </table>
        
    </div>
  )
}

export default Table