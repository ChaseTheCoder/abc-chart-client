import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [initials, setInitials] = useState('');
  // const [last, setLast] = useState('');

  // const [abcList, setABCList] = useState([]);
  // const [antecedents, setAntecedent] = useState('');
  // const [behaviors, setBehavior] = useState('');
  // const [consequences, setConsequence] = useState('');

  useEffect(() => {  // initial API request to database
    Axios.get('https://abc-chart.herokuapp.com/students/getStudents').then((response) => {
      setStudents(response.data) // sets list of students to current data in API
    })
  }, []);

  const createStudent = () => {
    Axios.post('https://abc-chart.herokuapp.com/students/createStudent', {
      initials, // first: first,-if two are same same just put it once
      // last //last: last  -makes it look better
    }).then((response) => {
      setStudents([...students,
        {
          initials // first: first,-if two are same same just put it once
          // last //last: last  -makes it look better
        }
      ])
    });
  };

  // useEffect(() => {  // initial API request to database
  //   Axios.get('localhost:3001/getABCList').then((response) => {
  //     setABCList(response.data) // sets list of students to current data in API
  //   })
  // }, []);

  // const createABCList = () => {
  //   Axios.post('https://abc-chart.herokuapp.com/createABCList', {
  //     first, // first: first,-if two are same same just put it once
  //     last //last: last  -makes it look better
  //   }).then((response) => {
  //     setABCList([...abcList,
  //       {
  //         antecedents, // first: first,-if two are same same just put it once
  //         behaviors, //last: last  -makes it look better
  //         consequences
  //       }
  //     ])
  //   });
  // };

  return (
    <div className="App">
      <div className="studentDisplay">
        {students.map((student) => {
          return (
            <div>
              <h1>{student.initials}</h1>
            </div>
          );
        })}
      </div>
      <div>
        <input type="text" placeholder='initials of student' onChangeCapture={(event) => {
          setInitials(event.target.value);
        }}/>
        {/* <input type="text" placeholder='last initial' onChangeCapture={(event) => {
          setLast(event.target.value);
        }}/> */}
        <button onClick={createStudent}>Create Student</button>
      </div>
      {/* <div>
        {Object.keys(abcList).map((key) => {
         return (
           <div key={key}>
              <h1>{key}</h1>
              {abcList[key].map((behaviors) => {
                return (
                 <span key={behaviors.id}>{behaviors.title}</span>
                )
               })}
           </div>
         )
       })}
     </div> */}
    </div>
  );
}

export default App;
