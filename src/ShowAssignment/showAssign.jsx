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
                {filterData('classWork').length > 0 && (
                    <div className="table-responsive mt-5">
                        <span>Classwork</span>
                        <Table striped bordered hover className={`${ShowAssignmentsCss.table}`}>
                            {/* Table header */}
                            <thead>
                                <tr>
                                    <th rowSpan={3}>#Reg no.</th>
                                    <th colSpan={12} className="text-center">Classwork</th>
                                </tr>
                                <tr>
                                    <th scope="col" colSpan={6} className="text-center">HTML/CSS</th>
                                    <th scope="col" colSpan={6} className="text-center">JS</th>
                                </tr>
                                <tr>
                                    <th scope="col">Topic 1</th>
                                    <th scope="col">Topic 2</th>
                                    <th scope="col">Topic 3</th>
                                    <th scope="col">Topic 4</th>
                                    <th scope="col">Topic 5</th>
                                    <th scope="col">Topic 6</th>

                                    <th scope="col">Topic 1</th>
                                    <th scope="col">Topic 2</th>
                                    <th scope="col">Topic 3</th>
                                    <th scope="col">Topic 4</th>
                                    <th scope="col">Topic 5</th>
                                    <th scope="col">Topic 6</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Map over the array of objects to create table rows */}
                                {filterData('classWork').map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.regNos}</td>
                                            <td className="text-center">{data.topic[1]}</td>
                                            <td className="text-center">{data.topic[2]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                )}

                {/* Render the Homework Table */}
                {filterData('HomeWork').length > 0 && (
                    <div className="table-responsive mt-5">
                        <span>Homework</span>
                        <Table striped bordered hover className={`${ShowAssignmentsCss.table}`}>
                            {/* Table header */}
                            <thead>
                                <tr>
                                    <th rowSpan={3}>#Reg no.</th>
                                    <th colSpan={12} className="text-center">Homework</th>
                                </tr>
                                <tr>
                                    <th scope="col" colSpan={6} className="text-center">HTML/CSS</th>
                                    <th scope="col" colSpan={6} className="text-center">JS</th>
                                </tr>
                                <tr>
                                    <th scope="col">Topic 1</th>
                                    <th scope="col">Topic 2</th>
                                    <th scope="col">Topic 3</th>
                                    <th scope="col">Topic 4</th>
                                    <th scope="col">Topic 5</th>
                                    <th scope="col">Topic 6</th>

                                    <th scope="col">Topic 1</th>
                                    <th scope="col">Topic 2</th>
                                    <th scope="col">Topic 3</th>
                                    <th scope="col">Topic 4</th>
                                    <th scope="col">Topic 5</th>
                                    <th scope="col">Topic 6</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Map over the array of objects to create table rows */}
                                {filterData('HomeWork').map((data, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{data.regNos}</td>
                                            <td className="text-center">{data.topic[1]}</td>
                                            <td className="text-center">{data.topic[2]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Container>
        </div>
    )
}
