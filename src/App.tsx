import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Coins = lazy(() => import('./Dashboard/Coins'));
const CoinDetails = lazy(() => import("./Dashboard/CoinDetails"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Coins} />
          <Route exact path="/details/:id" component={CoinDetails} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
