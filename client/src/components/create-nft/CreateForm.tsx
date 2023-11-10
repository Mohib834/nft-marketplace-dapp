import Button from "../partials/Button";

export default function CreateForm() {
  return (
    <form className="max-w-[550px] mx-auto">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="bg-transparent shadow border-gray-700 appearance-none border rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="bg-transparent shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Description"
          rows={6}
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="bg-transparent shadow appearance-none border border-gray-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="text"
          placeholder="Price"
        />
      </div>

      <div className="flex gap-4 justify-end mt-8">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Create</Button>
      </div>
    </form>
  );
}
