import { useState } from "react";
import "./App.css";
import Axios from "axios";
import { useSwipeable } from "react-swipeable";

function App() {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    age: "",
    country: "",
    position: "",
    Mage: "",
  });
  const uri = "http://localhost:3001";

  const [employeesList, setEmployeesList] = useState([]);

  const updateEmployee = (id, newWage) => {
    Axios.put(`${uri}/update`, { Mage: newWage, id: id }).then((response) => {
      setEmployeesList(
        employeesList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                age: val.age,
                country: val.country,
                position: val.position,
                Mage: newWage,
              }
            : val;
        })
      );
    });
  };

  const getEmployees = () => {
    Axios.get(`${uri}/employees`).then((response) => {
      setEmployeesList(response.data);
    });
  };

  const addEmployee = (e) => {
    e.preventDefault(); // ป้องกันการ refresh หน้าเว็บ
    Axios.post(`${uri}/create`, employeeData).then(() => {
      setEmployeesList((prevList) => [...prevList, employeeData]);
      setEmployeeData({
        name: "",
        age: "",
        country: "",
        position: "",
        wage: "",
      }); // reset form หลังจาก submit
    });
  };

  const formConfig = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      id: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter Age",
    },
    {
      id: "country",
      label: "Country",
      type: "text",
      placeholder: "Enter Country",
    },
    {
      id: "position",
      label: "Position",
      type: "text",
      placeholder: "Enter Position",
    },
    {
      id: "wage",
      label: "Wage",
      type: "number",
      placeholder: "Enter Wage",
    },
  ];

  const formGroupClass = "md-3";

  return (
    <>
      <div className="App-Container">
        <h1>Employee Information</h1>
        <div className="information">
          <form onSubmit={addEmployee}>
            {formConfig.map((form) => (
              <div key={form.id} className={formGroupClass}>
                <label htmlFor={form.id}>{form.label}</label>
                <input
                  type={form.type}
                  id={form.id}
                  className="form-control"
                  value={employeeData[form.id]}
                  onChange={(e) => {
                    setEmployeeData({
                      ...employeeData,
                      [e.target.id]: e.target.value,
                    });
                  }}
                  placeholder={form.placeholder}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-success">
              Add Employee
            </button>
          </form>
        </div>
        <hr />
        <div className="employees">
          <button className="btn btn-primary" onClick={getEmployees}>
            Show Employees
          </button>
          <div className="employee-card">
            <Employees employees={employeesList} />
          </div>
        </div>
      </div>
    </>
  );

  function Employees({ employees }) {
    const [newWage, setNewWage] = useState("");

    return employees.map((val, key) => (
      <div key={key} className="employee card">
        <div className="card-body text-left">
          <h5 className="card-title">Name: {val.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Age: {val.age}</h6>
          <p className="card-text">Country: {val.country}</p>
          <p className="card-text">Position: {val.position}</p>
          <p className="card-text">Wage: {val.Mage}</p>
        </div>
        <div className="d-flex">
          <input
            type="number"
            placeholder="Update Wage ...."
            className="form-control"
            onChange={(e) => setNewWage(e.target.value)}
          />
          <button
            className="btn btn-warning"
            onClick={() => updateEmployee(val.id, newWage)}
          >
            Update
          </button>
        </div>
      </div>
    ));
  }
}

export default App;
