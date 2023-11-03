import { useState, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  password: string;
}

const UsersTable = () => {
  const [usersData, setUsersData] = useState<User[] | null>(null);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("getUsersData > token", token);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("getUsersData > response", response);

        const data = await response.json();
        // console.log("getUsersData > data", data);

        data.forEach((entry) => {
          entry.password = `...${entry.password.slice(-16)}`;
        });

        setUsersData(data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsersData();
  }, []);

  const tableHeaders = usersData ? Object.keys(usersData[0]) : [];
  // console.log("tableHeaders", tableHeaders);

  return (
    <>
      {usersData && usersData.length > 0 && (
        <div className="users-table-container">
          <h2>"users" Table from the Database</h2>
          <p>fetched from the "/api/users" Protected API Route</p>
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.id}>
                  {tableHeaders.map((header) => (
                    <td key={header}>{user[header as keyof User]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UsersTable;
