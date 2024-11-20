import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const DefaulterPage = () => {
  let { caseid } = useParams();
  const [caseData, setCaseData] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/uploadcasedata/${caseid}`)
      .then((res) => {
        setCaseData(res.data.caseData);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  }, [caseid]);
  return (
    <div>
      <h2>hey</h2>
    </div>
  );
};

export default DefaulterPage;
