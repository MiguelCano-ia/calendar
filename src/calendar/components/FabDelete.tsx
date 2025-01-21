import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      type="button"
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      title="Add new event"
      style={{ display: hasEventSelected && !isDateModalOpen ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
