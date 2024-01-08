import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[75vh] w-full">
      <ScaleLoader color="#09090B" radius={2} width={6} />
    </div>
  );
};

export default Loading;
