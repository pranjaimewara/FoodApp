import React, { Component } from 'react';

interface Props {
    input: string,
    addItem: string,
    deleteItem: string
}
class ToDoController extends Component {
    state = {
        addItem: true,
        deleteItem: true
    }

    addData = () => {
        this.setState({addItem: value})
    }
}



export default ToDoController;