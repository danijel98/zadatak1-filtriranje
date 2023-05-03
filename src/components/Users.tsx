import React, { FC, useEffect, useState } from "react";
import moment from "moment";
import { Table } from "react-bootstrap";
import { FaSort} from "react-icons/fa";
import User from "../model/User";
import "./Users.css"

interface IUsers {
  users: User[];
}

const Users: FC<IUsers> = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "id",
    direction: "ascending",
  });

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleFilterByChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterBy(event.target.value);
  };

  const handleFilterValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterValue(event.target.value);
  };

  const sortedData = [...users].sort((a: User, b: User) => {
    if (sortConfig.direction === "") {
      return 0;
    }

    const [firstValue, secondValue] =
      sortConfig.direction === "ascending" ? [a, b] : [b, a];

    if (sortConfig.key === "birthdate") {
      const dateA = moment(firstValue.birthdate, "M/D/YYYY");
      const dateB = moment(secondValue.birthdate, "M/D/YYYY");

      return dateA.diff(dateB);
    }

    if (typeof firstValue[sortConfig.key] === "number") {
      return (
        (firstValue[sortConfig.key] as number) -
        (secondValue[sortConfig.key] as number)
      );
    }

    if (typeof firstValue[sortConfig.key] === "string") {
      return (firstValue[sortConfig.key] as string).localeCompare(
        secondValue[sortConfig.key] as string
      );
    }

    return 0;
  });

  const searchedData = sortedData.filter((person: User) =>
    Object.values(person).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  useEffect(() => {
    const filtered =
      filterBy && filterValue
        ? searchedData.filter((user) =>
            user[filterBy as keyof User]
              .toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          )
        : searchedData;
    setFilteredUsers(filtered);
  }, [searchedData, filterBy, filterValue]);

  return (
    <div className="App">
      <div className="container mt-3">
        <h1>Users List Demo</h1>
        <div className="form-group">
          <label htmlFor="filterValue">Search:</label>
          <input
            type="text"
            className="form-control"
            id="searchValue"
            value={searchValue}
            onChange={handleSearchValueChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="filterBy">Filter by:</label>
          <select
            className="form-control"
            id="filterBy"
            value={filterBy}
            onChange={handleFilterByChange}
          >
            <option value="">--Select--</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="email">Email</option>
            <option value="gender">Gender</option>
            <option value="zip">Zip Code</option>
            <option value="birthdate">Birthdate</option>
            <option value="city">City</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="filterValue">Filter:</label>
          <input
            type="text"
            className="form-control"
            value={filterValue}
            onChange={handleFilterValueChange}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID {sortConfig.direction && <FaSort />}
              </th>
              <th onClick={() => handleSort("firstName")}>
                First Name {sortConfig.direction && <FaSort />}
              </th>
              <th onClick={() => handleSort("lastName")}>
                Last Name {sortConfig.direction && <FaSort />}
              </th>
              <th onClick={() => handleSort("email")}>
                Email {sortConfig.direction && <FaSort />}
              </th>
              <th onClick={() => handleSort("gender")}>
                Gender {sortConfig.direction && <FaSort />}
              </th>
              <th onClick={() => handleSort("zip")}>
                Zip {sortConfig.direction && <FaSort />}
              </th>
              <th onClick={() => handleSort("birthdate")}>
                Birthdate {sortConfig.direction && <FaSort />}
              </th>
              <th onClick={() => handleSort("city")}>
                City {sortConfig.direction && <FaSort />}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((person: User) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.email}</td>
                <td>{person.gender}</td>
                <td>{person.zip}</td>
                <td>{person.birthdate}</td>
                <td>{person.city}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
