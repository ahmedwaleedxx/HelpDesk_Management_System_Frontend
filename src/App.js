
import { BrowserRouter,Route, Routes } from "react-router-dom";

import AuthProvider from "./store/AuthProvider";
import Layout from "./UI/Layout/layout";
import Home from "./pages/home";

import MyTickets from "./pages/mytickets";
import SigninPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Logout from "./pages/logout";
import Createticket from "./pages/Createticket";
import Myaccount from "./pages/Myaccount";
import ViewTicket from "./pages/ViewTicket";
import HelpPage from "./pages/helpPage";
import CreateArticle from "./pages/createArticle";
import GetArticleByID from "./pages/getArticleByID";
import AddArticleComment from "./pages/AddArticleComment";
import GetArticleComments from "./pages/getArticleComments";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/mytickets" element={<MyTickets />} />
            <Route path="/login" element={<SigninPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/createticket" element={<Createticket />} />
            <Route path="/myaccount" element={<Myaccount />} />
            <Route path="/tickets/:ticketId" element={<ViewTicket />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/help/article/:id" element={<GetArticleByID />} />
            <Route path="/createArticleComment/:id" element={<AddArticleComment />} />
            <Route path="/help/createArticle" element={<CreateArticle />} />
            <Route path="/help/article/comments/:id" element={<GetArticleComments />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
