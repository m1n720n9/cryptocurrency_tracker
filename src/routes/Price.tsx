import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import styled from "styled-components";

interface PriceProps{
  coinId: string;
}

interface PriceData{
  id : string;
  name : string;
  symbol : string;
  rank : number;
  circulating_supply : number;
  total_supply : number;
  max_supply : number;
  beta_value : number;
  first_data_at : string;
  last_updated : string;
  quotes : {
    USD : {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

const PriceBox = styled.div`
  max-width: 480px;
  padding: 16px;
  background: rgba(255,255,255,.5);
  border-radius: 10px;
`
const PriceList = styled.ul`
  
`
const PriceItem = styled.li`
  
`

function Price ({coinId} : PriceProps) {
  const {isLoading : tickersLoading, data: tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {refetchInterval:5000,});
  return(
    <PriceBox>
      {tickersLoading? "loading" : 
      <PriceList>
        <PriceItem>
          <span>변동(12h) :</span>
          <span> {tickersData?.quotes.USD.percent_change_12h}</span>
        </PriceItem>
      </PriceList>
      }
    </PriceBox>

  )
};

export default Price;