import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProviderWrapper } from "./lib/queryClient";
import "./App.scss";

const App = () => {
  return (
    <QueryClientProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Search Page</div>} />
          <Route path="/user/:username" element={<div>Results Page</div>} />
          <Route
            path="/user/:owner/repo/:repo"
            element={<div>Repository Details Page</div>}
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProviderWrapper>
  );
};

export default App;
