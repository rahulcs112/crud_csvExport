import React, { useState, useEffect } from "react";
import {GetUserListsService} from "../services/User";
import { CSVLink } from "react-csv";
const List = (props) => {

    
 
    const [userList,setUserList] = useState([]);
    useEffect(()=>{
        GetUserListsService().then((res)=>{
            setUserList(res.data.data)
        });

     
         
    },[props.updateUserId,props.listUpdated]);

    const handleEdit = (id)=>{
        props.setUpdateUserId(id);
    }

    const headers = [
        { label: "So.No.", key: "id" },
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Gender", key: "gender" },
        { label: "Status", key: "status" },
        { label: "Created At", key: "created_at" },
        { label: "Updated At", key: "updated_at" },
       
      ];

      let csvReport = {};

    if(userList){

       const data = userList;

         csvReport = {
            data: data,
            headers: headers,
            filename: 'TensorGo.csv'
          };

    }

    
       
       
       
      

    

  return (
    <>
    {console.log(csvReport)}
    {userList && csvReport && <CSVLink {...csvReport}>Export to CSV</CSVLink> } 
     <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Update At</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody id="myTable">
      {userList &&
        userList.map((element) => {
          return (
            <tr>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.email}</td>
              <td>{element.gender}</td>
              <td>{element.status}</td>
              <td>{element.created_at}</td>
              <td>{element.updated_at}</td>

              <td>
                <a
                  onClick={() => handleEdit(element.id)}
                  href
                  style={{ cursor: "pointer" }}
                >
                  Edit
                </a>
               
              </td>
            </tr>
          );
        })}

</tbody></table>
    </>
  );
};

export default List;