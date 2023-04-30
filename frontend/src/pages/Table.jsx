import React from "react";

export default function Table(props) {
  const { tableData } = props;
  return (
    <div>
      <div className="flex justify-between items-center mt-4 ml-0 ">
        <select
          className="bg-gray-200 ml-4 px-3 py-2 rounded-md"
          onChange={props.handleLabChange}
        >
          <option value="all">All</option>
          <option value="Programming Lab - I (3rd Floor)">
            Programming Lab - I (3rd Floor)
          </option>
          <option value="Programming Lab- II (3rd Floor)">
            Programming Lab- II (3rd Floor)
          </option>
          <option value="Hardware Lab (3rd Floor)">
            Hardware Lab (3rd Floor)
          </option>
          <option value="Project Lab (2ndFloor)">Project Lab (2ndFloor)</option>
          <option value="PG Lab (Ground Floor)">PG Lab (Ground Floor)</option>
          <option value="Data Analytics Lab (2nd Floor)">
            Data Analytics Lab (2nd Floor)
          </option>
          <option value="Media Research Lab (Ground Floor)">
            Media Research Lab (Ground Floor)
          </option>
          <option value="Sensor Network Lab (3rd Floor)">
            Sensor Network Lab (3rd Floor)
          </option>
        </select>
      </div>
      <div className="relative overflow-x-scroll shadow-2xl sm:rounded-lg mb-4 mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-lg text-left table-auto">
            <thead className="text-lg text-gray-700 uppercase bg-gray-200 ">
              <tr>
                <th className="px-4 py-2 ">Lab Name</th>
                <th className="py-2 px-4 ">Students Per Setup</th>
                <th className="py-2 px-4 ">Odd Hours</th>
                <th className="py-2 px-4 ">Even Hours</th>
                <th className="py-2 px-4 ">Equipment Names</th>
                <th className="py-2 px-4 ">Utilization Status Odd</th>
                <th className="py-2 px-4 ">Utilization Status Even</th>
                <th className="py-2 px-4 ">Name</th>
                <th className="py-2 px-4 ">Designation</th>
                <th className="py-2 px-4 ">Qualification</th>
                <th className="py-2 px-4 ">Action</th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              {tableData
                .filter((data) => {
                  if (props.selectedLab === "all") return data;
                  else if (data.labName === props.selectedLab) return data;
                })
                .map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4 w-max">
                      <p className="w-max">{data.labName}</p>
                    </td>
                    <td className="py-2 px-4 w-max">
                      <p className="w-max">{data.studentPerSetup}</p>
                    </td>
                    <td className="py-2 px-4 w-max">{data.oddHours}</td>
                    <td className="py-2 px-4 w-max">{data.evenHours}</td>
                    <td className="py-2 px-4 w-max">
                      <ul className="m-1 max-h-96 overflow-y-scroll bg-gray-700 rounded-md">
                        {data.equipmentName.map((equipment, index) => (
                          <li
                            key={index}
                            className="bg-gray-100 p-2 rounded-md text-gray-800 m-2 w-max"
                          >
                            {equipment.name}
                            {equipment.subFields.map((subField, index) => (
                              <p
                                key={index}
                                className="bg-gray-100 p-2 m-4 rounded-md text-gray-800 w-max"
                              >
                                {"->"}
                                {subField.value}
                              </p>
                            ))}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4 w-max">
                      <ul className="m-1">
                        {data.utilizationStatusOdd.map((status, index) => (
                          <li
                            key={index}
                            className="bg-gray-100 p-2 rounded-md text-gray-800 w-max m-2"
                          >
                            {status.subjectName}
                            {"-"}
                            {status.subjectCode}
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="py-2 px-4 w-max">
                      <ul className="m-1">
                        {data.utilizationStatusEven.map((status, index) => (
                          <li
                            key={index}
                            className="bg-gray-100 p-2 rounded-md text-gray-800 w-max m-2"
                          >
                            {status.subjectName}
                            {"-"}
                            {status.subjectCode}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-2 px-4 w-max">
                      <p className="w-max">{data?.technicalStaff?.name}</p>
                    </td>
                    <td className="py-2 px-4 w-max">
                      <p className="w-max">
                        {data?.technicalStaff?.designation}
                      </p>
                    </td>
                    <td className="py-2 px-4 w-max">
                      <p className="w-max">
                        {data?.technicalStaff?.qualification}
                      </p>
                    </td>
                    <td className="py-2 px-4 w-max">
                      <button
                        onClick={() => props.handleDelete(data._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-3xl"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
