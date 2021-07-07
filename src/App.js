import React, {useState} from 'react';
import service from './data.js';
import Table from "./components/Table";
import WrapperEdit from "./components/WrapperEdit";

export const HIDDEN_COLUMN = 'HIDDEN_COLUMN';


const App = () => {

    const employees = service.getEmployees();
    const [mapEmployeesToActiveNameColumns, setMapEmployeesToActiveNameColumns] = useState([
        {key: "Employee", value: "qweqweq qwe qweqew qweqwe"},
        {key: "ID", value: "ID"},
        {key: "Position", value: "Position"},
        {key: "BirthDate", value: "BirthDate"},
        {key: "HireDate", value: "HireDate"},
        {key: "Address", value: "Address"},
        {key: "City", value: "City"},
        {key: "State", value: "State"},
        {key: "Zipcode", value: "Zipcode"},
        {key: "Email", value: "Email"},
        {key: "Skype", value: "Skype"},
        {key: "HomePhone", value: "HomePhone"},
        {key: "DepartmentID", value: "DepartmentID"},
        {key: "MobilePhone", value: "MobilePhone"}
    ])

    return <div>
        <Table
            employees={employees}
            mapEmployeesToActiveNameColumns={mapEmployeesToActiveNameColumns}
        />
        <WrapperEdit
            mapEmployeesToActiveNameColumns={mapEmployeesToActiveNameColumns}
            setMapEmployeesToActiveNameColumns={setMapEmployeesToActiveNameColumns}
        />
    </div>


}

export default App;
