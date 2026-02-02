import { useState } from "react";

export default function FileUpload({ onFileSelect, existingImage }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Create local URL for preview
      onFileSelect(file); // Pass file back to parent
    }
  };

  return (
    <div className="sm:col-span-4 mt-4">
      <label className="block text-sm font-medium leading-6 text-slate-900">
        Event Image
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {/* Show preview if new file selected, or existing image if editing */}
        {(preview || existingImage) && (
          <img
            src={preview || `http://localhost:5050/${existingImage}`}
            alt="Preview"
            className="h-24 w-24 object-cover rounded-lg border"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </div>
    </div>
  );
}