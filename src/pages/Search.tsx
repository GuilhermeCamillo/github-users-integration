import { SearchBar } from "../components/SearchBar";

export const Search = () => {
  return (
    <div className="page page--search">
      <div className="page__container">
        <div className="search-hero">
          <h1 className="search-hero__title">Buscar Usuários do GitHub</h1>
          <p className="search-hero__subtitle">
            Digite o username para visualizar informações e repositórios
          </p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};
