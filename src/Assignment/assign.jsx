import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, InputGroup,FloatingLabel, NavLink} from "react-bootstrap";
import AssFormmCss from './assign.module.css'
import { EyeFill, File,  } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {db} from '../configFirebase/firebase';
import {addDoc, collection, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'

export default function Assignment() {
    // State variables
    const [regNos, setRegNos] = useState();
    const [html_css_CW, setHtml_css_CW] = useState('');
    const [html_css_HW, setHtml_css_HW] = useState('');
    const [js_CW, setJs_CW] = useState('');
    const [js_HW, setJs_HW] = useState('');
    const [projects, setProjects] = useState('');
    const [links, setLinks] = useState  ('');
    const [link, setLink] = useState('');
    const [clickTime, setClickTime] = useState(null);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // course_assessment/assessmentWKDay
    const [course_assessment, setCourse_assessment] = useState('')
    const [assessmentWkDay, setAssessmentWKDay] = useState('')
    const [assignImg, setAssignImg] = useState('https://www.jotform.com/uploads/waltermiller/form_files/Untitled%20design%20-%202022-04-21T113911.850.626118700256a5.78403891.png');
    const [done, setDone] = useState('https://www.freeiconspng.com/thumbs/check-mark-png/green-check-mark-2-icon-17.png');
    let notify;

    let classwork;
    let Homework;

    // Send data to the backend
    const dataOfSubmission = collection(db,'submission');
   
    // Form submission handler
    const handleSubmit =  (e, saveData) => {
        e.preventDefault();      
        setClickTime(dateTimeString);

        // Check if any of the required fields is not filled
        if (!regNos || !((links && !link) || (!links && link))  || (!html_css_HW && !html_css_CW && !js_CW && !js_HW && !projects)) {
            // Display an error message
            toast.error("Please fill in all required fields.");
            return; // Stop further execution
        }

        Homework = [ html_css_CW, js_CW];
        classwork= [html_css_HW, js_HW]
       
        saveData = { regNos, ...(links ? { links } : { link }), course_assessment, assessmentWkDay, dateTimeString};
        console.log(saveData);
        sendData()
    }
    
     // Setting update/add in firebase
     const sendData = async () => {
        try {
            setClickTime(dateTimeString);

            const assessmentLink = links ? links : link;
    
            // Create a reference to the document with ID regNos in the "submission" collection
            const submissionRef = doc(db, 'submission', regNos);
    
            const sanitizedCourseAssessment = course_assessment.replace(/[\~\*\[\]\/]/g, '');

            // Check if the document exists
            const submissionSnapshot = await getDoc(submissionRef);
    
            // Data to be set for the document
            const newData = {
                [sanitizedCourseAssessment]: [{
                    Name: assessmentWkDay,
                    Link: assessmentLink,
                    submittedTime:dateTimeString
                }]
            };
            
    
            if (submissionSnapshot.exists()) {
                // Document exists, update it
                await updateDoc(submissionRef, newData);
                console.log("Document updated successfully!");
            } else {
                // Document doesn't exist, add it
                await setDoc(submissionRef, newData);
                console.log("New document added successfully!");
            }
            setAssignImg(done);
            // Display a toast notification for successful submission
            notify = toast("Successful Submission!");
        } catch (error) {
            console.error("Error updating/adding document:", error);
        }
    };
    console.log(course_assessment);

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
                        </Col>
                    </Row>
                    {/* Topic Selection */}
                    <p className="text-center">Choose One(1) Assessment </p>
                    <Row lg={2} sm={1} xs={1}>
                        <Col className="mb-3">
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="HTML/CSS Classwork"
                            >
                                <Form.Select aria-label="Floating label select example" value={html_css_CW} onChange={(e) => { setCourse_assessment('HTML_CSS_Classwork'); setAssessmentWKDay(e.target.value); setJs_CW(''); setJs_HW(''); setHtml_css_HW(''); setProjects(''); setHtml_css_CW(e.target.value) }} >
                                    <option>Open to choose WKDay</option>
                                    <option value="WK1D1">WK1D1</option>
                                    <option value="WK1D2">WK1D2</option>
                                    <option value="WK2D1">WK2D1</option>
                                    <option value="WK2D2">WK1D2</option>
                                    <option value="WK3D1">WK3D1</option>
                                    <option value="WK3D2">WK3D2</option>

                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col className="mb-3">
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="HTML/CSS Homework"
                            >
                                <Form.Select aria-label="Floating label select example" value={html_css_HW} onChange={(e) => { setCourse_assessment('HTML_CSS_Homework'); setAssessmentWKDay(e.target.value); setHtml_css_CW(''); setJs_CW(''); setJs_HW(''); setProjects(''); setHtml_css_HW(e.target.value) }} >
                                <option>Open to choose WKDay</option>
                                    <option value="WK1D1">WK1D1</option>
                                    <option value="WK1D2">WK1D2</option>
                                    <option value="WK2D1">WK2D1</option>
                                    <option value="WK2D2">WK1D2</option>
                                    <option value="WK3D1">WK3D1</option>
                                    <option value="WK3D2">WK3D2</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col className="mb-3">
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="JS Classwork"
                            >
                                <Form.Select aria-label="Floating label select example" value={js_CW} onChange={(e) => { setCourse_assessment('JavaScript_Classwork'); setAssessmentWKDay(e.target.value); setHtml_css_HW(''); setHtml_css_CW(''); setJs_HW(''); setProjects(''); setJs_CW(e.target.value) }} required={true}>
                                    <option>Open to choose WKDay</option>
                                    <option value="WK1D1">WK1D1</option>
                                    <option value="WK1D2">WK1D2</option>
                                    <option value="WK2D1">WK2D1</option>
                                    <option value="WK2D2">WK1D2</option>
                                    <option value="WK3D1">WK3D1</option>
                                    <option value="WK3D2">WK3D2</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col className="mb-3">
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="JS Homework"
                            >
                                <Form.Select aria-label="Floating label select example" value={js_HW} onChange={(e) => { setCourse_assessment('JavaScript_Homework'); setAssessmentWKDay(e.target.value); setHtml_css_CW(''); setHtml_css_HW(''); setJs_CW('');  setProjects(''); setJs_HW(e.target.value)}} required={true}>
                                    <option>Open to choose WKDay</option>
                                    <option value="WK1D1">WK1D1</option>
                                    <option value="WK1D2">WK1D2</option>
                                    <option value="WK2D1">WK2D1</option>
                                    <option value="WK2D2">WK1D2</option>
                                    <option value="WK3D1">WK3D1</option>
                                    <option value="WK3D2">WK3D2</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Projects"
                            >
                                <Form.Select aria-label="Floating label select example" value={projects} onChange={(e) => { setCourse_assessment('Project'); setAssessmentWKDay(e.target.value); setHtml_css_CW(''); setHtml_css_HW(''); setJs_CW(''); setJs_HW(''); setProjects(e.target.value)}}>
                                    <option>Open to choose Project</option>                                
                                    <option value="Clipboard">Clipboard</option>
                                    <option value="Newspage">Newspage</option>
                                    <option value="Loopstudios">Loopstudios</option>
                                    <option value="Chirp">Chirp</option>
                                    <option value="Portfolio">Portfolio</option>
                                    <option value="RAD5_Landing_Page">RAD5_Landing_Page</option>
                                    <option value="HTML/CSS_Capstone">HTML/CSS_Capstone</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    {/* Checkbox and Link Input */}
                    <Row className="d-none d-lg-block">
                        <InputGroup className="my-3">
                            <InputGroup.Text id="basic-addon3">
                                Link to your assessment <NavLink className="text-primary mx-1"/>:
                            </InputGroup.Text>
                            <Form.Control type="text"  onChange={(e) => setLinks(e.target.value)} />
                        </InputGroup>
                    </Row>
                    <Row className="d-sm-block d-lg-none">
                        <Form.Group>
                            <Form.Label className='mt-4 px-1'>Link:</Form.Label>
                            <Form.Control onChange={(e)=> setLink(e.target.value) } placeholder="Enter the assessment link:" />
                        </Form.Group>
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
