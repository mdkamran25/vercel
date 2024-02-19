import LoadingButton from "../loadingButton/loadingButton";

export default function FormAction({
  apiResponse,
  handleSubmit,
  loading,
  buttonType = "Button",
  text,
}: Partial<FormActionsProps>) {
  return (
    <>
      {buttonType === "Button" ? (
        <button
          disabled={loading}
          type={"submit"}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-6"
          onSubmit={handleSubmit}
        >
          {loading ? (
            <LoadingButton/>
          ) : (
            text
          )}
        </button>
      ) : (
        <></>
      )}
      {apiResponse?.message && (
        <p
          className={`m-1 font-medium text-md ${
            apiResponse?.status ? "text-green-500" : "text-red-600"
          }`}
        >
          {apiResponse?.message}
        </p>
      )}
    </>
  );
}
