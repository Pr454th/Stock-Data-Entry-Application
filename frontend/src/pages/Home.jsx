import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

export default function Home() {
  const [formData, setFormData] = useState({
    labName: "",
    studentPerSetup: 0,
    equipmentName: [],
    utilizationStatus: [],
    name: "",
    designation: "",
    qualification: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/").then((res) => {
      console.log(res.data);
      setTableData(res.data.reverse());
    });
  }, []);

  const [tableData, setTableData] = useState([]);
  const [statusfields, setStatusFields] = useState([""]);
  const [equipmentfields, setEquipmentFields] = useState([""]);

  function handleAddStatusField() {
    const values = [...statusfields];
    values.push("");
    setStatusFields(values);
  }

  function handleAddStatus(e, index) {
    const values = [...statusfields];
    values[index] = e.target.value;
    setStatusFields(values);
  }

  function handleAddEquipmentField() {
    const values = [...equipmentfields];
    values.push("");
    setEquipmentFields(values);
  }

  function handleAddEquipment(e, index) {
    const values = [...equipmentfields];
    values[index] = e.target.value;
    setEquipmentFields(values);
  }

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    formData.equipmentName = equipmentfields;
    formData.utilizationStatus = statusfields;
    axios.post("/api/", formData).then((res) => {
      axios.get("/api/").then((res) => {
        setTableData(res.data.reverse());
      });
    });
    setEquipmentFields([""]);
    setStatusFields([""]);
    setFormData({
      labName: "",
      studentPerSetup: 0,
      equipmentName: [],
      utilizationStatus: [],
      name: "",
      designation: "",
      qualification: "",
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/${id}`).then((res) => {
      axios.get("/api/").then((res) => {
        setTableData(res.data.reverse());
      });
    });
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-600 from-purple-400">
            Stock{" "}
          </span>
          Data Entry
        </h1>
        <form onSubmit={handleSubmit} className="shadow-xl p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="labName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lab Name
              </label>
              <input
                type="text"
                name="labName"
                value={formData.labName}
                onChange={handleChange}
                className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="studentPerSetup"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Students Per Setup
              </label>
              <input
                type="number"
                name="studentPerSetup"
                value={formData.studentPerSetup}
                onChange={handleChange}
                className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="equipmentName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Equipment Name
              </label>
              {equipmentfields.map((field, index) => (
                <div className="flex items-center mb-3" key={index}>
                  <input
                    type="text"
                    value={field}
                    onChange={(e) => handleAddEquipment(e, index)}
                    className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                  />
                  {index === equipmentfields.length - 1 && (
                    <button
                      onClick={handleAddEquipmentField}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg ml-2"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="utilizationStatus"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Utilization Status
              </label>
              {statusfields.map((field, index) => (
                <div className="flex items-center mb-3" key={index}>
                  <input
                    type="text"
                    value={field}
                    onChange={(e) => handleAddStatus(e, index)}
                    className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                  />
                  {index === statusfields.length - 1 && (
                    <button
                      onClick={handleAddStatusField}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg ml-2"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl text-blue-700">Technical Staff Details</h2>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="designation"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="qualification"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-md px-5 py-2.5 text-center mb-2"
            >
              Add Data
            </button>
          </div>
        </form>
        <Table tableData={tableData} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
