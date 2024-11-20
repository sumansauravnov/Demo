import React, { useEffect, useState } from "react";
import styles from "../AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { FcVideoCall } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const ArbitratorCases = () => {
  const navigate = useNavigate();
  const [arbitratorCaseData, setArbitratorCaseData] = useState([]);

  let token = JSON.parse(localStorage.getItem("rechtechtoken"));

  const getArbitratorCaseData = () => {
    axios
      .get("http://localhost:3000/uploadcasedata/arbitratorcases", {
        headers: {
          token: token, // Add the token to the Authorization header
        },
      })
      .then((res) => {
        setArbitratorCaseData(res.data.caseData);
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
              <th>File Name</th>
              <th>Uploaded Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {arbitratorCaseData.map((clientcase) => (
            <tbody key="id">
              <tr className={styles.trbody}>
                <td data-label="Name">{clientcase.clientName}</td>
                <td data-label="Email ID">{clientcase.clientEmail}</td>
                <td
                  data-label="File Nmae"
                  className={styles.number}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/defaulter/${clientcase._id}`)}
                >
                  {clientcase.fileName}
                </td>

                <td data-label="No. of assign Case">
                  {clientcase.uploadDate
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>

                <td data-label="No. of assign Case">
                  <FcVideoCall
                    style={{
                      color: "blue",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ArbitratorCases;
