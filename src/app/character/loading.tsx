'use client';

import { ThreeDots } from "react-loader-spinner";

export default function CharacterLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
          <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    </div> 
  );
}
