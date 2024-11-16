import styles from "./ArbitratorDashboard.module.css";
import { FiEdit3 } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";


const ArbitratorDashboard = () => {





  
  return (
    <>
<div className="w-[90%] flex justify-between mt-4 ml-12">
  <h1 className="text-[24px] font-bold">User {">"} {">"} Arbitrator</h1>
  <div>
  <FaRegCircleUser style={{fontSize:"24px", background:"#B9DCFD", borderRadius:"10px"}}/>
</div>
</div>


    {/* Search button */}
    <div className="w-[80%] ml-12 mt-10">
      <div className="w-[30%] flex items-center border rounded-md p-1 bg-blue-50 border-1 border-black">
        <input
          type="text"
          placeholder="Search here"
          className="flex-grow outline-none bg-transparent px-2 py-0.5 text-sm"
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

    </div>

    {/* Add Arbitrator */}
    <div className="flex justify-end w-[90%] mx-auto mt-10">
      <button className="bg-[#B9DCFD] hover:bg-blue-500 font-semibold text-[16px] p-2 text-black py-2 px-4 flex items-center gap-0 border-1 border-slate-950">
        <span>Add</span>
      </button>
    </div>

    {/* Table Data */}

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
      <tbody>
        <tr className={styles.trbody}>
          <td data-label="ID">Borem Ipsum</td>
          <td data-label="Name">Lorem Ipsum</td>
          <td data-label="Contact No." className={styles.number}>
            1234567898
          </td>
          <td data-label="Email ID">suman.saurav@reqarz.com</td>
          <td data-label="No. of assign Case">10</td>
          <td data-label="Status" className={styles.status}>
            Active
          </td>
          <td data-label="Action">
            <FiEdit3 style={{ color: "blue", fontSize: "24px" }} />
          </td>
        </tr>

        <tr className={styles.trbody}>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  </>
  );
};

export default ArbitratorDashboard;
