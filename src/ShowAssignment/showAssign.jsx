import React , {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, Table } from "react-bootstrap";
import Json from '../Assignment/assignment.json'

export default function ShowAssignments() {
    const [jsonAssign,setJsonAssign]=useState(JSON.parse(sessionStorage.getItem('key')))

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
                                <th>link</th>
                                <th>ClassWork</th>
                                <th>Assignment</th>
                            </tr>
                        </thead>

                        {/* table body */}
                        {jsonAssign.map((data,index,jsonAssign)=>{
                            return(                                                        
                                <tbody key={index}>
                                    <tr>
                                        <td>{data.regNos}</td>
                                        <td>{data.links}</td>
                                        <td>{data.Classwork}</td>
                                        <td>{data.links}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </Table>
                </div>
            </Container>
        </div>
    )
}