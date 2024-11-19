import axios from "axios";
import { FiEdit3 } from "react-icons/fi";
import styles from "../ArbitratorDashboard/ArbitratorDashboard.module.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const CaseDashboard = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3000/client/all")
      .then((res) => {
        console.log(res.data.user);
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-4 justify-between mt-5 mx-5">
        {/* Select for Bank Name */}
        <div className="flex-shrink-0 w-full sm:w-[20%]">
          <Select id="bank-name" className="w-full">
            <SelectTrigger className="w-full bg-blue-50">
              <SelectValue placeholder="Bank Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data.map((item) => (
                  <SelectItem key={item.uid} value={item.emailId}>
                    {item.emailId}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Select for Status */}
        <div className="border-0 flex-shrink-0 w-full sm:w-[20%]">
          <Select id="status" className="w-full">
            <SelectTrigger className="w-full bg-blue-50">
              <SelectValue placeholder="Bank Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data.map((item) => (
                  <SelectItem key={item.uid} value={item.emailId}>
                    {item.emailId}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Search Filename */}
        <div className="flex flex-shrink-0 w-full items-center sm:w-[20%] border rounded-xl p-2 bg-blue-50 border-gray-300">
          <input
            type="text"
            placeholder="Search Filename"
            className="flex-grow outline-none bg-transparent text-sm"
          />
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17.5 10.5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* Search Case Count */}
        <div className="flex flex-shrink-0 items-center sm:w-[20%] border rounded-xl p-2 bg-blue-50 border-gray-300">
          <input
            type="text"
            placeholder="Search Case Count"
            className="flex-grow outline-none bg-transparent text-sm"
          />
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17.5 10.5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <table cellSpacing="0">
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Case Name</th>
            <th>Case Count</th>
            <th>Uploaded Date</th>
            <th>ACtion</th>
          </tr>
        </thead>

        <tbody>
          <tr className={styles.trbody}>
            <td data-label="ID">id</td>
            <td data-label="Name">name</td>
            <td data-label="Contact No." className={styles.number}>
              hi
            </td>
            <td data-label="Email ID">email</td>
            <td data-label="Action">
              <FiEdit3
                style={{
                  color: "blue",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
                // onClick={() => handleOpen(arbitratior)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CaseDashboard;
