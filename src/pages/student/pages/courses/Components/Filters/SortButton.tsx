import { sortOptions } from "../../../../../../config";
import { useStudentContext } from "../../../../Context";
import { SortType } from "../../../../Context/hooks/useSort";

function SortButton() {
  const { sort, setSort } = useStudentContext();

  return (
    <select
      className="border-2 self-start border-primary shadow-primary shadow-lg py-1 px-3 rounded-md"
      defaultValue={sort}
      onChange={(e) => {
        setSort(e.target.value as SortType);
      }}
    >
      <option value="" disabled>
        Sort by
      </option>
      {sortOptions.map((sortOption) => (
        <option key={sortOption.id} value={sortOption.id}>
          {sortOption.label}
        </option>
      ))}
    </select>
  );
}

export default SortButton;
