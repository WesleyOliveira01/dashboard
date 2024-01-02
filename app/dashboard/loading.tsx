import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[75vh] w-full">
      <MoonLoader color="#09090B" size={25} speedMultiplier={0.5} />
    </div>
  );
};

export default Loading;
