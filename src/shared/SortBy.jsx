const SortBy = ({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) => {
  return (
    <div style={{display: "flex"}}>
      
      <div style={{padding: "0 8px"}}>
        <label htmlFor="sortBy">Sort by: </label>

        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <option value="createdAt">Created At</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div style={{padding: "0 8px"}}>
        <label htmlFor="sortDirection">Order: </label>

        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default SortBy;