import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import file uploading component
import FileUpload from "./FileUpload";

import { authFetch } from "../auth";

export default function Event() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null); // State for file upload
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      const response = await authFetch(
        `/event/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const event = await response.json();
      if (!event) {
        console.warn(`event with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(event);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // Send FormData instead of JSON so we can include an image
    const data = new FormData();
    data.append("name", form.name);
    data.append("location", form.location);
    data.append("description", form.description);

    // Only append the image if the user actually selected a new one
    if (imageFile) {
      data.append("image", imageFile); 
    }
    try {
      // if the id is present, we will set the URL to /event/:id, otherwise we will set the URL to /event.
      const response = await authFetch(`/event${params.id ? "/"+params.id : ""}`, {
        // if the id is present, we will use the PATCH method, otherwise we will use the POST method.
        method: `${params.id ? "PATCH" : "POST"}`,
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ name: "", position: "", description: "" });
      navigate("/events");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Event</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Event Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Event Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Meet the Brothers"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
              <div className="sm:col-span-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Location
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Reed 117"
                    value={form.location}
                    onChange={(e) => updateForm({ location: e.target.value })}
                  />
                </div>
              </div>
            </div>
              <div className="sm:col-span-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Description
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Join the Brothers of Triangle for a meet n' greet!"
                    value={form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                  />
                </div>
                <FileUpload 
                onFileSelect={(file) => setImageFile(file)} 
                existingImage={form.imagePath} 
                />
              </div>
              </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Event"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}