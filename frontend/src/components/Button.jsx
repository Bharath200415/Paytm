export const Button = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5  text-white bg-black hover:bg-gray-800 focus:ring-1 focus:ring-neutral-50 font-medium rounded-lg text-md px-5 py-2.5"
    >
      {label}
    </button>
  );
};
