import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from "../hoc/withClass";
import Auxiliary from "../hoc/Auxiliary";
import AuthContext from '../context/auth-context';

class App extends Component {
    constructor( props ) {
        super(props);
        console.log('[App.js] constructor');
    }

    state = {
        persons: [
            {id: 'asfa1', name: 'Giannis', age: 37},
            {id: 'vasdf1', name: 'Giorgos', age: 37},
            {id: 'asdf11', name: 'Eleutheria', age: 37}
        ],
        otherState: 'some other value',
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        authenticated: false,
    };

    static getDerivedStateFromProps( props, state ) {
        console.log('[App.js] getDerivedStateFromProps', props);
        return state;
    }

    componentWillMount() {
        console.log('[App.js] componentWillMount');
    }

    componentDidMount() {
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate( nextProps, nextState, nextContext ) {
        console.log(`[App.js] shouldComponentUpdate`);
        return true;
    }

    componentDidUpdate( prevProps, prevState, snapshot ) {
        console.log(`[App.js] componentDidUpdate`);
    }

    nameChangedHandler = ( event, id ) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        // const person = Object.assign({}, this.state.persons[personIndex]);

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState(( prevState, props ) => {
            return {
                persons: persons,
                changeCounter: prevState.changeCounter + 1
            }
        });
    };

    deletePersonHandler = personIndex => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    loginHandler = () => {
        this.setState({authenticated: true})
    };

    render() {
        console.log('[App.js] render');
        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                    isAuthenticated={this.state.authenticated}
                />
            );
        }

        return (
            <Auxiliary>
                <button onClick={() => {
                    this.setState({showCockpit: false})
                }}>Remove Cockpit
                </button>
                <AuthContext.Provider value={
                    {
                        authenticated: this.state.authenticated,
                        login: this.loginHandler
                    }
                }>
                    {this.state.showCockpit ?
                        <Cockpit
                            title={this.props.appTitle}
                            showPersons={this.state.showPersons}
                            personsLength={this.state.persons.length}
                            clicked={this.togglePersonsHandler}
                        />
                        : null}
                    {persons}
                </AuthContext.Provider>
            </Auxiliary>
        );
        // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
    }
}

export default withClass(App, classes.App);
