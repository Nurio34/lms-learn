import { useStudentContext } from "../../../../Context";
import { initialFilter } from "../../../../Context/hooks/useFilter";

function ResetFilterButton() {
  const { setFilter } = useStudentContext();

  const resetFilter = () => {
    setFilter(initialFilter);
  };

  return (
    <button
      type="button"
      className="c-btn self-end bg-[red] text-white w-full
            hover:bg-red-500
            "
      onClick={resetFilter}
    >
      Reset
    </button>
  );
}

export default ResetFilterButton;
