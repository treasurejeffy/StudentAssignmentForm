import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, Table } from "react-bootstrap";
import { Markdown, WindowDash } from "react-bootstrap-icons";
import ShowAssignmentsCss from './showassignment.module.css'
import unpassed from './icons8-question-mark-48.png'

export default function ShowAssignments() {
    // State to store data retrieved from sessionStorage
    const [sessionStorageItems, setSessionStorageItems] = useState([]);

    // useEffect to run once on component mount
    useEffect(() => {
        // Retrieve items from sessionStorage
        const storedData = sessionStorage.getItem('key');

        //  Parse JSON to set it to state
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Set items to state
            setSessionStorageItems(parsedData);
        }
    }, []);

    // Remove the first object from the array (index 0)
    let newArrayOfObjects = sessionStorageItems.slice(1);

    console.log(newArrayOfObjects);

    // Function to filter data based on the type (classWork or homeWork)
    const filterData = (type) => {
        return newArrayOfObjects.filter(data => data.checkBox === type);
    };

    return (
        <div>
            <Container>
                <h1 className={`${ShowAssignmentsCss.header} table-responsive text-center pt-5`}>CONTINUOUS ASSESSMENTS DETAILS</h1>
                {/* Render the Classwork Table */}            
                <Table striped bordered hover>
            <thead>
                <tr>
                    <th scope="row" > Topic 1</th>
                </tr>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Reg No.</th>
                    <th scope="col">Links</th>
                    <th scope="col">Classwork</th>
                    <th>Homework</th>
                    {/* Add other table headers based on your data structure */}
                </tr>                
            </thead>
            <tbody>
                {newArrayOfObjects.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.regNos}</td>
                        <td>{item.links}</td>
                        {/* Add other table cells based on your data structure */}
                    </tr>
                ))}
            </tbody>
        </Table>
            </Container>
        </div>
    )
}
