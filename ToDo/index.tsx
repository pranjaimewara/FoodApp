import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [], // List of ToDos
            input: '', // Current input value
        };
    }

    // Method to handle input changes
    handleInputChange = (text) => {
        this.setState({ input: text });
    };

    // Method to add a new ToDo
    addTodo = () => {
        const { input, todos } = this.state;
        if (input.trim()) {
            this.setState({
                todos: [...todos, input],
                input: '', // Clear the input after adding
            });
        }
    };

    // Render each ToDo item
    renderTodo = ({ item }) => (
        <View style={styles.todoItem}>
            <Text>{item}</Text>
        </View>
    );

    render() {
        const { todos, input } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>ToDo List</Text>
                <TextInput
                    style={styles.input}
                    value={input}
                    onChangeText={this.handleInputChange}
                    placeholder="Add new todo"
                    placeholderTextColor="gray"
                />
                <Button title="Add ToDo" onPress={this.addTodo} />
                <FlatList
                    data={todos}
                    renderItem={this.renderTodo}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    todoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default TodoList;
