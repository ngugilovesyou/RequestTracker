import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { submitRequest } from '../api';

const REQUEST_TYPES = [
  'Bug',
  'Feature Request',
  'General Feedback',
  'Partnership',
  'Other',
];

const PRIORITIES = ['Low', 'Medium', 'High'];

const inputClass =
  'w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition';

const labelClass =
  'text-[0.8125rem] font-medium text-gray-700';

function RequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);

      const requestData = Object.fromEntries(
        formData.entries()
      );

      const response = await submitRequest(requestData);

      if (response) {
        toast.success('Request submitted successfully!');

        e.target.reset();
      } else {
        toast.error('Failed to submit request.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="bg-white w-full max-w-xl rounded-xl border border-slate-200 shadow-sm p-10">
        <h2 className="text-[1.375rem] font-bold text-slate-900 mb-4">
          Request Form
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <input
                required
                type="text"
                id="username"
                name="username"
                placeholder="johndoe"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <label htmlFor="product_company" className={labelClass}>
                Product / Company
              </label>
              <input
                required
                type="text"
                id="product_company"
                name="product_company"
                placeholder="Acme Inc."
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="request_type" className={labelClass}>
                Request Type
              </label>
              <select
                id="request_type"
                name="request_type"
                className={inputClass}
                defaultValue="Bug"
              >
                {REQUEST_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="priority" className={labelClass}>
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className={inputClass}
                defaultValue="Medium"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 flex flex-col gap-1.5">
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                required
                id="message"
                name="message"
                rows={5}
                placeholder="Add any additional context or details here..."
                className={`${inputClass} resize-y leading-relaxed`}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
              }`}
            >
              {isSubmitting
                ? 'Submitting...'
                : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestForm;