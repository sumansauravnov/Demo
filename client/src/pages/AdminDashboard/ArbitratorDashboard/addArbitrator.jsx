import { LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddArbitrator = () => {
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    contact: "",
    email: "",
    expertise: "",
    experience: "",
    about: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/autouid/arbitrator")
      .then((res) => setFormData({ ...formData, uid: res.data.uid }))
      .catch((err) => toast.error("Something went wrong"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      name: formData.name,
      contactNo: formData.contact,
      emailId: formData.email,
      areaOfExpertise: formData.expertise,
      experienceInYears: parseInt(formData.experience),
      about: formData.about,
      role: "arbitrator",
    };
    if (
      !obj.name ||
      !obj.emailId ||
      !obj.contactNo ||
      !obj.areaOfExpertise ||
      !obj.experienceInYears ||
      !obj.about
    ) {
      toast.error("All fields are required");
      return;
    }
    if (obj.contactNo.length != 10) {
      toast.error("Invalid contact number");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.emailId)) {
      toast.error("Invalid email address");
      return;
    }
    axios
      .post("http://localhost:3000/auth/register", obj)
      .then((res) => {
        toast.success("Arbitrator added successfully");
        setFormData({
          uid: "",
          name: "",
          contact: "",
          email: "",
          expertise: "",
          experience: "",
          about: "",
        });
      })
      .catch((err) => {
        toast.error("Failed to add arbitrator");
      });
  };

  return (
    <div className="w-[90%] ml-6 py-2 px-5">
      <div className="flex justify-between mb-6">
        <h2 className="font-bold">
          User {">"}
          {">"} Arbitrator{">"}
          {">"}Add
        </h2>
        <div className="bg-[#dcedfd] p-2 rounded-full">
          <LuUser className="text-xl" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
          <div>
            <input
              type="text"
              name="uid"
              disabled={true}
              value={formData.uid}
              onChange={handleChange}
              placeholder="122002"
              className="w-full p-2 border border-black placeholder:text-black placeholder:text-[14px]  focus:outline-none focus:ring-1 focus:ring-black bg-[#eef7fe]"
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border border-black placeholder:text-black placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-black bg-[#eef7fe]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
          <div>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact No."
              className="w-full p-2 border border-black placeholder:text-black placeholder:text-[14px]  focus:outline-none focus:ring-1 focus:ring-black bg-[#eef7fe]"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-black placeholder:text-black placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-black bg-[#eef7fe]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
          <div>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              placeholder="Area Of Expertise"
              className="w-full p-2 border border-black placeholder:text-black placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-black bg-[#eef7fe]"
            />
          </div>
          <div>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Experience in years"
              className="w-full p-2 border border-black placeholder:text-black placeholder:text-[14px] focus:outline-none focus:ring-1 focus:ring-black bg-[#eef7fe]"
            />
          </div>
        </div>

        <div>
          <h3 className="text-gray-600 mb-2 font-bold">About</h3>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            className="w-full bg-[#eef7fe] p-2 border border-black placeholder:text-black placeholder:text-[14px]  focus:outline-none focus:ring-1 focus:ring-black h-32 resize-none"
            placeholder="Max 500 Characters"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-1 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArbitrator;
