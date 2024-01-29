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

        //  Parse JSON to it
        if (storedData) {
            const parsedData = JSON.parse(storedData);

            // Set items to state
            setSessionStorageItems(parsedData);
        }
    }, []);

    // Remove the first object from the array (index 0)
    let newArrayOfObjects = sessionStorageItems.slice(1);

    console.log(newArrayOfObjects);

    return (
        <div>
            <Container>
                <h1 className={`${ShowAssignmentsCss.header} table-responsive text-center pt-5`}>CONTINUOUS ASSESSMENTS DETAILS</h1>
                <div className="table-responsive">
                    <Table striped bordered hover className={`${ShowAssignmentsCss.table}`}>
                        {/* Table header */}
                        <thead>
                            <tr>
                                <th>#Reg no.</th>
                                <th>Links</th>
                                <th colSpan="3" className="text-center">Topics</th>
                                <th colSpan="3" className="text-center">Assessment</th>
                            </tr>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col">HTML/CSS</th>
                                <th scope="col">JS</th>
                                <th scope="col">Project</th>
                                <th scope="col">Classworks</th>
                                <th scope="col">Homeworks</th>
                                <th scope="col">Projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map over the array of objects to create table rows */}
                            {newArrayOfObjects.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.regNos}</td>
                                        <td><a href={data.links}>{data.links}</a></td>
                                        <td className="text-center">{data.html_css}</td>
                                        <td className="text-center">{data.js}</td>
                                        <td className="text-center">{data.projects}</td>
                                        <td className="text-center">{data.checkBox === 'classWork' ? <img src="https://img.icons8.com/?size=48&id=sz8cPVwzLrMP&format=png" alt="passed" /> : <img src={unpassed} alt="unpassed" />}</td>
                                        <td className="text-center">{data.checkBox === 'HomeWork' ? <img src="https://img.icons8.com/?size=48&id=sz8cPVwzLrMP&format=png" alt="passed" /> : <img src={unpassed} alt="unpassed" />}</td>
                                        <td className="text-center">{data.checkBox === 'Projects' ? <img src="https://img.icons8.com/?size=48&id=sz8cPVwzLrMP&format=png" alt="passed" /> : <img src={unpassed} alt="unpassed" />}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    )
}
