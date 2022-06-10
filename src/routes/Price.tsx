import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
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
  display: flex;
  justify-content:space-between;
  margin-bottom: 50px;
`
const PriceList = styled.ul`
  width: 50%;
  &:first-child{margin-right: 10px}
`
const PriceItem = styled.li`
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(0,0,0,.1);
  font-size: 14px;
  margin-bottom: 10px;
`

function Price ({coinId} : PriceProps) {
  const {isLoading : tickersLoading, data: tickersData} = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {refetchInterval:5000,});
  return(
    <>
      {tickersLoading? "loading" : 
        <PriceBox>
          <PriceList>
            <PriceItem>
              <span>변동(1h) :</span>
              <span> {tickersData?.quotes.USD.percent_change_1h}%</span>
            </PriceItem>
            <PriceItem>
              <span>변동(24h) :</span>
              <span> {tickersData?.quotes.USD.percent_change_24h}%</span>
            </PriceItem>
            <PriceItem>
              <span>변동(7d) :</span>
              <span> {tickersData?.quotes.USD.percent_change_7d}%</span>
            </PriceItem>
          </PriceList>
          <PriceList>
            <PriceItem>
              <span>거래량(24h) :</span>
              <span> \{tickersData?.quotes.USD.volume_24h_change_24h}%</span>
            </PriceItem>
            <PriceItem>
              <span>총 거래량 :</span>
              <span> {tickersData?.quotes.USD.volume_24h.toFixed(0)}</span>
            </PriceItem>
            <PriceItem>
              <span>총 시가 :</span>
              <span> \{tickersData?.quotes.USD.market_cap}</span>
            </PriceItem>
          </PriceList>
        </PriceBox>
      }
    </>
  )
};

export default Price;