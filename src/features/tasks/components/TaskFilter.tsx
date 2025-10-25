interface Props {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function TaskFilter({
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 text-black" >
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="p-2 rounded border"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">اCompleted</option>
      </select>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 rounded border flex-1"
      />
    </div>
  );
}
