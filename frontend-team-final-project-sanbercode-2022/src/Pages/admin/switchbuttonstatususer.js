import SidebarAdmin from "./sidebarAdmin"
import { Link } from "react-router-dom"
import { useState, useEffect , useContext, useParams} from "react"
import { apiURL } from "../../Helpers/API"
import { UserContext } from "../../Context/UserContext"
import {Form} from "react-bootstrap"

import axios from "axios"
const ButtonStatus=({status:switchStatus,id:idUser})=>{

    const [user,] = useContext(UserContext)
    //const [investee, setInvestee] = useState([{}])
   
     const[status,setStatus]= useState(switchStatus)
     const [fetchTrigger, setFetchTrigger] = useState(true)
     
    
    const [currentId, setCurrentId] =  useState(idUser)

    // useEffect(() => {
	// 	const fetchData = async () => {
	// 		const investee= await axios.get(`${apiURL}/admin/users`, { headers: { Authorization: "Bearer " + user.token } });
			
           
    //         //const statuss =investee.data.data.status
    //          let {status} = investee.data.data
    //         setStatus(status)
    //         // setCurrentId(id)
    //         //console.log("ini status",statuss)
	// 	};
    //     if (fetchTrigger) {
    //         fetchData()
    //         setFetchTrigger(false)
    //     }
	// }, [user.token, fetchTrigger]);

    const handleSubmit = (event)=>{
        event.preventDefault(status)
          if (currentId !== null){
            var newStatus = status
            if(status==="tidak aktif"){
                newStatus = "aktif"

            }else if(status==="aktif"){
                newStatus="tidak aktif"
                
            }
            setStatus(newStatus)
            // edit
            axios.patch(`${apiURL}/admin/user/${currentId}`, {status:newStatus}, {headers: {"Authorization" : "Bearer "+ user.token}})
            
            
          }

          
         // console.log("tes")
      }
    //   const handleChange = (event) =>{
    //     let val = event.target.value
    //     let name = event.target.name
    //     setInput({...input, [name]: val})
    //   }


    return(
        <> <Form  onChange={handleSubmit}>
        {status==="aktif"&&(
            <Form.Check 
            //onChange={handleChange} 
           // value={input.status="aktif"}  

                type="switch"
                id="custom-switch"
                
                checked        
                />
                )}
            {status==="tidak aktif"&&(
            <Form.Check 
            //onChange={handleChange}
            // value={input.status="tidak aktif"} 

                type="switch"
                id="custom-switch"
                
                   
                />
                )}
            </Form></>
    )

}
export default ButtonStatus