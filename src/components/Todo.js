import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Todo() {
  
  const[userInput,setData] = useState("");
  const[jobs,setJobs] = useState([]);

  function createData(ID, body) {
    return { ID, body};
  }
  
  function getUserInput(val){
    setData(val.target.value);
    console.warn(val.target.value);
  };
  function addJob() {
    if(userInput==""){
      alert("Job body cant be null")
    }else{
      let job = createData(jobs.length, userInput);
      jobs.push(job)
      setJobs(jobs)
      let userValueOk="";
      setData(userValueOk);
    }
    
}
    return ( <div>
        <h1>Todo List</h1>
        <input title="input-text" type="text" placeholder="Write Your Job" value={userInput} onChange={getUserInput}/>
        <button onClick={addJob}>Add</button>
        <TableContainer component={Paper}>
      <Table title="table" sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell title='IDCol'>ID</TableCell>
            <TableCell title='BodyCol' align="right">Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {job.ID}
              </TableCell>
              <TableCell align="right">{job.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div> 
    );
}
 
export default Todo;