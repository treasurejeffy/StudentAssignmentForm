import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, Table } from "react-bootstrap";
import { Markdown, WindowDash } from "react-bootstrap-icons";
import ShowAssignmentsCss from './showassignment.module.css'
import unpassed from './icons8-question-mark-48.png'

// ... (your imports)

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
        return newArrayOfObjects.filter(data => data[type] && data[type].length > 0);
    };
    

    return (
        <div>
            <Container>
                <h1 className="text-center mt-5">Continous Assessment Details</h1>
                {/* Render the Classwork Table */}
                {filterData('classwork').length > 0 && (
                <div className="table-responsive mt-5">
                    <span>Classwork</span>
                    <Table striped bordered hover className={`${ShowAssignmentsCss.table}`}>
                        {/* Table header */}
                        <thead>
                            {/* ... (your header rows) */}
                            <tr>
                                <th>#</th>
                                {filterData('classwork').some(data => data.links) && <th>Link</th>}
                                <th>RegNo.</th>
                                <th>HTML/CSS</th>
                                <th>JAVASCRIPT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map over the array of objects to create table rows */}
                            {filterData('classwork').map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {data.links && <td>{data.links}</td>}
                                        <td>{data.regNos}</td>
                                        {data.classwork.map((topic, topicIndex) => (
                                            <td key={topicIndex} className="text-center">
                                                {topicIndex < 3 ? ` ${topic || 'empty'}` : ` ${topic || 'empty'}`}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}

            {/* Render the Homework Table */}
            {filterData('Homework').length > 0 && (
                <div className="table-responsive mt-5">
                    <span>Homework</span>
                    <Table striped bordered hover className={`${ShowAssignmentsCss.table}`}>
                        {/* Table header */}
                        <thead>
                            {/* ... (your header rows) */}
                            <tr>
                                <th>#</th>
                                {filterData('Homework').some(data => data.links) && <th>Link</th>}
                                <th>RegNo.</th>
                                <th>HTML/CSS</th>
                                <th>JAVASCRIPT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map over the array of objects to create table rows */}
                            {filterData('Homework').map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {data.links && <td>{data.links}</td>}
                                        <td>{data.regNos}</td>
                                        {data.Homework.map((topic, topicIndex) => (
                                            <td key={topicIndex} className="text-center">
                                                {topicIndex < 3 ? ` ${topic || 'empty'}` : ` ${topic || 'empty'}`}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}

             {/* Render the Homework Table */}
            {filterData('projects').length > 0 && (
                <div className="table-responsive mt-5">
                    <span>projects</span>
                    <Table striped bordered hover className={`${ShowAssignmentsCss.table}`}>
                        {/* Table header */}
                        <thead>
                            {/* ... (your header rows) */}
                            <tr>
                                <th>#</th>
                                {filterData('projects').some(data => data.links) && <th>Link</th>}
                                <th>RegNo.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map over the array of objects to create table rows */}
                            {filterData('projects').map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        {data.links && <td>{data.links}</td>}
                                        <td>{data.regNos}</td>                                      
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            )}
            </Container>
        </div>
    )
}

