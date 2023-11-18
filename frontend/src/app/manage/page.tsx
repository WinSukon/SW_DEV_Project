"use client"
import getRestaurants from "@/libs/getRestaurants"
import { useEffect, useState } from "react"

export default function Manage(){

    const [rest,setRes] = useState(null);

    const deleteUser = id => {
        fetch(`http://localhost:5000/api/v1/restaurants/${id}`, {
          method: "DELETE",
        })
          .then(response => response.json())
          .then(() => {
            // setRes(values => {
            //   return values.filter(item => item.id !== id)
            // })
            const fetchData = async()=>{
                const res = await getRestaurants()
                setRes(res)
            }
            fetchData()
          })
      }

    useEffect(()=>{
        const fetchData = async()=>{
            const res = await getRestaurants()
            setRes(res)
        }
        fetchData()
    },[])


    if(!rest) return (<div>loading</div>);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Website</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rest.data.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  {user.province}
                </td>
                <td>
                  {user.postalcode}
                </td>
                <td>
                  <button>Update</button>
                  &nbsp;
                  <button onClick={()=>{deleteUser(user.id)}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
