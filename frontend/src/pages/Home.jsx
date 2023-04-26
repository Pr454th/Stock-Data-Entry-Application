import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table";

export default function Home() {
  const [formData, setFormData] = useState({
    labName: "",
    studentPerSetup: 0,
    oddHours: 0,
    evenHours: 0,
    equipmentName: [],
    utilizationStatusOdd: [],
    utilizationStatusEven: [],
    name: "",
    designation: "",
    qualification: "",
  });

  useEffect(() => {
    console.log("useEffect");
    axios.get("/api/").then((res) => {
      console.log(res.data);
      setTableData(res.data.reverse());
    });
  }, []);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [oddstatusfields, setOddStatusFields] = useState([
    {
      subjectName: "",
      subjectCode: "",
    },
  ]);
  const [evenstatusfields, setEvenStatusFields] = useState([
    {
      subjectName: "",
      subjectCode: "",
    },
  ]);

  const [equipmentfields, setEquipmentFields] = useState([
    { name: "", subFields: [{ value: "" }] },
  ]);

  const addField = () => {
    setEquipmentFields([
      ...equipmentfields,
      { name: "", subFields: [{ value: "" }] },
    ]);
  };

  const addSubField = (index) => {
    const newFields = [...equipmentfields];
    newFields[index].subFields?.push({ value: "" });
    setEquipmentFields(newFields);
  };

  const handleInputChange = (event, index, subIndex) => {
    const { name, value } = event.target;
    const newFields = [...equipmentfields];
    if (subIndex !== undefined) {
      newFields[index].subFields[subIndex][name] = value;
    } else {
      newFields[index][name] = value;
    }
    setEquipmentFields(newFields);
  };

  function handleAddOddStatusField() {
    const values = [...oddstatusfields];
    values.push({
      subjectName: "",
      subjectCode: "",
    });
    setOddStatusFields(values);
  }

  function handleAddOddStatus(e, index) {
    const values = [...oddstatusfields];
    if (e.target.name === "subjectName")
      values[index].subjectName = e.target.value;
    else values[index].subjectCode = e.target.value;
    setOddStatusFields(values);
  }
  function handleAddEvenStatusField() {
    const values = [...evenstatusfields];
    values.push({
      subjectName: "",
      subjectCode: "",
    });
    setEvenStatusFields(values);
  }

  function handleAddEvenStatus(e, index) {
    const values = [...evenstatusfields];
    if (e.target.name === "subjectName")
      values[index].subjectName = e.target.value;
    else values[index].subjectCode = e.target.value;
    setEvenStatusFields(values);
  }

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // const handleEdit = (target) => {
  //   setId(target._id);
  //   setStaffId(target.technicalStaff._id);
  //   setEquipmentFields(target.equipmentName);
  //   setStatusFields(target.utilizationStatus);
  //   setFormData({
  //     labName: target.labName,
  //     studentPerSetup: target.studentPerSetup,
  //     name: target.technicalStaff.name,
  //     designation: target.technicalStaff.designation,
  //     qualification: target.technicalStaff.qualification,
  //   });
  //   setUpdate(true);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let i = 0; i < equipmentfields.length; i++) {
      if (equipmentfields[i].name === "") {
        //want to remove the empty element from the array
        equipmentfields.splice(i, 1);
      } else {
        if (equipmentfields[i].subFields.length !== 0) {
          for (let j = 0; j < equipmentfields[i].subFields.length; j++) {
            if (equipmentfields[i].subFields[j].value === "") {
              //want to remove the empty element from the array
              equipmentfields[i].subFields.splice(j, 1);
            }
          }
        }
      }
    }
    formData.equipmentName = equipmentfields;
    formData.utilizationStatusOdd = oddstatusfields;
    formData.utilizationStatusEven = evenstatusfields;
    console.log(formData);
    axios.post("/api/", formData).then((res) => {
      axios.get("/api/").then((res) => {
        console.log(res.data);
        setTableData(res.data.reverse());
      });
    });
    setEvenStatusFields([
      {
        subjectName: "",
        subjectCode: "",
      },
    ]);
    setOddStatusFields([
      {
        subjectName: "",
        subjectCode: "",
      },
    ]);
    setEquipmentFields([{ name: "", subFields: [{ value: "" }] }]);
    setFormData({
      labName: "",
      studentPerSetup: 0,
      equipmentName: [],
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

  // const handleUpdate = () => {
  //   formData.equipmentName = equipmentfields;
  //   formData.utilizationStatus = statusfields;
  //   axios.put(`/api/${id}`, formData).then((res) => {
  //     axios.put(`/api/staff/${staffId}`, formData).then((res) => {
  //       axios.get("/api/").then((res) => {
  //         setTableData(res.data.reverse());
  //       });
  //     });
  //   });
  //   setEquipmentFields([""]);
  //   setStatusFields([""]);
  //   setFormData({
  //     labName: "",
  //     studentPerSetup: 0,
  //     equipmentName: [],
  //     utilizationStatus: [],
  //     name: "",
  //     designation: "",
  //     qualification: "",
  //   });
  //   setUpdate(false);
  // };

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
                htmlFor="studentPerSetup"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Number of Hourse in Odd semester
              </label>
              <input
                type="number"
                name="oddHours"
                value={formData.oddHours}
                onChange={handleChange}
                className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Number of Hourse in Even semester
              </label>
              <input
                type="number"
                name="evenHours"
                value={formData.evenHours}
                onChange={handleChange}
                className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="utilizationStatus"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Utilization Status Odd Semester
              </label>
              {oddstatusfields.map((field, index) => (
                <div className="flex items-center mb-3" key={index}>
                  <input
                    type="text"
                    name="subjectName"
                    value={field.subjectName}
                    onChange={(e) => handleAddOddStatus(e, index)}
                    className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                  />
                  <input
                    type="text"
                    name="subjectCode"
                    value={field.subjectCode}
                    onChange={(e) => handleAddOddStatus(e, index)}
                    className="outline-none ml-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                  />
                  {index === oddstatusfields.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddOddStatusField}
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
                Utilization Status Even Semester
              </label>
              {evenstatusfields.map((field, index) => (
                <div className="flex items-center mb-3" key={index}>
                  <input
                    type="text"
                    name="subjectName"
                    value={field.subjectName}
                    onChange={(e) => handleAddEvenStatus(e, index)}
                    className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                  />
                  <input
                    type="text"
                    name="subjectCode"
                    value={field.subjectCode}
                    onChange={(e) => handleAddEvenStatus(e, index)}
                    className="outline-none shadow-sm ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                  />
                  {index === evenstatusfields.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddEvenStatusField}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg ml-2"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div>
              {equipmentfields.map((field, index) => (
                <div key={index}>
                  <label
                    htmlFor={`field-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Equipment Name {index + 1}
                  </label>
                  <div className="flex items-center mt-3">
                    <input
                      type="text"
                      name="name"
                      value={field.name}
                      onChange={(e) => handleInputChange(e, index)}
                      className="outline-none shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                    />
                    <button
                      type="button"
                      onClick={() => addSubField(index)}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg ml-2"
                    >
                      {"+"}
                    </button>
                  </div>

                  {field?.subFields?.map((subField, subIndex) => (
                    <div key={`${index}-${subIndex}`} className="mt-4 ml-8">
                      <label
                        htmlFor={`field-${index}-sub-${subIndex}`}
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Sub {subIndex + 1}:
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={subField.value}
                        onChange={(e) => handleInputChange(e, index, subIndex)}
                        className="outline-none shadow-sm mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
                      />
                    </div>
                  ))}
                </div>
              ))}
              <button
                type="button"
                onClick={addField}
                className="bg-green-500 text-white px-3 py-2 rounded-lg mt-2"
              >
                Add Field
              </button>
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
            {update ? (
              <button
                type="button"
                onClick={handleUpdate}
                className="text-white bg-rose-700 hover:bg-purple-800 outline-none rounded-full text-md px-5 py-2.5 text-center mb-2"
              >
                Update Data
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-md px-5 py-2.5 text-center mb-2"
              >
                Add Data
              </button>
            )}
          </div>
        </form>
        <Table tableData={tableData} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
