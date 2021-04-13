  
import React, { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GetUserService,UpdateUserService } from "../services/User";
import Swal from "sweetalert2";

const UpdateUser = (props) => {

    useEffect(()=>{
        GetUserService(props.updateUserId).then((res)=>{
            if(res.data.code == 200){
                let {id,name,email,gender,status} = res.data.data;
                setId(id);
                setFormEmail(email);
                setFormName(name);
                setGenderField(gender);
                setStatusField(status);
            }
        })
    },[props.updateUserId])

    //Creating reference for uncontrol form 
    const gender1 = useRef();
  const gender2 = useRef();

  const status1 = useRef();
  const status2 = useRef();

  const [id, setId] = useState(0);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState(""); 

  const [genderField, setGenderField] = useState("Male");
  const [statusField, setStatusField] = useState("Active"); 




  




  //Used useState to set the form value so that data will not be erase on form reinitialization

  const handleName = (e) => {
    setFormName(e.target.value);
  };

  const handleEmail = (e) => {
    setFormEmail(e.target.value);
  };
  
  const handleGender = () => {
    console.log(gender1.current.checked);
    if (gender1.current.checked || gender2.current.checked) {
      if (gender1.current.checked) {
        setGenderField("Male");
       
      }

      if (gender2.current.checked) {
        setGenderField("Female");
        
      }
    }
  };

  const handleStatus = () => {
    
    if (status1.current.checked || status2.current.checked) {
      if (status1.current.checked) {
        setStatusField("Active");
     
      }

      if (status2.current.checked) {
        setStatusField("Inactive");
       
      }
    }
  };

  //Regex for name

  const nameRegExp = /^[a-zA-Z]+$/;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        id:id,
      name: formName,
      email: formEmail,        
      gender: genderField,
      status:statusField,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        //.matches(nameRegExp, "Name should be in A-Z/a-z")
        .required("Name Required"),      
      email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),    
     
    }),
    onSubmit: (values, { resetForm }) => {

        UpdateUserService(values).then((res)=>{
            
            if(res.data.code == 200){
                Swal.fire({
                    icon: "success",
                    title: "Successfully User details updated in to the list",
                    text: "",
                    timer: 1000,
                    onOpen: function () {
                      Swal.showLoading();
                    },
                  });

                  
                setFormEmail("");
                setFormName("");
                setGenderField("Male");
                setStatusField("Active");

                props.setUpdateUserId(0);
                props.setListUpdated(Math.random());

            } else{               
                
                alert(`${res.data.data[0].field} ${res.data.data[0].message}`)
            }

            

        }).catch((error)=>{
            console.log(error)
        })
           
    },
  });

  return (
    <>
      <div className="row">
        <div className="panel panel-primary">
          <div className="panel-body">
            <h1>Update User Details</h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>
                  Name<span>*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  maxLength="50"
                  className={
                    "form-control" +
                    (formik.errors.name && formik.touched.name
                      ? " is-invalid"
                      : "")
                  }
                  placeholder="New Task"
                  name="name"
                  onChange={(e) => handleName(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label>
                  Email<span>*</span>
                </label>
                <input
                  id="email"
                  type="text"
                  maxLength="50"
                  className={
                    "form-control" +
                    (formik.errors.email && formik.touched.email
                      ? " is-invalid"
                      : "")
                  }
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleEmail(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>              

              <div className="form-group">
                <label>
                  Gender<span style={{ marginRight: "10px" }}>*</span>
                </label>
                <br />
                Male
                <input
                  id="male"
                  type="radio"
                  maxLength="50"
                  className=""
                  placeholder="gender"
                  name="gender"
                  onChange={(e) => handleGender(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  checked={genderField == "Male"}
                  style={{ margin: "5px" }}
                  ref={gender1}
                />
                Female
                <input
                  id="female"
                  type="radio"
                  maxLength="50"
                  className=""
                  placeholder="gender"
                  name="gender"
                  onChange={(e) => handleGender(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  style={{ margin: "5px" }}
                  ref={gender2}
                  checked={genderField == "Female"}
                />
              </div>

              <div className="form-group">
                <label>
                  Status<span style={{ marginRight: "10px" }}>*</span>
                </label>
                <br />
                Active
                <input
                  id="Active"
                  type="radio"
                  maxLength="50"
                  className=""
                  placeholder="Active"
                  name="status"
                  onChange={(e) => handleStatus(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                  checked={statusField == "Active"}
                  style={{ margin: "5px" }}
                  ref={status1}
                />
                Inactive
                <input
                  id="Inactive"
                  type="radio"
                  maxLength="50"
                  className=""
                  placeholder="status"
                  name="status"
                  onChange={(e) => handleStatus(e)}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                  style={{ margin: "5px" }}
                  ref={status2}
                  checked={statusField == "Inactive"}
                />
              </div>

              

              <div className="form-group">
                <button
                  id="add"
                  type="submit"
                  className="btn btn-info btn-block"
                >
                  UPDATE
                </button>
              </div>

              <hr />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
