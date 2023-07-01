import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import "./Styles/App.css";
function App() {
  return (
    <>
      <Helmet>
        <title>Helmet application</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <Outlet />
    </>
  );
}

export default App;
