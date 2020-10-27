import React, {useState} from 'react';
import './App.css';
import Person from './Person/Person';

const App = (props) => {
    const [personsState, setPersonsState] = useState({
        persons: [
            {name: 'Giannis', age: 37},
            {name: 'Giorgos', age: 37},
            {name: 'Eleutheria', age: 36}
        ]
    });

    const otherState = useState(`Some other values`);

    console.log(personsState, otherState);

    const switchNameHandler = (newName) => {
        // console.log(`Was clicked!`);
        // DON'T DO THIS: this.state.persons[0].name = 'Ioannis';
        setPersonsState({
            persons: [
                {name: newName, age: 37},
                {name: 'Giorgos', age: 37},
                {name: 'Eleutheria', age: 26}
            ],
            otherState: personsState.otherState
        })
    }

    const nameChangedHandler = (event) => {
        setPersonsState({
            persons: [
                {name: 'Giannis', age: 37},
                {name: event.target.value, age: 37},
                {name: 'Eleutheria', age: 26}
            ],
            otherState: personsState.otherState
        })
    }

    const style = {
        backgroundColor: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
    }

    return (
        <div className="App">
            <h1>Hi, I am a React App</h1>
            <p>This is really working</p>
            <button
                style={style}
                onClick={() => switchNameHandler('Ioannis')}
            >Switch Name
            </button>
            <Person
                name={personsState.persons[0].name}
                age={personsState.persons[0].age}/>
            <Person
                name={personsState.persons[1].name}
                age={personsState.persons[1].age}
                click={switchNameHandler.bind(this, 'Giannis!')}
                changed={nameChangedHandler}
            >My Hobbies: Racing </Person>
            <Person
                name={personsState.persons[2].name}
                age={personsState.persons[2].age}/>
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m a React App!!!'));
}

export default App;