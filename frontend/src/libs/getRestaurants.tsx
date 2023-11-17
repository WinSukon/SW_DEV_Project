export default async function  getRestaurants() {

    await new Promise((resolve)=>setTimeout(resolve,5000))
    
    const response = await fetch("http://localhost:5000/api/v1/restaurants",{next : {tags:['hoss']}})
    if(!response.ok){
        throw new Error("Failed to fetch Restaurant")
    }
    return await response.json()
}