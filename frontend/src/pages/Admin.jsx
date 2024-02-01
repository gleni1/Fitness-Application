import React from "react";
import ApprovalRequests from '../Components/Admin/ApprovalRequests'
import ExerciseBank from '../Components/Admin/ExerciseBank'
import './styles/Admin.css';

function Admin() {
    return (
        <>
            <div className="admin">
                <div className="admin-header">
                    <h1>Admin</h1>
                </div>
                <ApprovalRequests />
                <ExerciseBank />
            </div>
        </>
      )
}

export default Admin;
