import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, InputGroup,FloatingLabel } from "react-bootstrap";
import Json from './assignment.json'
import AssFormmCss from './assign.module.css'
import ShowAssignments from "../ShowAssignment/showAssign";
import { EyeFill, File, Link } from "react-bootstrap-icons";

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
    const [classWork, setClassWork] = useState(false);
    const [assignment, setAssignment] = useState(false);


  const handleCheckboxChange = (checkboxName) => {
    if (checkboxName === 'ClassWork') {
      setClassWork(!classWork);
    } else if (checkboxName === 'Assignment') {
      setAssignment(!assignment);
    }
  };

    const handleSubmit =(e, saveData) =>{
        e.preventDefault();        
        saveData={regNos,htmlTP,cssTP,jsTP,links,classWork,Assignment}
        let updateJsonFile =[...jsonAssign,saveData]
        // Setting a value in sessionStorage
        sessionStorage.setItem('key', JSON.stringify(updateJsonFile));
        setJsonAssign(updateJsonFile)
        setAssignImg(done)
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        }
    console.log(jsonAssign)

    return(
        <section  className={`${AssFormmCss.formSection}`}>
            <Container className="py-5">
                <div className="bg-dark px-5 py-5 d-lg-flex rounded">
                    <img src={assignImg} className={`${AssFormmCss.formImg}`}  />
                    <h1 className="text-center pt-5 text-light">Submit Your Continous Accessment</h1>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="py-3 px-3 bg-light border rounded">                    
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
                                label="HTML"
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
                                label="CSS"
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
                                label="J/S"
                            >
                                <Form.Select aria-label="Floating label select example" onChange={(e)=>setJsTP(e.target.value)}>
                                <option>Open to choose topic</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>                              
                    </Row> 
                    <Row>
                        <Form.Check label="ClassWork"  name="ClassWork" checked={classWork} className="mx-3 mt-3" onChange={() => handleCheckboxChange('ClassWork')} />            
                        <Form.Check label="Assignment" className="mx-3 mb-3" name="Assignment" checked={assignment}onChange={() => handleCheckboxChange('Assignment')} />       
                        <InputGroup className="my-3">
                            <InputGroup.Text id="basic-addon3">
                            Link to your accessment <Link className="text-primary mx-1"/>:
                            </InputGroup.Text>
                            <Form.Control type="text" onChange={(e)=>setLinks(e.target.value)}/>                         
                        </InputGroup>                     
                    </Row>
                    <div className={`${AssFormmCss.formDivBtn}`}>
                        <Button  type="submit" className={`${AssFormmCss.formBtn}  py-2 btn btn-dark px-5`} ><b> SUBMIT </b></Button>
                        <a href={<ShowAssignments/>}><Button className={`${AssFormmCss.formBtn} mx-3  py-2 btn btn-light px-4`}> See Details <EyeFill/></Button></a>
                    </div>
                </Form>
            </Container>
        </section>
    )
}