import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, InputGroup,FloatingLabel, NavLink} from "react-bootstrap";
import Json from './assignment.json'
import AssFormmCss from './assign.module.css'
import { EyeFill, File,  } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Assignment() {
    // State variables
    const [jsonAssign, setJsonAssign] = useState(Json);
    const [regNos, setRegNos] = useState();
    const [html_css, setHtml_css] = useState('');
    const [js, setJs] = useState('');
    const [projects, setProjects] = useState('');
    const [links, setLinks] = useState('');
    const [assignImg, setAssignImg] = useState('https://www.jotform.com/uploads/waltermiller/form_files/Untitled%20design%20-%202022-04-21T113911.850.626118700256a5.78403891.png');
    const [done, setDone] = useState('https://www.freeiconspng.com/thumbs/check-mark-png/green-check-mark-2-icon-17.png');
    const [checkBox, setCheckBox] = useState('');
    let notify;

    let topic;

    // Form submission handler
    const handleSubmit = (e, saveData) => {
        e.preventDefault();

        // Check if any of the required fields is not filled
        if (!regNos || !links || !checkBox || (!html_css && !js && !projects)) {
            // Display an error message
            toast.error("Please fill in all required fields.");
            return; // Stop further execution
        }

        topic = [projects, html_css, js];
        saveData = { regNos, links, checkBox, topic };
        let updateJsonFile = [...jsonAssign, saveData];

        // Setting a value in sessionStorage
        sessionStorage.setItem('key', JSON.stringify(updateJsonFile));
        // Update state variables
        setJsonAssign(updateJsonFile);
        setAssignImg(done);
        // Display a toast notification for successful submission
        notify = toast("Successful Submission!");
    }

// ...

    
    console.log(jsonAssign);

    return (
        <section className={`${AssFormmCss.formSection}`} >
            <Container className="py-5">
                <div className="bg-dark px-5 py-5 d-lg-flex text-center rounded">
                    <img src={assignImg} alt="AssignmentImage" className={`${AssFormmCss.formImg}`} />
                    <h1 className="pt-lg-5 text-light">Submit Your Continuous Assessment</h1>
                </div>
                {/* Assignment Form */}
                <Form onSubmit={handleSubmit} className="py-3 px-3 bg-light border rounded" aria-required>
                    {/* Form Input Fields */}
                    <Row className="mt-4" lg={2} md={1} sm={1} xs={1}>
                        <Col className="mb-3">
                            <Form.Label>Reg No. </Form.Label>
                            <Form.Control type="number" required onChange={(e) => setRegNos(e.target.value)} />
                            <Form.Text muted>IDENTITY NO.</Form.Text>
                            <Form.Control.Feedback type={"invalid"}>Please fill it up</Form.Control.Feedback>
                        </Col>
                    </Row>
                    {/* Topic Selection */}
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="HTML/CSS"
                            >
                                <Form.Select aria-label="Floating label select example" value={html_css} onChange={(e) => { setHtml_css(e.target.value); setJs(''); setProjects(''); }} >
                                    <option>Open to choose topic</option>
                                    <option value="One">One</option>
                                    <option value="Two">Two</option>
                                    <option value="Three">Three</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="JS"
                            >
                                <Form.Select aria-label="Floating label select example" value={js} onChange={(e) => { setJs(e.target.value); setHtml_css(''); setProjects(''); }} required={true}>
                                    <option>Open to choose topic</option>
                                    <option value="One">One</option>
                                    <option value="Two">Two</option>
                                    <option value="Three">Three</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Projects"
                            >
                                <Form.Select aria-label="Floating label select example" value={projects} onChange={(e) => { setProjects(e.target.value); setHtml_css(''); setJs(''); }} disabled={true}>
                                    <option>Open to choose</option>
                                    <option value="One">One</option>
                                    <option value="Two">Two</option>
                                    <option value="Three">Three</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    {/* Checkbox and Link Input */}
                    <Row>
                        <Form.Check label="ClassWork" name="ClassWork" checked={checkBox === 'classWork'} className="mx-3 mt-3" onChange={() => setCheckBox('classWork')} />
                        <Form.Check label="HomeWork" className="mx-3" name="HomeWork" checked={checkBox === 'HomeWork'} onChange={() => setCheckBox('HomeWork')} />
                        <Form.Check label="Projects" className="mx-3 mb-3" name="Projects" checked={checkBox === 'Projects'} onChange={() => setCheckBox('Projects')} disabled={true}/>

                        <InputGroup className="my-3">
                            <InputGroup.Text id="basic-addon3">
                                Link to your assessment <NavLink className="text-primary mx-1"/>:
                            </InputGroup.Text>
                            <Form.Control type="text" required onChange={(e) => setLinks(e.target.value)} />
                        </InputGroup>
                    </Row>
                    {/* Form Buttons */}
                    <div className={`${AssFormmCss.formDivBtn}`}>
                        <Button type="submit" onClick={notify} className={`${AssFormmCss.formBtn} py-2 btn btn-dark px-sm-4 px-lg-5`} ><b> SUBMIT</b></Button>
                        <Link to={"/ShowAssignment"}><Button className={`${AssFormmCss.formBtn} mx-3 py-2 btn btn-light px-lg-5 px-sm-4`}>Details <EyeFill/></Button></Link>
                    </div>
                </Form>
                {/* Toast Notification Container */}
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Container>
        </section>
    )
} 
