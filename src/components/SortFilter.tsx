import type { SortOption, SortDirection } from "../types/github";

interface SortFilterProps {
  sort: SortOption;
  direction: SortDirection;
  onSortChange: (sort: SortOption) => void;
  onDirectionChange: (direction: SortDirection) => void;
}

export const SortFilter = ({
  sort,
  direction,
  onSortChange,
  onDirectionChange,
}: SortFilterProps) => {
  return (
    <div className="sort-filter">
      <label className="sort-filter__label">
        Ordenar por:
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="sort-filter__select"
          data-testid="sort-select"
        >
          <option value="stars">Estrelas</option>
          <option value="name">Nome</option>
          <option value="updated">Atualizado</option>
          <option value="created">Criado</option>
        </select>
      </label>
      <label className="sort-filter__label">
        Direção:
        <select
          value={direction}
          onChange={(e) => onDirectionChange(e.target.value as SortDirection)}
          className="sort-filter__select"
          data-testid="direction-select"
        >
          <option value="desc">Decrescente</option>
          <option value="asc">Crescente</option>
        </select>
      </label>
    </div>
  );
};
