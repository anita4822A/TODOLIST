"use client"

import React, { useState } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [desc,setdesc] = useState("")
  const [mainTask,setMainTask] = useState([])   //to create a container where each task will stored when you add
  
  
const submitHandler = (e) => {
 e.preventDefault()   //this method is inbuilt in react to use to prevent the page reload
 setMainTask([...mainTask, {title,desc}])
 settitle("")
 setdesc("")
 console.log(mainTask)
};

const deleteHandler = (i) => {
 let copyTask = [...mainTask]
 copyTask.splice(i,1)
 setMainTask(copyTask)
};

const completeHandler = (i) => {
  let copyTask = [...mainTask];
  copyTask[i].completed = true;
  setMainTask(copyTask);
};

const editHandler = (i, newTitle, newDesc) => {
  let copyTask = [...mainTask];
  copyTask[i].title = newTitle;
  copyTask[i].desc = newDesc;
  setMainTask(copyTask);
};


let renderTask = null;

if(mainTask.length>0) {
renderTask = mainTask.map((t, i) => {
  return ( 
    <li key={i} className='flex items-center justify-between mb-5'>

      <div className='flex items-start justify-between mb-5 w-2/3'>
      
    <h5 className='text-2xl font-semibold'>{t.title}</h5>
    <h6 className='text-xl font-medium'>{t.desc}</h6>
  </div>
  <div>
            {!t.completed ? (
              <button
                onClick={() => completeHandler(i)}
                className='bg-green-400 text-white py-2 px-4 rounded font-bold mr-4'
              >
                Complete
              </button>
            ) : (
              <span className='text-green-500 font-bold'>Completed</span>
            )}
            <button
              onClick={() => {
                deleteHandler(i);
              }}
              className='bg-red-400 text-white py-2 px-4 rounded font-bold mr-4'
            >
              Delete
            </button>

            <button
              onClick={() => {
                const newTitle = prompt('Enter new title:', t.title);
                const newDesc = prompt('Enter new description:', t.desc);
                if (newTitle !== null && newDesc !== null) {
                  editHandler(i, newTitle, newDesc);
                }
              }}
              className='bg-blue-400 text-white py-2 px-4 mr-4 rounded font-bold'
            >
              Edit
            </button>
          </div>
 
</li>
  
  );

    
});
}else {
  renderTask = <h2 className='text border-zinc-800'>No Task Available</h2>
}

  return (
   <>
   <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>MY TODOLIST</h1>
   <form onSubmit={submitHandler}>
     <input type='text' className='text border-zinc-800 border-2 m-8 px-4 py-2'
     placeholder='Enter Title here'
     value={title}
     onChange={(e)=>{
      settitle(e.target.value)
     }}/> 
     <input type='text' className='text border-zinc-800 border-2 m-8 px-4 py-2'
     placeholder='Enter Description here'
     value={desc}
     onChange={(e)=>{
      setdesc(e.target.value)
     }}
     /> 
     
     <button className='bg-black text-white px-4 py-2 font-bold rounded m-5'> Add Task
      </button>
   </form>
   <hr />
   <div className='p-8 bg-slate-200'>
    <ul>
      {renderTask}
    </ul>
   </div>
   </>
  )
}

export default page