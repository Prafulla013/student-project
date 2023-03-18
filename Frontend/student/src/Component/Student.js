import React, { useState } from "react";
import StudentQualification from "./StudentQualification";
import StudentList from './StudentList'

function Student(){
    const [studentName,setStudentName] = useState('');
    const [address,setAddress] = useState('');
    const [age,setAge] = useState(0);
    const [qualifications,setQualification] = useState([]);
    const [savingStudent,setSavingStudent] = useState(false);
    const [fetchStudent, setFetchStudent] = useState(0);
    const [fetchingStudentQualification,setFetchingStudentQualification] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const addStudent = () => {
        if(validateData()){
            let api = "";
            if(selectedStudentId !== null){
                api = "https://localhost:44398/Student/"+selectedStudentId;
            }else{
                api = "https://localhost:44398/Student";
            }
            setSavingStudent(true);
            const student = {
                Name: studentName,
                Address: address,
                Age : parseInt(age),
                Qualifications : qualifications 
            }
            const requestOptions = {
                method: selectedStudentId !== null ? 'PUT' : 'POST',
                headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
                body: JSON.stringify(student)
            };
            return fetch(api,requestOptions).then((response) => response.json())
            .then((data) => 
            {
                setSelectedStudentId(null);
                setFetchStudent(fetchStudent+1);
                resetValue();
            });
        }
    }
    const resetValue = () => {
        setStudentName('');
        setAddress('');
        setAge(0);
        setQualification([]);
        setSavingStudent(false);
        setSelectedStudentId(null);
        setFetchStudent(fetchStudent+1);
    };

    const deleteStudent = (id,index) => {
        if(window.confirm("Do you want to delete this student?")){
            const requestOptions = {
                method: 'DELETE',
                headers: {  'Accept': 'application/json','Content-Type': 'application/json' },
            };
            return fetch("https://localhost:44398/Student/"+id,requestOptions).then((response) => response.json())
            .then((data) => 
            {
                setFetchStudent(fetchStudent+1);
                if(selectedStudentId !== null){
                    resetValue();
                }
            });
        }
    };

    const validateData = () => {
        let errMsg = "";
        if(studentName === undefined || studentName === null || studentName === ""){
            errMsg += "Please enter student Name\n";    
        }
        if(address === undefined || address === null || address === ""){
            errMsg += "Please enter address\n";    
        }
        if(age === undefined || age === null || age === ""){
            errMsg += "Please enter age\n";    
        }
        if(errMsg === ""){
            return true;
        }
        else {
            alert(errMsg);
            return false;
        }
    };

    return (
       <div className="container" style={{paddingTop: "30px"}} >
        <div className="row">
        <div className="col-md-3">
            <p>Student List</p>
            <StudentList 
                trigger={fetchStudent} 
                fetchingStudentQualification= {setFetchingStudentQualification}
                studentName = {setStudentName}
                age = {setAge}
                address= {setAddress}
                setQualifications={setQualification}
                selectedStudentId= {selectedStudentId}
                setSelectedStudentId = {setSelectedStudentId}
                resetValue={resetValue}
            />
        </div>
        {
            fetchingStudentQualification ?  <div className="col-md-9"><p>Loading....</p></div> :
            <div className="col-md-9">
            <div className="form-group">
                <label htmlFor="studentName">Student name</label>
                <input autoComplete="off" type="text" className="form-control" id="studentName" placeholder="Enter student name"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="Address">Address</label>
                <input autoComplete="off" type="text" className="form-control" id="Address" placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="Age">Age</label>
                <input autoComplete="off" type="number" className="form-control" id="Age" placeholder="Age" 
                    value={age}
                    onChange={e => setAge(e.target.value)}/>
            </div>
            <div>
                <StudentQualification studentQualificationList = {qualifications}
                    trigger={fetchStudent} 
                    setStudentQualificationList = {setQualification}/>
            </div>
            {
                savingStudent ? <p>Saving ...</p> :
                <>
                <button type="submit" className="btn btn-primary" onClick={addStudent}>{selectedStudentId === null ? "Submit" : "Update Student"}</button>
                {
                    selectedStudentId !== null ? 
                    <button type="submit" className="btn btn-danger" onClick={()=> deleteStudent(selectedStudentId)}>Delete</button>
                    : <></>
                }
                </>
            }
            </div>
        }
       
        </div>        
       </div>
    );
}
export default Student;
