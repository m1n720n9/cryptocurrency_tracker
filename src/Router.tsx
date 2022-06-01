import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coins from "./routes/Coins"
import Coin from "./routes/Coin"

function Router (){
  const PUBLIC_URL = "https://m1n720n9.github.io/cryptocurrency_tracker";
  return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/:coinId">
        <Coin />
      </Route>
      <Route path="/">
        <Coins />
      </Route>
    </Switch>
  </BrowserRouter>
}
export default Router;