import styles from "./ArbitratorDashboard.module.css";
import { FiEdit3 } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import NoDataFound from "@/components/NoDataFound";

const ArbitratorDashboard = () => {
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  const [filterstatus, setFilterstatus] = useState("all");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" },
  ];

  const handleStatusSelect = (value, label) => {
    setSelectedStatus(label);
    setFilterstatus(value);
    setIsStatusOpen(false);
  };

  const getData = () => {
    axios
      .get("http://localhost:3000/arbitrator/all")
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
      <div className="w-[90%] flex justify-between mt-8 ml-12">
        <h1 className="text-[24px] font-bold">
          User {">"} {">"} Arbitrator
        </h1>
        <div className="bg-[#dcedfd] p-2 rounded-full">
          <LuUser className="text-xl" />
        </div>
      </div>

      {/* Search button */}
      {data.length == 0 ? (
        ""
      ) : (
        <div className="w-[80%] ml-12 mt-10 flex gap-8">
          <div className="w-[30%] flex items-center border rounded-md p-1 bg-blue-50 border-1 border-black">
            <input
              type="text"
              placeholder="Search here"
              className="flex-grow outline-none bg-transparent px-2 py-0.5 text-sm"
              onChange={(e) => setSearchdata(e.target.value)}
            />
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
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

          <div className="relative">
            <button
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="flex items-center justify-between w-32 px-4 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
            >
              <span>{selectedStatus}</span>
              {isStatusOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {isStatusOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                {statusOptions.map((option) => (
                  <div
                    key={option.value}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() =>
                      handleStatusSelect(option.value, option.label)
                    }
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Arbitrator */}
      <div className="flex justify-end w-[90%] mx-auto mt-10">
        <button className="bg-[#B9DCFD] hover:bg-blue-500 font-semibold text-[16px] p-2 text-black py-2 px-4 flex items-center gap-0 border-1 border-slate-950">
          <Link to={"/arbitrator/addarbitrator"}>
            <span>Add</span>
          </Link>
        </button>
      </div>

      {/* Table Data */}
      {data.length > 0 ? (
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact No.</th>
              <th>Email ID</th>
              <th>No. of assign Case</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {data
            .filter((item) => {
              if (item === "All") {
                return item;
              } else if (
                item.name.toLowerCase().includes(searchdata.toLowerCase()) ||
                item.contactNo
                  .toLowerCase()
                  .includes(searchdata.toLowerCase()) ||
                item.emailId.toLowerCase().includes(searchdata.toLowerCase())
              ) {
                return item;
              }
            })
            .filter((stat) => {
              if (filterstatus === "all") {
                return stat;
              } else if (filterstatus === "active") {
                return stat.status === true;
              } else {
                return stat.status === false;
              }
            })
            .map((arbitratior) => (
              <tbody key={arbitratior._id}>
                <tr className={styles.trbody}>
                  <td data-label="ID">{arbitratior._id?.slice(0, 5)}</td>
                  <td data-label="Name">{arbitratior.name}</td>
                  <td data-label="Contact No." className={styles.number}>
                    {arbitratior.contactNo}
                  </td>
                  <td data-label="Email ID">{arbitratior.emailId}</td>
                  <td data-label="No. of assign Case">
                    {arbitratior.noOfAssignCase}
                  </td>
                  <td data-label="Status" className={styles.status}>
                    {arbitratior.status === false ? "InActive" : "Active"}
                  </td>
                  <td data-label="Action">
                    <FiEdit3 style={{ color: "blue", fontSize: "24px" }} />
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default ArbitratorDashboard;
