import { addHours, differenceInSeconds } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCalendarStore, useUiStore } from "../../hooks";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import { useAuthStore } from "../../auth/hooks";

const schema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 character(s)" })
    .max(50, { message: "Title must contain at most 50 character(s)" }),
  notes: z
    .string()
    .max(500, { message: "Notes must contain at most 500 character(s)" })
    .optional(),
  start: z.date(),
  end: z.date(),
});

type FormFields = z.infer<typeof schema>;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { user } = useAuthStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (activeEvent !== null) {
      reset({ ...activeEvent });
    }
  }, [activeEvent]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const diff = differenceInSeconds(data.end, data.start);

    if (diff <= 0) {
      setError("end", { message: "End date must be after start date" });
      return;
    }

    await startSavingEvent({
      ...data,
      id: activeEvent?.id || undefined,
      notes: data.notes ?? "",
      bgColor: "#fafafa",
      user: { uid: user?.uid || "", name: user?.name || "" },
    });
    closeDateModal();
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <hr />
      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          <label>Start date and time:</label>
          &nbsp;
          <DatePicker
            minDate={new Date()}
            selected={watch("start")}
            onChange={(date) => setValue("start", date as Date)}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            wrapperClassName="w-100"
          />
          {errors.start && (
            <div className="text-danger mt-1">{"Start date is required"}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>End date and time</label>
          <DatePicker
            minDate={watch("start")}
            selected={watch("end")}
            onChange={(date) => setValue("end", date as Date)}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            wrapperClassName="w-100"
          />
          {errors.end && (
            <div className="text-danger mt-1">{errors.end.message}</div>
          )}
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title and notes</label>
          <input
            type="text"
            className="form-control"
            placeholder="Title of the event"
            autoComplete="off"
            {...register("title")}
          />
          {errors.title ? (
            <div className="text-danger mt-1">{errors.title.message}</div>
          ) : (
            <small id="emailHelp" className="form-text text-muted">
              Short description
            </small>
          )}
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notes"
            rows={5}
            {...register("notes")}
          ></textarea>
          {errors.notes ? (
            <div className="text-danger mt-1">{errors.notes.message}</div>
          ) : (
            <small id="emailHelp" className="form-text text-muted">
              Additional information
            </small>
          )}
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          &nbsp;
          <span>Save</span>
        </button>
      </form>
    </Modal>
  );
};
