'use client';

export default function CancelButton() {
  const cancelHandler = () => {

  }

  return (
    <button
      className={"block bg-dark-blue text-base text-white cursor-pointer rounded-full py-1 px-8 mt-3 mr-6 ml-auto mb-8"}
      onClick={cancelHandler}
    >
      Cancel
    </button>
  );
}