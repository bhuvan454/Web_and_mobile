import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PublicRoute from "./routes/publicRoute";
import PrivateRoute from './routes/privateRoute';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import PropertySearch from "./pages/propertySearch/PropertySearch";
import Property from "./pages/property/Property";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import CustomerEnroll from "./components/customerEnroll/CustomerEnroll";
import CustomerLogin from "./pages/customerLogin/CustomerLogin";
import CustomerDashboard from "./pages/customerDashboard/CustomerDashboard";

function App() {
  return (
    <>
    <Router>
    <Switch>
    <PublicRoute path="/login" restricted={true} component={Login} exact />
      <PublicRoute path="/register" component={Register} exact />
      <PublicRoute path="/home" component={Home} exact />
      <PublicRoute path="/propertysearch" component={PropertySearch} exact />
      <PublicRoute path="/property/:id" component={Property} exact />
      <PrivateRoute path="/admin_dashboard" component={AdminDashboard} exact />
      <PublicRoute path="/customer_enroll/:id" component={CustomerEnroll} exact />
      <PublicRoute path="/customerlogin" component={CustomerLogin} exact />
      <PublicRoute path="/customerDashboard" component={CustomerDashboard} exact />
    </Switch>
    </Router>
    </>
  );
}

export default App;
