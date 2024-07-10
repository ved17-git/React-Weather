import { useState,useEffect } from 'react'


function App() {
  const [location,setLocation]=useState('')
const[data,setData]=useState({})
const[error,setError]=useState('')

let info=new Date()
let date=info.getDate()+'/'+info.getMonth()+'/'+info.getFullYear()


const url= `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3e5996dd1326ed7142a1a709f312ae85`


useEffect(()=>{
async function defaultCity(){
const defaultLocation='nagpur'
const defaultCity=`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=3e5996dd1326ed7142a1a709f312ae85`

const city= await fetch(defaultCity)  
const currentCity=await city.json()
console.log(currentCity)
setData(currentCity)
}

defaultCity()
},[])




async function getData(e){
 e.preventDefault()
  let ans=await fetch(url)
  let res= await ans.json()
  console.log(res)
  setData(res)
  setLocation('')
  console.log(data.main.temp)

}

const handleInput=(e)=>{
  setLocation(e.target.value)

}






  return (
<>


<div className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center w-full h-[100vh]'>

<div className=' bg-slate-800 w-[25%] h-[75%] py-[vh] px-[4vh] flex items-center justify-center flex-col gap-10 rounded-2xl'>

<form action="" className='flex '>
<input type="search"
placeholder='Enter any City'
value={location}
onChange={handleInput}
className='text-white w-full bg-transparent border-slate-50	outline-none text-2xl' />
<button onClick={getData} className= 'bg-slate-950 text-white p-3 rounded-e-xl hover:bg-slate-900'><i className="fa-solid fa-magnifying-glass"></i></button>
</form>



<div className='flex flex-col gap-4 w-full'> 

<div>
  <h1 className='text-3xl'> {data.name}, {data.sys? data.sys.country :null } </h1>
   <h1>Date: {date}</h1>
</div>

<div className='text-center'>
  <h1 className='text-8xl'>{data.main? Math.floor(data.main.temp-273.15) : null}&deg;C</h1>
  <h1>clear sky</h1>
</div>

<ul className='mt-10 grid grid-cols-2 content-center gap-y-[4vh]'>
  <li>Visibility: {data.visibility}</li>
  <li>Humidity: {data.main? data.main.humidity : null}</li>
  <li>Feels like: {data.main? Math.floor(data.main.feels_like-273.15) : null}</li>
  <li>Wind: {data.wind? Math.floor(data.wind.speed) : null}km/hr</li>
</ul>

</div>

</div>

</div>





</>
  )
}

export default App
