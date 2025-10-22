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
        <option value="">همه وضعیت‌ها</option>
        <option value="pending">در انتظار</option>
        <option value="in-progress">در حال انجام</option>
        <option value="completed">انجام شده</option>
      </select>

      <input
        type="text"
        placeholder="جستجو بر اساس عنوان..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 rounded border flex-1"
      />
    </div>
  );
}