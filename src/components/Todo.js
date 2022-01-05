import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../api"

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      jobs:[]
    };
    this.getUserInput = this.getUserInput.bind(this);
    this.addJob = this.addJob.bind(this);

  }
  getUserInput(val) {
    this.setState({userInput: val.target.value});
  }
  componentDidMount(){
    let jobsString =api.getJobs()

    jobsString.then(json=>{
      let jsonString=JSON.stringify(json);
      var jobs = JSON.parse(jsonString);
      if (jobs!==null){
        this.setState({jobs: jobs})
      }
    });
  };
  createData(id, body) {
    return { id, body};
  }
  addJob() {
    if(this.state.userInput===""){
      alert("Job body cant be null")
    }else{
      let job = this.createData(this.state.jobs.length+1, this.state.userInput);
      api.storeJob({body:this.state.userInput})
      this.state.jobs.push(job)
      this.setState({jobs: this.state.jobs})
      this.setState({userInput: ""})
    }
  }
  render(){
    return ( <div>
        <h1>Todo List</h1>
        <input title="input-text" type="text" placeholder="Write Your Job" value={this.state.userInput} onChange={this.getUserInput}/>
        <button onClick={this.addJob}>Add</button>
        <TableContainer component={Paper}>
      <Table title="table" sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell title='IDCol'>ID</TableCell>
            <TableCell title='BodyCol' align="right">Body</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.jobs.map((job,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                {job.id}
              </TableCell>
              <TableCell align="right">{job.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div> 
    );
}}
 
export default Todo;