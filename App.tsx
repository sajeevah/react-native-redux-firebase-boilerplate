import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
class App extends Component {
  state = {count: 0};

  decrementCount() {
    let {count} = this.state;
    count--;
    this.setState({
      count,
    });
  }

  incrementCount() {
    let {count} = this.state;
    count++;
    this.setState({
      count,
    });
  }

  render() {
    const {count} = this.state;

    return (
      <View styles={styles.container}>
        <Button title="increment" onPress={() => this.incrementCount()} />
        <Text>{count}</Text>
        <Button title="decrement" onPress={() => this.decrementCount()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
