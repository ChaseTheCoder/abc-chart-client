import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')

  useEffect(() => {  // initial API request to database
    Axios.get('http://localhost:3001/getStudents').then((response) => {
      setStudents(response.data) // sets list of students to current data in API
    })
  }, []);

  const createStudent = () => {
    Axios.post('http://localhost:3001/createStudent', {
      first, // first: first,-if two are same same just put it once
      last //last: last  -makes it look better
    }).then((response) => {
      setStudents([...students,
        {
          first, // first: first,-if two are same same just put it once
          last //last: last  -makes it look better
        }
      ])
    });
  };

  return (
    <div className="App">
      <div className="studentDisplay">
        {students.map((student) => {
          return (
            <div>
              <h1>First: {student.first}</h1>
              <h1>Last: {student.last}</h1>
            </div>
          );
        })}
      </div>
      <div>
        <input type="text" placeholder='first initial' onChangeCapture={(event) => {
          setFirst(event.target.value);
        }}/>
        <input type="text" placeholder='last initial' onChangeCapture={(event) => {
          setLast(event.target.value);
        }}/>
        <button onClick={createStudent}>Create Student</button>
      </div>
    </div>
  );
}

export default App;
