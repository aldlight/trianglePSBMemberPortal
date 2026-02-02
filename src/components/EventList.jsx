import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Event = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.event.name}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.event.location}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      {props.event.description}
    </td>
    <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/events/edit/${props.event._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteEvent(props.event._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function DisplayEvents() {
  const [events, setEvents] = useState([]);

  // This method fetches the events from the database.
  useEffect(() => {
    async function getEvent() {
      const response = await fetch(`http://localhost:5050/event/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const fetchedEvents = await response.json();
      setEvents(fetchedEvents);
    }
    getEvent();
    return;
  }, [events.length]);

  // This method will delete a event
  async function deleteEvent(id) {
    await fetch(`http://localhost:5050/event/${id}`, {
      method: "DELETE",
    });
    const newevents = events.filter((el) => el._id !== id);
    setEvents(newevents);
  }

  // This method will map out the events on the table
  function displayEvents() {
    return events.map((event) => {
      return (
        <Event
          event={event}
          deleteEvent={() => deleteEvent(event._id)}
          key={event._id}
        />
      );
    });
  }

  // This following section will display the table with the events of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Triangle Events</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Location
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Description
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {displayEvents()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}