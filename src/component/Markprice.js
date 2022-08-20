import React from 'react'

function Markprice({symbol, underlying_asset_symbol}) {

    const [markPrice, setMarkPrice] = React.useState("");

    const ws = new WebSocket("wss://production-esocket.delta.exchange");

    const apiCall = {
        "type": "subscribe",
        "payload": {
            "channels": [
                {
                    "name": "v2/ticker",
                    "symbols": [
                        symbol, underlying_asset_symbol
                    ]
                }
            ]
        }
      };

    ws.onopen = (event) => {
        ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
        // console.log(event)
        const json = JSON.parse(event.data);
        // console.log(json['mark_price'])
        // console.log(json)
        try {
          if (typeof json['mark_price']!=="undefined") {
            // console.log(json['mark_price'])
            setMarkPrice(json['mark_price']);
          }
        } catch (err) {
          console.log(err);
        }
      };
    // ws.onclose = (event) => {
    //   console.log("connection closed")
    // }
    // ws.close(
    //   console.log("connection closed")
    // );

  return (
    <div>{markPrice}</div>
  )
}

export default Markprice