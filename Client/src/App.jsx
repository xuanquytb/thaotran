import "./App.css";
import "@progress/kendo-theme-material/dist/all.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Components/layout/Landing";
import Auth from "./Components/view/Auth";

import Dashboard from "./Components/layout/Admin/DashBoard";
import MyInfo from "./Components/layout/Page/MyInfo/MyInfo";
import MyOrder from "./Components/layout/Page/MyOrder/MyOrder";
import About from "./Components/layout/Page/About/About";
import Checkout from "./Components/layout/Page/Checkout/Cart";
import Payment from "./Components/layout/Page/Checkout/Payment";
import Success from "./Components/layout/Page/Checkout/orderSuccess";
import AuthContextProvider from "./Store/Context/AuthContext";
import PaymentContextProvider from "./Store/Context/PaymentContext";
import OrderContextProvider from "./Store/Context/OrderContext";
import UserContextProvider from "./Store/Context/UserContext";
import ProductContextProvider from "./Store/Context/ProductContext";
import CategoryContextProvider from "./Store/Context/CategoryContext";
import BrandContextProvider from "./Store/Context/BrandContext";
import CardContextProvider from "./Store/Context/CardContext";
import NewsContextProvider from "./Store/Context/NewsContext";
import CategoryNewsContextProvider from "./Store/Context/CategoryNewsContext";
import ProtectedRoute from "./Store/Routing/ProtectedRoute";
import ProtectedRouteUser from "./Store/Routing/ProtectedRouteUser";
import CategoryProduct from "./Components/layout/Page/Product/CategoryProduct";
import PageShowResultSearch from "./Components/layout/Page/Search/ViewResultSearch/index";
import News from "./Components/layout/Page/news/News";
import invoiceOrder from "./Components/layout/Admin/invoice/InvoiceOrder";
import Insurance from "./Components/layout/Admin/invoice/Insurance";
import InvoiceInsuance from "./Components/layout/Admin/invoice/InvoiceInsurance";
import InvoiceOutWarehouse from "./Components/layout/Admin/invoice/InvoiceOutWarehouse";
import "../public/assets/styles/main.css";

function App() {
    return (
        <OrderContextProvider>
            <PaymentContextProvider>
                <CardContextProvider>
                    <CategoryNewsContextProvider>
                        <NewsContextProvider>
                            <AuthContextProvider>
                                <UserContextProvider>
                                    <CategoryContextProvider>
                                        <BrandContextProvider>
                                            <ProductContextProvider>
                                                <Router>
                                                    <Switch>
                                                        <Route
                                                            exact
                                                            path='/'
                                                            component={Landing}
                                                        />
                                                        <Route
                                                            exact
                                                            path='/login'
                                                            render={(props) => (
                                                                <Auth
                                                                    {...props}
                                                                    authRoute='login'
                                                                />
                                                            )}
                                                        />
                                                        <Route
                                                            exact
                                                            path='/register'
                                                            render={(props) => (
                                                                <Auth
                                                                    {...props}
                                                                    authRoute='register'
                                                                />
                                                            )}
                                                        />
                                                        <Route
                                                            exact
                                                            path='/admin/login'
                                                            render={(props) => (
                                                                <Auth
                                                                    {...props}
                                                                    authRoute='loginAdmin'
                                                                />
                                                            )}
                                                        />

                                                        <ProtectedRouteUser
                                                            exact
                                                            path='/checkout'
                                                            component={Checkout}
                                                        />
                                                        <ProtectedRouteUser
                                                            exact
                                                            path='/payment'
                                                            component={Payment}
                                                        />
                                                        <ProtectedRouteUser
                                                            exact
                                                            path='/success'
                                                            component={Success}
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/dashboard'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/user'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/admin'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/employee'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/category'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/product'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/brand'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/new'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/comment'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/order'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRoute
                                                            exact
                                                            path='/news'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />

                                                        <ProtectedRoute
                                                            exact
                                                            path='/dashboardAdmin'
                                                            component={
                                                                Dashboard
                                                            }
                                                        />
                                                        <ProtectedRouteUser
                                                            exact
                                                            path='/info'
                                                            component={MyInfo}
                                                        />
                                                        <ProtectedRouteUser
                                                            exact
                                                            path='/info/order'
                                                            component={MyInfo}
                                                        />
                                                        <ProtectedRouteUser
                                                            exact
                                                            path='/myorder'
                                                            component={MyOrder}
                                                        />
                                                        <ProtectedRouteUser
                                                            exact
                                                            path='/pagenew'
                                                            component={News}
                                                        />
                                                        <Route
                                                            exact
                                                            path='/categoryProduct'
                                                            component={
                                                                CategoryProduct
                                                            }
                                                        />
                                                        <ProtectedRouteUser
                                                            exact
                                                            path='/searchresult'
                                                            component={
                                                                PageShowResultSearch
                                                            }
                                                        />

                                                        <Route
                                                            exact
                                                            path='/invoice'
                                                            component={
                                                                invoiceOrder
                                                            }
                                                        />
                                                        <Route
                                                            exact
                                                            path='/Insurance'
                                                            component={
                                                                Insurance
                                                            }
                                                        />
                                                        <Route
                                                            exact
                                                            path='/InvoiceInsuance'
                                                            component={
                                                                InvoiceInsuance
                                                            }
                                                        />
                                                        <Route
                                                            exact
                                                            path='/InvoiceOutWarehouse'
                                                            component={
                                                                InvoiceOutWarehouse
                                                            }
                                                        />
                                                        <Route
                                                            exact
                                                            path='/about'
                                                            component={About}
                                                        />
                                                        <Route path='/notfound' />
                                                    </Switch>
                                                </Router>
                                            </ProductContextProvider>
                                        </BrandContextProvider>
                                    </CategoryContextProvider>
                                </UserContextProvider>
                            </AuthContextProvider>
                        </NewsContextProvider>
                    </CategoryNewsContextProvider>
                </CardContextProvider>
            </PaymentContextProvider>
        </OrderContextProvider>
    );
}

export default App;
