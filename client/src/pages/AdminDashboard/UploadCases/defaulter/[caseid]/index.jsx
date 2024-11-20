import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import styles from "../../../ArbitratorDashboard/ArbitratorDashboard.module.css"

const DefaulterPage = () => {
  let { caseid } = useParams();
  const [caseData, setCaseData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/uploadcasedata/${caseid}`)
      .then((res) => {
        setCaseData(res.data.caseData.defaulters);
        console.log("defaulters", res.data.caseData.defaulters)
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, [caseid]);
  return (
    <div className="max-w-6xl mx-auto px-4 py-3">
       <div className=" flex justify-between items-center mb-4 bg-white p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500 flex items-center space-x-2">
            <Link to="/client/cases">

              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                Cases
              </span>
            </Link>
              <span>›</span>
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                FileDetails
              </span>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <LuUser className="text-blue-600 text-xl" />
          </div>
        </div>


        <div className="w-[90%] mx-auto mt-16">
      <table cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Phone No.</th>
                <th>Account No.</th>
                <th>Email Status</th>
                <th>Text Status</th>
              </tr>
            </thead>
            {caseData
              .map((arbitratior) => (
                <tbody key={arbitratior._id}>
                  <tr className={styles.trbody}>
                    <td data-label="ID">{arbitratior.name}</td>
                    <td data-label="Email ID">{arbitratior.emailId}</td>
                    <td data-label="Contact No." className={styles.number}>
                    {arbitratior.contactNo}
                    </td>
                    
                    <td data-label="No. of assign Case">
                    {arbitratior.accountNo}
                    </td>

                    <td data-label="No. of assign Case">
                    email status
                    </td>

                    <td data-label="No. of assign Case">
                    text status
                    </td>
                   
                  </tr>
                </tbody>
              ))}
          </table>
    </div>
    </div>
   
  );
};

export default DefaulterPage;
