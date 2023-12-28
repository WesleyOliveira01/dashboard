import { IPopUp } from "@/interfaces/auth-interfaces";

const PopUp = ({ isError = false, sucess = false, message }: IPopUp) => {
  return (
    <>
      {isError && (
        <div className="absolute bottom-0 right-0 w-[20%] bg-red-400 border text-zinc-50 p-3 rounded-lg m-1 shadow-md font-semibold">
          {message}
        </div>
      )}
      {sucess && (
        <div className="absolute bottom-0 right-0 w-[20%] bg-green-400 border border-green-500 text-white p-3 rounded-lg">
          {message}
        </div>
      )}
    </>
  );
};

export default PopUp;
