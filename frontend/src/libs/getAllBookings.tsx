export default async function  getAllBookings() {
    
    const response = await fetch(`http://localhost:5000/api/v1/bookings`,{
        method : "GET",
        headers: {
            accept: 'application/json',
            authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTZmZmQ5ODJjN2U2MTJkZDI1ZGMwMyIsImlhdCI6MTcwMDIwMDQwOSwiZXhwIjoxNzMxNzM2NDA5fQ.8RD1oviY9oTU7N6NVIwC6zJLBPCAKi1W70TkXuZ_n9o',
        },
    })
    if(!response.ok){
        throw new Error("Failed to fetch Bookings")
    }
    return await response.json()
}