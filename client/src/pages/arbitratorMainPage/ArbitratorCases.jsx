import React, { useEffect, useState } from "react";
import styles from "../AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

const ArbitratorCases = () => {
  const role = useSelector((state) => state.role);
  const [arbitratorCaseData, setArbitratorCaseData] = useState([]);


let token=JSON.parse(localStorage.getItem("rechtechtoken"))



const getArbitratorCaseData = () => {
    axios
      .get("", {
        headers: {
          token: token, // Add the token to the Authorization header
        },
      })
      .then((res) => {
        console.log("caseOfArbitrator", res.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    getArbitratorCaseData();
  }, []);

  return (
    <div>
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
          {/* {caseData
              .map((arbitratior) => ( */}
          <tbody key="id">
            <tr className={styles.trbody}>
              <td data-label="ID">name</td>
              <td data-label="Email ID">emai_id</td>
              <td data-label="Contact No." className={styles.number}>
                contact_no
              </td>

              <td data-label="No. of assign Case">account_no</td>

              <td data-label="No. of assign Case">email status</td>

              <td data-label="No. of assign Case">text status</td>
            </tr>
          </tbody>
          {/* ))} */}
        </table>
      </div>
    </div>
  );
};

export default ArbitratorCases;
