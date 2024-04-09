import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../configFirebase/firebase';
import { Table, Container, Row, Spinner } from 'react-bootstrap';

const YourComponent = () => {
    const [filteredDatas, setFilteredDatas] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const tablewkDay = ['WK1D1', 'WK1D2', 'WK2D1', 'WK2D2', 'WK3D1', 'WK3D2', 'WK4D1', 'WK4D2', 'WK5D1', 'WK5D2', 'WK6D1', 'WK6D2'];
    const projectName = ['Clipboard', 'Newspage', 'Loopstudios', 'Chirp', 'Portfolio', 'RAD5_Landing_Page', 'HTML/CSS_Capstone'];

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
        console.log(assessmentTables);
        Object.entries(assessmentTables).forEach(([assessmentType, { idColumn, rows }]) => {
            const table = (
                <div key={assessmentType} className='table-responsive my-4'>
                    <Table striped bordered hover className='my-5'>
                        <caption>{assessmentType}</caption>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Reg No.</th>
                                {assessmentType === 'Project' ? (
                                    projectName.map((listingName, index) => (
                                        <React.Fragment key={index}>
                                            <th className='text-center' colSpan={2}>{listingName}</th>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    tablewkDay.map((listingName, index) => (
                                        <React.Fragment key={index}>
                                            <th className='text-center' colSpan={2}>{listingName}</th>
                                        </React.Fragment>
                                    ))
                                )}
                            </tr>
                            <tr>
                                {assessmentType === 'Project' ? (
                                    projectName.map((listingName, index) => (
                                        <React.Fragment key={index}>
                                            <th className='text-primary'>Links</th>
                                            <th className='text-success'>Submitted</th>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    tablewkDay.map((listingName, index) => (
                                        <React.Fragment key={index}>
                                            <th className='text-primary'>Links</th>
                                            <th className='text-success'>Submitted</th>
                                        </React.Fragment>
                                    ))
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(rows).map(([wkDay, rowData], index) => (                                
                                <tr key={index}>
                                    <td>{idColumn[index]}</td> {/* Render ID from idColumn */}
                                    {/* Render link */}
                                    <td>
                                        {rowData.links[0] && (
                                            <a href={rowData.links[0]}>{rowData.links[0]}</a>
                                        )}
                                    </td>
                                    {/* Render submitted time */}
                                    <td>{rowData.submittedTime[0]}</td>
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
