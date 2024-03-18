import React, { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, setDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../configFirebase/firebase'; // Import your Firebase configuration
import { Table } from 'react-bootstrap'; // Import Table component from react-bootstrap or any other library you're using

const YourComponent = () => {
    const [filteredDatas, setFilteredDatas] = useState([]);

    useEffect(() => {
        getDatas();
    }, []);
    
    const SavedDatas = collection(db,  'submission');

    const getDatas = async () => {
        try {
            const querySnapshot = await getDocs(SavedDatas);
            const dataArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFilteredDatas(dataArray)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    console.log(filteredDatas)

    const renderTables = () => {
        let prevName = null;
        let currentTable = null;
        const tables = [];
    
        filteredDatas.forEach((item) => {
            const name = Object.keys(item)[0];
            const data = item[name];
            
            if (name === prevName) {
                // If the name is the same as the previous one, append to the current table
                currentTable.push(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{data.assessmentWkDay}</td>
                        <td>{data.assessmentLink}</td>
                        <td>{data.submitted}</td>
                    </tr>
                );
            } else {
                // If the name is different, start a new table
                if (currentTable) {
                    // Push the previous table to the tables array if it exists
                    tables.push(
                        <div key={prevName}>
                            <h2>{prevName}</h2>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Reg No.</th>
                                        <th>AssessmentWKDAY</th>
                                        <th>AssessmentLink</th>
                                        <th>SubmittedTime</th>
                                    </tr>
                                </thead>
                                <tbody>{currentTable}</tbody>
                            </Table>
                        </div>
                    );
                }
                // Start a new table
                prevName = name;
                currentTable = [
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{data.assessmentWkDay}</td>
                        <td>{data.assessmentLink}</td>
                        <td>{data.submitted}</td>
                    </tr>
                ];
            }
        });
    
        // Push the last table to the tables array
        if (currentTable) {
            tables.push(
                <div key={prevName}>
                    <h2>{prevName}</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Reg No.</th>
                                <th>AssessmentWKDAY</th>
                                <th>AssessmentLink</th>
                                <th>SubmittedTime</th>
                            </tr>
                        </thead>
                        <tbody>{currentTable}</tbody>
                    </Table>
                </div>
            );
        }
    
        return tables;
    };
    
    
    return (
        <div>
            {renderTables()}
        </div>
    );
};

export default YourComponent;
