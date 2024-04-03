import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../configFirebase/firebase';
import { Table, Container, Row, Spinner } from 'react-bootstrap';

const YourComponent = () => {
    const [filteredDatas, setFilteredDatas] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const tablewkDay = ['WK1D1', 'WK1D2', 'WK2D1', 'WK2D2', 'WK3D1', 'WK3D2', 'WK4D1', 'WK4D2', 'WK5D1', 'WK5D2', 'WK6D1', 'WK6D2'];

    useEffect(() => {
        getDatas();
    }, []);

    const message = <p className='text-center bg-danger p-4 rounded-2 text-light d-none'>Network error</p>;
    const SavedDatas = collection(db, 'submission');

    const getDatas = async () => {
        try {
            const querySnapshot = await getDocs(SavedDatas);
            const dataArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSpinner(false);
            setFilteredDatas(dataArray);
        } catch (error) {
            setSpinner(true);
            console.error('Error fetching data:' + error);
        }
    };

    // Function to create tables for each assessment type
    const createAssessmentTables = () => {
        const assessmentTables = {};

        // Iterate through filteredDatas
        filteredDatas.forEach(({ id, ...workTypes }) => {
            Object.entries(workTypes).forEach(([assessmentType, work]) => {
                // Initialize the table if it doesn't exist
                if (!assessmentTables[assessmentType]) {
                    assessmentTables[assessmentType] = {
                        idColumn: [],
                        rows: {},
                    };
                }

                // Append id to the idColumn
                assessmentTables[assessmentType].idColumn.push(id);

                // Populate rows with links and submittedTime for each wkDay
                work.forEach(item => {
                    if (!assessmentTables[assessmentType].rows[item.Name]) {
                        assessmentTables[assessmentType].rows[item.Name] = {
                            links: [],
                            submittedTime: [],
                        };
                    }
                    assessmentTables[assessmentType].rows[item.Name].links.push(item.Link);
                    assessmentTables[assessmentType].rows[item.Name].submittedTime.push(item.submittedTime);
                });
            });
        });

        return assessmentTables;
    };

    // Render the tables
    const renderTables = () => {
        const assessmentTables = createAssessmentTables();
        const tables = [];

        Object.entries(assessmentTables).forEach(([assessmentType, { idColumn, rows }]) => {
            const table = (
                <div key={assessmentType} className='table-responsive my-4'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th rowSpan={3}>Reg No.</th>
                                <th colSpan={tablewkDay.length * 2} className='text-center'>{assessmentType}</th>
                            </tr>
                            <tr>
                                {tablewkDay.map((listingName, index) => (
                                    <React.Fragment key={index}>
                                        <th colSpan={2} className='text-center'>{listingName}</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                            <tr>
                                {tablewkDay.map((listingName, index) => (
                                    <React.Fragment key={index}>
                                        <th className='text-primary'>Links</th>
                                        <th className='text-success'>Submitted</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {idColumn.map((id, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td>{id}</td>
                                    {tablewkDay.map((listingName, colIndex) => (
                                        <React.Fragment key={colIndex}>
                                            <td>
                                                {rows[listingName] && rows[listingName].links[rowIndex] && (
                                                    <a href={rows[listingName].links[rowIndex]}>{rows[listingName].links[rowIndex]}</a>
                                                )}
                                            </td>
                                            <td>
                                                {rows[listingName] && rows[listingName].submittedTime[rowIndex] && (
                                                    rows[listingName].submittedTime[rowIndex]
                                                )}
                                            </td>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        
                    </Table>
                </div>
            );

            tables.push(table);
        });

        return tables;
    };

    return (
        <Container>
            <h2 className='text-center mt-5 mb-3'>Assessment Details</h2>
            {spinner ? (
                <div className='text-center'><Spinner animation="border" variant="success" />pls wait...</div>
            ) : (
                <Row>
                    {message}
                    {renderTables()}
                </Row>
            )}
        </Container>
    );
};

export default YourComponent;
