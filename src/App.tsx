import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProviderWrapper } from "./lib/queryClient";
import { Search } from "./pages/Search";
import { Results } from "./pages/Results";
import { RepositoryDetails } from "./pages/RepositoryDetails";
import { useNetworkStatus } from "./hooks";
import "./App.scss";

const AppContent = () => {
  const { isOffline } = useNetworkStatus();

  return (
    <>
      {isOffline && (
        <div className="offline-banner" role="alert" data-testid="offline-banner">
          ⚠️ Você está offline. Dados em cache estão disponíveis.
        </div>
      )}
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/user/:username" element={<Results />} />
        <Route path="/user/:owner/repo/:repo" element={<RepositoryDetails />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProviderWrapper>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProviderWrapper>
  );
};

export default App;
