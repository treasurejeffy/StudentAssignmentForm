import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom" ;
import Assignment from "./Assignment/assign";
import ShowAssignments from "./ShowAssignment/showAssign";

export default function RouterSwitch() {
    

    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path="/" element={<Assignment/>}/>
                    <Route path="/ShowAssignment" element={<ShowAssignments/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}