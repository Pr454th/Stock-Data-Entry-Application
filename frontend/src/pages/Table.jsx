import React from "react";

export default function Table(props) {
  const { tableData } = props;
  return (
    <div>
      <div className="relative overflow-x-auto shadow-2xl sm:rounded-lg mb-4 mt-4">
        <table className="w-full text-lg text-left ">
          <thead className="text-lg text-gray-700 uppercase bg-gray-200">
            <tr>
              <th className=" px-4 py-2">Lab Name</th>
              <th className="py-2 px-4 ">Students Per Setup</th>
              <th className="py-2 px-4 ">Equipments</th>
              <th className="py-2 px-4 ">Utilization Status</th>
              <th className="py-2 px-4 ">Name</th>
              <th className="py-2 px-4 ">Designation</th>
              <th className="py-2 px-4 ">Qualification</th>
              <th className="py-2 px-4 ">Action</th>
            </tr>
            <tr></tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 ">{data.labName}</td>
                <td className="py-2 px-4 ">{data.studentPerSetup}</td>
                <td className="py-2 px-4 ">
                  <ul className="grid grid-cols-1 gap-2">
                    {data.equipmentName.map((equipment, index) => (
                      <li
                        key={index}
                        className="bg-gray-100 p-2 rounded-md text-gray-800"
                      >
                        {equipment}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 ">
                  <ul className="grid grid-cols-1 gap-2">
                    {data.utilizationStatus.map((status, index) => (
                      <li
                        key={index}
                        className="bg-gray-100 p-2 rounded-md text-gray-800"
                      >
                        {status}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 ">{data?.technicalStaff?.name}</td>
                <td className="py-2 px-4 ">
                  {data?.technicalStaff?.designation}
                </td>
                <td className="py-2 px-4 ">
                  {data?.technicalStaff?.qualification}
                </td>
                <td className="py-2 px-4 ">
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
  );
}
