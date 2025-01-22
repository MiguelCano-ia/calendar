interface EventProps {
  event: {
    title: string;
    user: {
      name: string;
    };
  };
}

export const CalendarEvent = ({ event }: EventProps) => {
  const { title, user } = event;

  if (!user) {
    return <>{title}</>;
  }

  return (
    <>
      <strong>{title} -</strong>
      <span> {user.name}</span>
    </>
  );
};
