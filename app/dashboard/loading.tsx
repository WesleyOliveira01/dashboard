"use client";
import ReactLoading from "react-loading";
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[75vh] w-full">
      <ReactLoading color="#09090B" type="spin" width={50} height={20} />
    </div>
  );
};

export default Loading;
