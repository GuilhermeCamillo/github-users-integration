import type { GitHubUser } from "../types/github";

interface UserCardProps {
  user: GitHubUser;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <div className="user-card__header">
        <img
          src={user.avatar_url}
          alt={`Avatar de ${user.login}`}
          className="user-card__avatar"
        />
        <div className="user-card__info">
          <h1 className="user-card__name">{user.name || user.login}</h1>
          <p className="user-card__username">@{user.login}</p>
          {user.bio && <p className="user-card__bio">{user.bio}</p>}
          {user.location && (
            <p className="user-card__location">📍 {user.location}</p>
          )}
        </div>
      </div>
      <div className="user-card__stats">
        <div className="user-card__stat">
          <span className="user-card__stat-label">Seguidores</span>
          <span className="user-card__stat-value">{user.followers}</span>
        </div>
        <div className="user-card__stat">
          <span className="user-card__stat-label">Seguindo</span>
          <span className="user-card__stat-value">{user.following}</span>
        </div>
        <div className="user-card__stat">
          <span className="user-card__stat-label">Repositórios</span>
          <span className="user-card__stat-value">{user.public_repos}</span>
        </div>
      </div>
      {user.html_url && (
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="user-card__link"
        >
          Ver perfil no GitHub
        </a>
      )}
    </div>
  );
};
