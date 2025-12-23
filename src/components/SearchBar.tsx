import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { validateGitHubUsername } from "../services/githubApi";

interface SearchBarProps {
  initialValue?: string;
}

export const SearchBar = ({ initialValue = "" }: SearchBarProps) => {
  const [username, setUsername] = useState(initialValue);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim().toLowerCase();

    if (!trimmedUsername) {
      setError("Digite um username");
      return;
    }

    if (!validateGitHubUsername(trimmedUsername)) {
      setError("Username inválido. Use apenas letras, números e hífens");
      return;
    }

    setError("");
    navigate(`/user/${trimmedUsername}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-bar__container">
        <div className="search-bar__input-wrapper">
          <svg
            className="search-bar__icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            placeholder="Digite o username do GitHub"
            className="search-bar__input"
            data-testid="search-input"
          />
        </div>
        <button
          type="submit"
          disabled={!username.trim()}
          className="search-bar__button"
          data-testid="search-button"
        >
          Buscar
        </button>
      </div>
      {error && <p className="search-bar__error">{error}</p>}
    </form>
  );
};
