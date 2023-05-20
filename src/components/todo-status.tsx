import React from "react";

export const TodoStatus = ({status}:{status:boolean}) => {
  return (
    <>
      {status ? (
        <span className="text-green-500">Completada</span>
      ) : (
        <span className="text-neutral-400">Por hacer</span>
      )}
    </>
  );
};
