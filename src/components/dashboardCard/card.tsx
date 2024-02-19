import React, { PropsWithChildren } from "react";

const DashboardCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="shadow-dashboard-card-shadow w-[90%] py-7 md:py-5 sm:px-5 md:px-10 md:w-auto rounded-dashboard-card bg-dashboard-card m-[10px] flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default DashboardCard;
