import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //   console.log(`[Persons.js] getDerivedStateFromProps`);
    //   return state;
    // }

    // Old Hook
    // componentWillReceiveProps(nextProps, nextContext) {
    //     console.log(`[Persons.js] componentWillReceiveProps`, nextProps);
    // }

    // shouldComponentUpdate( nextProps, nextState, nextContext ) {
    //     console.log(`[Persons.js] shouldComponentUpdate`);
    //     return nextProps.persons !== this.props.persons
    //         || nextProps.changed !== this.props.changed
    //         || nextProps.clicked !== this.props.clicked;
    // }

    getSnapshotBeforeUpdate( prevProps, prevState ) {
        console.log(`[Persons.js] getSnapshotBeforeUpdate`);
        return {message: `Snapsot`};
    }

    // Old Hook
    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     console.log(`[Persons.js] componentWillUpdate`, nextProps);
    // }

    // The most used life-hook
    componentDidUpdate( prevProps, prevState, snapshot ) {
        console.log(`[Persons.js] componentDidUpdate`);
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log(`[Persons.js] componentWillUnmount`);
    }

    render() {
        console.log('[Persons.js] rendering...');
        return this.props.persons.map(( person, index ) => {
            return (
                <Person
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={event => this.props.changed(event, person.id)}
                    isAuth={this.props.isAuthenticated}
                />
            );
        });
    }
}

export default Persons;
