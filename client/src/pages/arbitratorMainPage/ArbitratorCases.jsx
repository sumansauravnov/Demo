import React, { useEffect, useState } from "react";
import styles from "../AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { FcStart, FcVideoCall } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

const ArbitratorCases = () => {
  const navigate = useNavigate();
  const [arbitratorCaseData, setArbitratorCaseData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectStartDate, setSelectStartDate] = useState(new Date());
  const [selectEndDate, setSelectEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingStatus, setMeetingStatus] = useState(false);
  const [caseId, setCaseId] = useState("");

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
  
  useEffect(() => {
    if (isOpen) {
      setCaseId("");
      setTitle("");
      setDescription("");
      setSelectStartDate(Date);
      setSelectEndDate(Date);
    }
  }, [isOpen]);

  const handleMeetingModal = (id) => {
    setCaseId(id);
    if (meetingStatus === false) {
      setIsOpen(true);
    } else {
      toast.success("Link Copied!");
    }
  };

  function getformayyeddatetime(dates) {
    const inputDate = new Date(dates);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
    const day = String(inputDate.getDate()).padStart(2, "0");
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    const seconds = String(inputDate.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const handleScheduleFunc = () => {
    const startdate = getformayyeddatetime(selectStartDate);
    const enddate = getformayyeddatetime(selectEndDate);
    console.log("start", startdate);
    console.log("end", enddate);
    // setIsOpen(true);
    setTitle("");
    setDescription("");
    setSelectStartDate(Date);
    setSelectEndDate(Date);
    setIsOpen(false);
    setCaseId("");
  };

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
            <tbody key={clientcase._id}>
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

                <td
                  data-label="Meeting Schedule"
                  style={{
                    color: "blue",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMeetingModal(clientcase._id)}
                >
                  {!meetingStatus ? (
                    <FcVideoCall />
                  ) : (
                    <HoverCard>
                      <HoverCardTrigger>
                        <FcStart />
                      </HoverCardTrigger>
                      <HoverCardContent className="text-sm">
                        Start Meeting
                      </HoverCardContent>
                    </HoverCard>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Schedule Meeting
            </DialogTitle>
            <div className="space-y-4">
              <DialogDescription className="text-sm text-gray-600">
                <Label className="block text-sm font-medium text-gray-700">
                  Title:
                </Label>
                <Input
                  type="text"
                  className="mt-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </DialogDescription>
              <DialogDescription className="text-sm text-gray-600">
                <Label className="block text-sm font-medium text-gray-700">
                  Description:
                </Label>
                <Textarea
                  type="text"
                  className="mt-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </DialogDescription>
            </div>
          </DialogHeader>

          <DialogHeader className="space-y-4">
            {/* Start Date Picker */}
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Time
            </DialogTitle>
            <div className="flex gap-10 items-center">
              <Label className="text-sm font-medium text-gray-700 my-2">
                Start Date and Time
              </Label>
              <DatePicker
                selected={selectStartDate}
                onChange={(date) => setSelectStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()}
                minTime={new Date().setHours()}
                customInput={<Input type="datetime" />}
              />
            </div>

            {/* End Date Picker */}
            <div className="flex gap-11 items-center">
              <Label className="text-sm font-medium text-gray-700 my-2">
                End Date and Time
              </Label>
              <DatePicker
                selected={selectEndDate}
                onChange={(date) => setSelectEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={selectStartDate || new Date()}
                customInput={<Input type="datetime" />}
              />
            </div>
          </DialogHeader>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleScheduleFunc}
            >
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArbitratorCases;
