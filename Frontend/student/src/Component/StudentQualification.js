import React, { useEffect, useState } from "react";

export default function StudentQualification({studentQualificationList,setStudentQualificationList,trigger}){
    const [qualification, setQualification] = useState([]);
    const [marks , setMarks] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedQualificationId, setSelectedQualificationId] = useState(0);
    const [qualificationUpdateIndexId,setQualificationUpdateIndexId] = useState(null);
    const [buttonText, setButtonText] = useState('Add');
    const [fetchingQualificationList, setFetchingQualificationList] = useState(false);

    const fetchData = () => {
        setFetchingQualificationList(true);
        return fetch("https://localhost:44398/Qualification")
            .then((response) => response.json())
            .then((data) => 
            {
                setQualification(data);
                setFetchingQualificationList(false);
            });
    }

    useEffect(() => {
        fetchData();
    },[]);

    const addQualificationOnList = () => {
        if(validateData()){
            const {id,alias} = qualification.filter(x=> x.id === parseInt(selectedQualificationId))[0];
            const obj = {
                QualificationId: id,
                QualficationName: alias,
                Marks: parseInt(marks),
                Remarks: remarks,
                Action: 'Add'
            };
            if(qualificationUpdateIndexId === null){
                setStudentQualificationList([...studentQualificationList, obj]);
            }
            else{
                studentQualificationList[qualificationUpdateIndexId].QualificationId = obj.QualificationId;
                studentQualificationList[qualificationUpdateIndexId].QualficationName = obj.QualficationName;
                studentQualificationList[qualificationUpdateIndexId].Marks = parseInt(obj.Marks);
                studentQualificationList[qualificationUpdateIndexId].Remarks = obj.Remarks;
            }
            resetValue();
        }
    };

    const deleteQualificationList = (id,index) => {
        if(qualificationUpdateIndexId === index){
            alert('You have try to update this delete so you cannot able to delete this record, try again');
            return;
        }
        const list = studentQualificationList.filter(item => item.QualificationId !== id);
        setStudentQualificationList(list);
    };
    
    const editQualificationList = (index) => {
        const {QualificationId,Remarks, Marks} = studentQualificationList[index];
        setQualificationUpdateIndexId(index);
        setSelectedQualificationId(QualificationId);
        setRemarks(Remarks);
        setMarks(Marks);
        setButtonText('Update');
    };
    
    const validateData = () => {
        let errMsg = "";
        if(marks === undefined || marks === null || marks === ""){
            errMsg += "Please enter marks\n";    
        }
        if(marks !== ""){
            if(marks < 40){
                errMsg += "Marks should be more than 40.\n"; 
            }
            if(marks > 100){
                errMsg += "Marks should be less than 100.\n"; 
            }  
        }
        if(remarks === undefined || remarks === null || remarks === ""){
            errMsg += "Please enter remarks\n";    
        }
        if(selectedQualificationId === 0){
            errMsg += "Please choose qualification\n";    
        }
        if(qualificationUpdateIndexId === null){
            if(studentQualificationList.some(el => el.QualificationId === parseInt(selectedQualificationId))){
                errMsg += "This Qualification is already exists\n"; 
            }
        }else{
            if(studentQualificationList[qualificationUpdateIndexId].QualificationId !== parseInt(selectedQualificationId)){
                if(studentQualificationList.some(el => el.QualificationId === parseInt(selectedQualificationId))){
                    errMsg += "This Qualification is already exists\n"; 
                }
            }
        }
        
        if(errMsg === ""){
            return true;
        }
        else {
            alert(errMsg);
            return false;
        }
    };
    const resetValue = () => {
        setSelectedQualificationId(0);
        setRemarks("");
        setMarks("");
        setQualificationUpdateIndexId(null);
        setButtonText('Add');
    };

    useEffect(() => {
        if (trigger) {
            resetValue();
        }
      }, [trigger]);

    
    return (
        <>
       <div className="containter" style={{paddingTop: "20px"}}>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-4" style={{ paddingTop: "7px"}}>
                            <p>Qualification</p>
                        </div>
                        <div className="col-md-8">
                           {
                            fetchingQualificationList ? <p style={{ paddingTop: "7px"}}>Loading....</p> : 
                            <select className="form-select" value={selectedQualificationId}
                                onChange={e => setSelectedQualificationId(e.target.value)}>
                                <option value="0" disabled hidden>Select an Option</option>
                                {
                                qualification.map((x,i)=> 
                                    <option key={i} value={x.id}>{x.alias}</option>
                                )}
                            </select>
                           } 
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="row">
                    <div className="col-md-4" style={{ paddingTop: "7px"}}>
                        <p>Marks</p>
                    </div>
                    <div className="col-md-8">
                    <input autoComplete="off" type="number" className="form-control" id="Marks" placeholder="Marks" 
                        value={marks} 
                        onChange={e => setMarks(e.target.value)} />
                    </div>
                </div>
                </div>
                <div className="col-md-3">
                <div className="row">
                    <div className="col-md-4" style={{ paddingTop: "7px"}}>
                        <p>Remarks</p>
                    </div>
                    <div className="col-md-8">
                    <input autoComplete="off" type="text" className="form-control" id="Remarks" placeholder="Remarks"
                                value={remarks} 
                                onChange={e => setRemarks(e.target.value)}/>
                    </div>
                </div>
            </div>
        </div>
        <button type="submit" className="btn btn-danger" style={{float: "right"}} 
            onClick={resetValue}>Reset</button>
            <button type="submit" className="btn btn-primary" style={{float: "right"}} name="updateButton" 
            onClick={addQualificationOnList}>{buttonText}</button>
        
       </div>
       <div className="containter"  style={{paddingTop: "30px"}}>
       <div className="row">
            <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Qualification</th>
            <th scope="col">Marks</th>
            <th scope="col">Remarks</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {
                studentQualificationList.map((x,i)=> 
                    <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{x.QualficationName}</td>
                        <td>{x.Marks}</td>
                        <td>{x.Remarks}</td>
                        <td>
                        <i className="bi bi-pencil-square"  onClick={()=> editQualificationList(i)} style={{cursor: "pointer"}} title="Update Student Qualification"></i>
                        <i className="bi bi-trash-fill"  onClick={()=> deleteQualificationList(x.QualificationId,i)} style={{cursor: "pointer"}} title="Remove Qualification"></i>
                        </td>
                    </tr>
                )
            }
        </tbody>
        </table>
        </div>
       </div>
       </>
    );
}