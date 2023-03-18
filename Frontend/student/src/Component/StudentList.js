import React, { useState,useEffect } from "react";

function StudentList(props){
    const {
            trigger,
            fetchingStudentQualification,
            studentName,
            age,
            address,
            setQualifications,
            selectedStudentId,
            setSelectedStudentId,
            resetValue
        } = props;

    const [studentList,setStudentList] = useState([]);
    const [fetchingData, setFetchingData] = useState(false);
    const fetchStudent = () => {
        setFetchingData(true);
        return fetch("https://localhost:44398/Student")
        .then((response) => response.json())
        .then((data) => 
        {
            setStudentList(data);
            setFetchingData(false);
        });
    };

    const fetchStudentQualification = (id,index,details)=> {
        fetchingStudentQualification(true)
        setSelectedStudentId(id);
        setQualifications([]);
        return fetch("https://localhost:44398/Student/"+id)
        .then((response) => response.json())
        .then((data) => 
        {
            studentName(details.name);
            address(details.address);
            age(details.age);
            setQualifications(data.map(element => {
            var obj = {
                QualificationId: element.qualificationId,
                QualficationName: element.qualificationName,
                Marks: parseInt(element.marks),
                Remarks: element.remarks,
            };
            return obj;
           }));
           fetchingStudentQualification(false);
        });
    };

    useEffect(() => {
        fetchStudent();
    },[]);

    useEffect(() => {
        if (trigger) {
            fetchStudent();
        }
      }, [trigger]);

    return (
        <>
        {
            fetchingData ? <p>Loading....</p>  : 
            <div className="list-group" style={{
                height: "400px",
                overflow:"scroll"
            }}>
                {
                    studentList.length === 0 ?
                    <p>No student List</p> :
                    studentList.map((x,i) => 
                    <a  
                        className={x.id === selectedStudentId 
                        ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action" }
                        onClick={() =>{
                            fetchStudentQualification(x.id,i,x)
                        }}
                         id={i} style={{cursor: "pointer"}} key={i}>{x.name}
                    </a>
                )}
            </div>
        }
        <hr></hr>
        <button type="button" className="btn btn-primary" style={{float: "right"}} onClick={()=> resetValue()}>Reset</button>

      </>
    );
}
export default StudentList;
