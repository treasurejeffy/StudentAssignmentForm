import React , {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, Table } from "react-bootstrap";
import { Markdown, WindowDash } from "react-bootstrap-icons";

export default function ShowAssignments() {
    const [sessionStorageItems, setSessionStorageItems] = useState([]);

    useEffect(() => {
        // Step 1: Retrieve items from sessionStorage
        const storedData = sessionStorage.getItem('key');

        // Step 2: Parse JSON if needed
        if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Step 3: Set items to state
        setSessionStorageItems(parsedData);
        }
    }, []);
    console.log(sessionStorageItems)

    return(
        <div>
            <Container>
                <h1 className="text-center">CONTIOUNS ACCESSMENTS DETAILS</h1>
                <hr/>
                <div className="table-responsive">
                    <Table striped bordered hover>
                        {/* table header */}
                        <thead>
                            <tr>
                                <th>#/Reg No</th>                               
                                <th>Topic</th>
                                <th>link</th>
                                <th>ClassWork</th>
                                <th>Assignment</th>
                            </tr>
                        </thead>                        
                            {sessionStorageItems.map((data,index,sessionData)=>{
                                return(
                                   <tbody key={index}>
                                        <td>{data.regNos}</td>
                                        <td></td>
                                        <td>{data.links}</td>
                                        <td>{data.classWork ? <WindowDash/> : <span>&times;</span>}</td>
                                        <td>{data.assignment ? 'Okey' : 'No'}</td>
                                   </tbody>
                                )
                            })}                        
                    </Table>
                </div>
            </Container>
        </div>
    )
}