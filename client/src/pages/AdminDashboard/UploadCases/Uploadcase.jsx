import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CaseDashboard from "./CaseDashboard";

const Uploadcase = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (newValue) => {
    setSelectedOption(newValue);
    console.log("Selected:", newValue);
  };

  const handleUploadFunction = () => {
    setIsOpen(true);
  };

  const handleUpload = () => {
    console.log("Uploading file...");
  };

  const formattedDate = useMemo(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    console.log(`Day: ${day}, Month: ${monthNames[month]}, Year: ${year}`);
    return `${day} ${monthNames[month]} ${year}`;
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3000/client/all")
      .then((res) => {
        console.log(res.data.user);
        const formattedOptions = res.data.user.map((user) => ({
          value: user.emailId,
          label: user.emailId,
        }));
        setData(formattedOptions);
        setOptions(formattedOptions);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error("Failed to fetch client data");
      });
  };

  const filterOptions = (inputValue) => {
    return data.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleInputChange = (inputValue) => {
    const filteredOptions = filterOptions(inputValue);
    setOptions(filteredOptions);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-end mr-2">
        <div className="block border-2 border-dashed w-[50%] md:w-[20%] lg:w-[20%] mt-5">
          <h1 className="text-center mt-1">Upload Case Details</h1>
          <div className="text-center p-5">
            <button
              className="bg-indigo-500 p-2 rounded-sm text-white"
              onClick={handleUploadFunction}
            >
              File Upload
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              File Details
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              <p>
                File Name:{" "}
                <span className="font-medium text-gray-800">Excel</span>
              </p>
              <p>
                Date:{" "}
                <span className="font-medium text-gray-800">
                  {formattedDate}
                </span>
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            {/* Email Input */}
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 sm:col-span-1"
              >
                Client Email
              </Label>
              <div className="sm:col-span-3">
                <CreatableSelect
                  options={options}
                  value={selectedOption}
                  onChange={handleChange}
                  onInputChange={handleInputChange}
                  placeholder="Search for an email..."
                  isSearchable
                  filterOption={null}
                  className="text-sm"
                  isValidNewOption={() => false}
                  noOptionsMessage={() => "No matching email found"}
                />
                {selectedOption && (
                  <p className="text-sm text-green-600 mt-1">
                    You selected: {selectedOption.label}
                  </p>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="flex flex-col">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Excel File <span className="text-red-500">*</span>
              </Label>
              <label
                htmlFor="uploadFile1"
                className="w-[200px] md:w-[300px] ml-[100px] md:ml-[120px] lg:ml-[120px] mt-[-15px] bg-white text-gray-500 font-semibold text-base rounded h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file
                <input type="file" id="uploadFile1" className="hidden" />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  Only .xlsx file is Allowed.
                </p>
              </label>
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              onClick={handleUpload}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CaseDashboard />
    </>
  );
};

export default Uploadcase;
