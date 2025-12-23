import { Link } from "react-router-dom";
import type { GitHubRepository } from "../types/github";

interface RepositoryCardProps {
  repository: GitHubRepository;
  owner: string;
}

export const RepositoryCard = ({ repository, owner }: RepositoryCardProps) => {
  return (
    <div className="repository-card" data-testid="repository-card">
      <div className="repository-card__header">
        <Link
          to={`/user/${owner}/repo/${repository.name}`}
          className="repository-card__title"
          data-testid="repository-link"
        >
          {repository.name}
        </Link>
        {repository.private && (
          <span className="repository-card__badge">Privado</span>
        )}
      </div>
      {repository.description && (
        <p className="repository-card__description">{repository.description}</p>
      )}
      <div className="repository-card__stats">
        <div className="repository-card__stat">
          <span className="repository-card__stat-icon">⭐</span>
          <span>{repository.stargazers_count}</span>
        </div>
        <div className="repository-card__stat">
          <span className="repository-card__stat-icon">🍴</span>
          <span>{repository.forks_count}</span>
        </div>
        {repository.language && (
          <div className="repository-card__stat">
            <span className="repository-card__stat-icon">●</span>
            <span>{repository.language}</span>
          </div>
        )}
      </div>
      {repository.html_url && (
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="repository-card__link"
        >
          Ver no GitHub
        </a>
      )}
    </div>
  );
};
