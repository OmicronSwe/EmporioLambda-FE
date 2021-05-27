import React from "react";

const DashboardLinks = () => {
  return (
    <div className="row justify-content-center">
      <div>
        <h1 className="text-center mb-3">Admin Links</h1>
        <ul className="list-inline">
          <li key="1">
            <a href="https://vercel.com/dashboard">Vercel Dashboard</a>
          </li>
          <li key="2">
            <a href="https://eu-central-1.console.aws.amazon.com/console/home?region=eu-central-1#">
              AWS Services
            </a>
          </li>
          <li key="3">
            <a href="https://github.com/OmicronSwe/EmporioLambda-FE">Github page - front-end</a>
          </li>
          <li key="4">
            <a href="https://github.com/OmicronSwe/EmporioLambda-BE">Github page - back-end</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLinks;
