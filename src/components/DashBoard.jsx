import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authFetch, getUser } from "../auth";

// Triangle media kit: old rose #8a1538, gray #999999, light bg #f4f4f4
const features = [
  {
    to: "/events",
    title: "View events",
    body: "See every event with its image, location and description. Edit or delete an event right from the list.",
    action: "Open the event list",
  },
  {
    to: "/events/create",
    title: "Create an event",
    body: "Add a new event with a name, location, description and an optional image. It appears in the event list as soon as you save.",
    action: "Create an event",
  },
  {
    to: "/register",
    title: "Add a member",
    body: "Create a login for another brother. Each username must be unique, and the new member can sign in right away.",
    action: "Add a member",
  },
];

export default function Dashboard() {
  const user = getUser();
  const [eventCount, setEventCount] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadCount() {
      try {
        const res = await authFetch("/event/");
        if (!res.ok) return;
        const events = await res.json();
        if (!ignore) setEventCount(events.length);
      } catch (err) {
        console.error("Failed to load event count:", err);
      }
    }

    loadCount();
    return () => {
      ignore = true;
    };
  }, []);

  const sessionEnds = user?.exp
    ? new Date(user.exp * 1000).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <div>
      <header className="border-l-8 border-[#8a1538] pl-5 mb-8">
        <h1 className="text-3xl font-bold text-black">
          Welcome back{user?.userName ? `, ${user.userName}` : ""}
        </h1>
        <p className="text-[#555] mt-1">
          This is the Triangle member portal. Manage events and members from
          here.
        </p>
      </header>

      <dl className="grid gap-4 sm:grid-cols-2 mb-10">
        <div className="bg-[#f4f4f4] border-l-4 border-[#8a1538] p-4">
          <dt className="text-[#555]">Events in the portal</dt>
          <dd className="text-2xl font-bold text-black">
            {eventCount ?? "–"}
          </dd>
        </div>
        <div className="bg-[#f4f4f4] border-l-4 border-[#999999] p-4">
          <dt className="text-[#555]">Your session ends at</dt>
          <dd className="text-2xl font-bold text-black">
            {sessionEnds ?? "–"}
          </dd>
        </div>
      </dl>

      <section className="mb-10">
        <h2 className="text-xl font-bold text-[#8a1538] mb-4">
          What you can do here
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="block bg-[#f4f4f4] border-l-4 border-[#8a1538] p-5 hover:bg-[#e9e9e9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a1538]"
            >
              <h3 className="text-lg font-bold text-[#8a1538] mb-2">
                {f.title}
              </h3>
              <p className="text-black mb-4">{f.body}</p>
              <span className="font-bold text-black underline">{f.action}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[#999999] pt-6">
        <h2 className="text-xl font-bold text-[#8a1538] mb-2">Your session</h2>
        <p className="text-black max-w-prose">
          You stay signed in for one hour. After that you are sent back to the
          login page and need to sign in again. Use Logout when you finish on a
          shared computer.
        </p>
      </section>
    </div>
  );
}