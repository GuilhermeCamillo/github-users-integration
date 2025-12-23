import { useParams, useNavigate, Link } from "react-router-dom";
import { useGitHubRepository, useNetworkStatus } from "../hooks";
import { RepositoryDetailsSkeleton } from "../components/RepositoryDetailsSkeleton";

export const RepositoryDetails = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const navigate = useNavigate();
  const { isOffline } = useNetworkStatus();
  const { data: repository, isLoading, error } = useGitHubRepository(
    owner || "",
    repo || ""
  );

  const isOfflineNoCache = isOffline && error && !repository;

  if (isLoading) {
    return (
      <div className="page page--repository">
        <div className="page__container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">
              Busca
            </Link>
            <span className="breadcrumb__separator">/</span>
            <Link to={`/user/${owner}`} className="breadcrumb__link">
              {owner}
            </Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{repo}</span>
          </nav>
          <RepositoryDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (isOfflineNoCache) {
    return (
      <div className="page page--repository">
        <div className="page__container">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb__link">
              Busca
            </Link>
            <span className="breadcrumb__separator">/</span>
            <Link to={`/user/${owner}`} className="breadcrumb__link">
              {owner}
            </Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{repo}</span>
          </nav>
          <div className="error-state">
            <h2>Sem conexão e sem cache</h2>
            <p>
              Você está offline e não há dados em cache para o repositório "{owner}/{repo}".
              Conecte-se à internet para visualizar este repositório.
            </p>
            <button
              onClick={() => navigate(`/user/${owner}`)}
              className="button button--secondary"
            >
              Voltar para perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error || !repository) {
    return (
      <div className="page page--repository">
        <div className="page__container">
          <div className="error-state">
            <h2>Repositório não encontrado</h2>
            <p>O repositório "{owner}/{repo}" não foi encontrado.</p>
            <button
              onClick={() => navigate(`/user/${owner}`)}
              className="button button--secondary"
            >
              Voltar para perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page--repository">
      <div className="page__container">
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb__link">
            Busca
          </Link>
          <span className="breadcrumb__separator">/</span>
          <Link to={`/user/${owner}`} className="breadcrumb__link">
            {owner}
          </Link>
          <span className="breadcrumb__separator">/</span>
          <span className="breadcrumb__current">{repo}</span>
        </nav>

        <div className="repository-details">
          <div className="repository-details__header">
            <h1 className="repository-details__title">{repository.name}</h1>
            {repository.private && (
              <span className="repository-details__badge">Privado</span>
            )}
          </div>

          {repository.description && (
            <p className="repository-details__description">
              {repository.description}
            </p>
          )}

          <div className="repository-details__stats">
            <div className="repository-details__stat">
              <span className="repository-details__stat-label">⭐ Estrelas</span>
              <span className="repository-details__stat-value">
                {repository.stargazers_count}
              </span>
            </div>
            <div className="repository-details__stat">
              <span className="repository-details__stat-label">🍴 Forks</span>
              <span className="repository-details__stat-value">
                {repository.forks_count}
              </span>
            </div>
            <div className="repository-details__stat">
              <span className="repository-details__stat-label">👁 Watchers</span>
              <span className="repository-details__stat-value">
                {repository.watchers_count}
              </span>
            </div>
            {repository.language && (
              <div className="repository-details__stat">
                <span className="repository-details__stat-label">Linguagem</span>
                <span className="repository-details__stat-value">
                  {repository.language}
                </span>
              </div>
            )}
            <div className="repository-details__stat">
              <span className="repository-details__stat-label">Issues</span>
              <span className="repository-details__stat-value">
                {repository.open_issues_count}
              </span>
            </div>
          </div>

          {repository.html_url && (
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="button button--primary"
            >
              Ver no GitHub
            </a>
          )}

          <button
            onClick={() => navigate(`/user/${owner}`)}
            className="button button--secondary"
          >
            Voltar para perfil
          </button>
        </div>

      </div>
    </div>
  );
};

