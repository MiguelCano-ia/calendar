import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "John Doe",
      },
    });
    openDateModal();
  };

  return (
    <button
      type="button"
      className="btn btn-primary fab"
      onClick={handleClickNew}
      title="Add new event"
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};
