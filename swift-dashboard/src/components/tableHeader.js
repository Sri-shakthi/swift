const fields = ['postId', 'name', 'email'];

const TableHeader = ({ sortConfig, setSortConfig }) => {
  const handleSort = (field) => {
    if (!sortConfig || sortConfig.field !== field) {
      setSortConfig({ field, direction: 'asc' });
    } else if (sortConfig.direction === 'asc') {
      setSortConfig({ field, direction: 'desc' });
    } else if (sortConfig.direction === 'desc') {
      setSortConfig(null);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          {fields.map(field => (
            <th key={field} onClick={() => handleSort(field)}>
              {field.toUpperCase()}
              {sortConfig?.field === field && ` (${sortConfig.direction})`}
            </th>
          ))}
          <th>BODY</th>
        </tr>
      </thead>
    </table>
  );
};

export default TableHeader;
