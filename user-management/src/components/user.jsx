import axios from "axios";
import { useEffect, useState } from "react";

function User() {

    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");    
    const [address, setAddress] = useState("");
    const [occupation, setOccupation] = useState("");
    const [users, setUsers] = useState([]);


 
useEffect(() => {
  (async () => await Load())();
  }, []);
 
 
  async function Load()
  {
     const result = await axios.get(
         "http://localhost:8081/api/users");
         setUsers(result.data);
         console.log(result.data);
  }

     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8081/api/users",
          {
          firstName: firstName,
          lastName: lastName,
          address: address,
          occupation: occupation
          });
          alert("User Registation Successfully");
          setId("");
          setFirstName("");
          setLastName("");
          setAddress("");
          setOccupation("");
          Load();
        }
    catch(err)
        {
          alert("User Registation Failed");
        }
   }

 
   async function editUser(users)
   {
    setFirstName(users.firstName);
    setLastName(users.lastName);
    setAddress(users.address);
    setOccupation(users.occupation); 
    setId(users.id);
   }
 
   async function DeleteUser(id)
   {
        await axios.delete("http://localhost:8081/api/users/" + id); 
        alert("User deleted Successfully");
        Load();
   }
 
   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put("http://localhost:8081/api/users/" + id,
       {
        firstName: firstName,
        lastName: lastName,
        address: address,
        occupation: occupation
       
       });
         alert("Registation Updated");
         setId("");
         setFirstName("");
         setLastName("");
         setAddress("");
         setOccupation("");
         Load();
       }
   catch(err)
       {
         alert("User Updated Failed");
       }
  }

    return (
      <div>
        <h1><center>User Management System</center></h1>
       <div className="container mt-4" >
          <form>
             
              <div className="form-group">
                <label>First Name</label>
                <input  type="text" className="form-control" id="firstName"
                value={firstName}
                onChange={(event) =>
                  {
                    setFirstName(event.target.value);      
                  }}
                />
              </div>


              <div className="form-group">
                <label>Last Name</label>
                <input  type="text" className="form-control" id="lastName" 
                 value={lastName}
                  onChange={(event) =>
                    {
                      setLastName(event.target.value);      
                    }}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="text" className="form-control" id="address" 
                  value={address}
                onChange={(event) =>
                  {
                    setAddress(event.target.value);      
                  }}
                />


              </div>
              <div className="form-group">
                <label>Occupation</label>
                <input  type="text" className="form-control" id="occupation" 
                 value={occupation}
                  onChange={(event) =>
                    {
                      setOccupation(event.target.value);      
                    }}
                />
              </div>
              <div>
              <button   className="btn btn-primary mt-4"  onClick={save}>Register</button>

              <button   className="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>
                <br/>
<table className="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Address</th>
      <th scope="col">Occupation</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
        {users.map(function fn(user) {
            return (
                <tbody key={user.id}>
                    <tr>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address}</td>
                    <td>{user.occupation}</td>        
                    <td>
                        <button type="button" className="btn btn-warning"  onClick={() => editUser(user)} >Edit</button>  
                        <button type="button" className="btn btn-danger" onClick={() => DeleteUser(user.id)}>Delete</button>
                    </td>
                    </tr>
                </tbody>
            );
        })}
</table>
</div>
);
}
  
  export default User;
  