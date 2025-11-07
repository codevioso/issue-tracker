"use client"; // if you're using App Router (Next.js 13+)
import { useForm } from "react-hook-form";

type defectForm = {
  module: string;
  useCase: string;
  preconditions: string;
  steps: string;
  expectedResult: string;
  priority: string;
  owner: string;
  status: string;
  defectId: string;
  notes: string;
};
export default function DefectForm() {
  const { register, handleSubmit, reset } = useForm<defectForm>();

  const onSubmit = async (data: defectForm) => {
    try {
      const response = await fetch(
        "http://localhost:5678/webhook-test/9ca20332-a65b-4eb6-8f4b-76ed1e9a731a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Success:", result);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit data.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Defect Tracking Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Module</label>
            <input
              {...register("module")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Enter module name"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Use Case / Scenario
            </label>
            <input
              {...register("useCase")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Describe the use case"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Preconditions
            </label>
            <textarea
              {...register("preconditions")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="List any preconditions"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Steps</label>
            <textarea
              {...register("steps")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Describe steps to reproduce"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Expected Result
            </label>
            <textarea
              {...register("expectedResult")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="What should happen?"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Priority</label>
            <select
              {...register("priority")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Owner</label>
            <input
              {...register("owner")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Enter owner name"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Status</label>
            <select
              {...register("status")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
            >
              <option value="">Select status</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Defect ID / Link
            </label>
            <input
              {...register("defectId")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Enter defect ID or link"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Notes</label>
            <textarea
              {...register("notes")}
              className="w-full mt-1 border border-gray-300 rounded-md p-2"
              placeholder="Additional notes"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
