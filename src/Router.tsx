import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coins from "./routes/Coins"
import Coin from "./routes/Coin"

function Router (){
  return <BrowserRouter>
    <Switch>
      <Route path="/cryptocurrency_tracker/:coinId">
        <Coin />
      </Route>
      <Route path="/cryptocurrency_tracker">
        <Coins />
      </Route>
    </Switch>
  </BrowserRouter>
}
export default Router;