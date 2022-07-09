import { useQuery } from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

interface ChartProps{
  coinId: string
}

interface IHistiorical{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const ChartBox = styled.div`
  margin-bottom: 50px;
`

function Chart({coinId} : ChartProps) {
  const {isLoading, data} = useQuery<IHistiorical[]>(["ohlcv", coinId], ()=> fetchCoinHistory(coinId), {refetchInterval:10000});
  return (
    <ChartBox>{isLoading ? "Loading..." :
      <ApexChart
        type="line"
        series={[
          {
            name : "Price",
            data : data?.map(price => price.close) as number[]
          },
        ]}
        options={{
          theme:{mode : "dark"},
          chart : {height: 300, width: 500, background: "transparent", toolbar:{show:false}},
          grid:{show:false},
          xaxis:{labels:{show:false},axisTicks:{show:false}, axisBorder:{show:false}, type:"datetime", categories:data?.map((price) => (price.time_close as any) * 1000 ?? [])},
          yaxis:{show:false},
          stroke: {curve : "smooth", width: 3},
          fill:{type:"gradient", gradient: {gradientToColors: ["#fffa65"], stops:[0,100]}},
          colors:["#7efff5"],
          tooltip:{y:{formatter: (value) => `$${value.toFixed(2)}`}}
        }}
      />}
    </ChartBox>
  )
};

export default Chart;