import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserCard } from "../components/UserCard";
import { UserCardSkeleton } from "../components/UserCardSkeleton";
import { RepositoryList } from "../components/RepositoryList";
import { RepositoryListSkeleton } from "../components/RepositoryListSkeleton";
import { SearchBar } from "../components/SearchBar";
import { useUserSearch, useNetworkStatus } from "../hooks";
import type { SortOption, SortDirection } from "../types/github";

export const Results = () => {
  const { username: usernameParam } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortOption>("updated");
  const [direction, setDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const username = usernameParam?.toLowerCase() || "";
  const { isOffline } = useNetworkStatus();

  const { user, repositories, isLoading, error } = useUserSearch({
    username,
    sort,
    direction,
    page,
    perPage: 12,
  });

  const isOfflineNoCache =
    isOffline && (error || user.error) && !user.data && !repositories.data;

  if (isLoading) {
    return (
      <div className="page page--results">
        <div className="page__container">
          <SearchBar initialValue={username} />
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">
              Busca
            </Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{username}</span>
          </nav>
          <UserCardSkeleton />
          <RepositoryListSkeleton />
        </div>
      </div>
    );
  }

  if (isOfflineNoCache) {
    return (
      <div className="page page--results">
        <div className="page__container">
          <div className="error-state">
            <h2>Sem conexão e sem cache</h2>
            <p>
              Você está offline e não há dados em cache para o usuário "
              {username}". Conecte-se à internet para buscar este usuário.
            </p>
            <SearchBar />
            <button
              onClick={() => navigate("/")}
              className="button button--secondary"
            >
              Voltar para busca
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error || user.error) {
    return (
      <div className="page page--results">
        <div className="page__container">
          <div className="error-state">
            <h2>Usuário não encontrado</h2>
            <p>O username "{username}" não existe no GitHub.</p>
            <SearchBar />
            <button
              onClick={() => navigate("/")}
              className="button button--secondary"
            >
              Voltar para busca
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user.data) {
    return null;
  }

  return (
    <div className="page page--results">
      <div className="page__container">
        <SearchBar initialValue={username} />
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb__link">
            Busca
          </Link>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">{username}</span>
        </nav>
        <UserCard user={user.data} />
        {repositories.isLoading ? (
          <RepositoryListSkeleton />
        ) : (
          repositories.data?.data &&
          repositories.data?.pagination && (
            <RepositoryList
              repositories={repositories.data.data}
              pagination={repositories.data.pagination}
              owner={username || ""}
              onPageChange={setPage}
              onSortChange={(newSort, newDirection) => {
                setSort(newSort);
                setDirection(newDirection);
              }}
              currentSort={sort}
              currentDirection={direction}
            />
          )
        )}
      </div>
    </div>
  );
};
