import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, InputGroup,FloatingLabel, NavLink, Alert, Modal } from "react-bootstrap";
import Json from './assignment.json'
import AssFormmCss from './assign.module.css'
import ShowAssignments from "../ShowAssignment/showAssign";
import { EyeFill, File,  } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Assignment() {
    const [jsonAssign,setJsonAssign]=useState(Json);
    const [validated, setValidated] = useState(false);
    const [regNos,setRegNos]=useState();
    const [htmlTP,setHtmlTP]=useState('');
    const [cssTP,setCssTP]=useState('');
    const [jsTP,setJsTP]=useState('');
    const [links,setLinks]=useState('');
    const [assignImg,setAssignImg]=useState('https://www.jotform.com/uploads/waltermiller/form_files/Untitled%20design%20-%202022-04-21T113911.850.626118700256a5.78403891.png');
    const [done,setDone] =useState('https://www.freeiconspng.com/thumbs/check-mark-png/green-check-mark-2-icon-17.png');
    const [checkBox, setCheckBox] = useState('');

    let topic;

    const handleSubmit =(e, saveData) =>{
        e.preventDefault();   
        topic=[cssTP,htmlTP,jsTP];
        saveData={regNos,topic,links,checkBox}
        let updateJsonFile =[...jsonAssign,saveData] 
        if (saveData === undefined || regNos === undefined) {
            setAssignImg(assignImg);
          } else {
                // Setting a value in sessionStorage
            sessionStorage.setItem('key', JSON.stringify(updateJsonFile));
            setJsonAssign(updateJsonFile);
            setAssignImg(done);
        }
    }
    console.log(jsonAssign)

    return(
        <section  className={`${AssFormmCss.formSection}`}>
            <Container className="py-5">
                <div className="bg-dark px-5 py-5 d-lg-flex text-center rounded">
                    <img src={assignImg } thumbnail className={`${AssFormmCss.formImg}`}  />
                    <h1 className=" pt-lg-5 text-light">Submit Your Continous Accessment</h1>
                </div>
                <Form onSubmit={handleSubmit} className="py-3 px-3 bg-light border rounded">                    
                    <Row className="mt-4" lg={2} md={1} sm={1} xs={1}>                    
                        <Col  className="mb-3" >
                            <Form.Label>Reg No. </Form.Label>
                            <Form.Control type="number" onChange={(e)=>setRegNos(e.target.value)}/>
                            <Form.Text muted>IDENTITY NO.</Form.Text>
                            <Form.Control.Feedback type={"invalid"}>pls fill it up</Form.Control.Feedback>
                        </Col>                               
                    </Row>
                    <Row>
                        <Col >
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="HTML/CSS"
                            >
                                <Form.Select aria-label="Floating label select example" onChange={(e)=>setHtmlTP(e.target.value)}>
                                <option>Open to choose topic</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>   
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="JS"
                            >
                                <Form.Select aria-label="Floating label select example" onChange={(e)=>setCssTP(e.target.value)}>
                                <option>Open to choose topic</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>  
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Projects"
                            >
                                <Form.Select aria-label="Floating label select example" onChange={(e)=>setJsTP(e.target.value)}>
                                <option>Open to choose</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>                              
                    </Row> 
                    <Row>
                        <Form.Check label="ClassWork"  name="ClassWork" checked={checkBox === 'classWork'} className="mx-3 mt-3" onChange={()=>setCheckBox('classWork') } /> 
                        <Form.Check label="HomeWork" className="mx-3" name="HomeWork" checked={checkBox === 'HomeWork'}  onChange={() => setCheckBox('HomeWork')}/>
                        <Form.Check label="Projects" className="mx-3 mb-3" name="Projects" checked={checkBox === 'Projects'} onChange={() => setCheckBox('Projects')} /> 

                        <InputGroup className="my-3">
                            <InputGroup.Text id="basic-addon3">
                            Link to your accessment <NavLink className="text-primary mx-1"/>:
                            </InputGroup.Text>
                            <Form.Control type="text" onChange={(e)=>setLinks(e.target.value)}/>                         
                        </InputGroup>                     
                    </Row>
                    <div className={`${AssFormmCss.formDivBtn}`}>
                        <Button  type="submit" className={`${AssFormmCss.formBtn}  py-2 btn btn-dark px-5`} ><b> SUBMIT</b></Button>
                          <Link to={"/ShowAssignment"}><Button className={`${AssFormmCss.formBtn} mx-3  py-2 btn btn-light px-4`}> Show Scores <EyeFill/></Button></Link>
                          
                    </div>
                </Form>
            </Container>
        </section>
    )
}