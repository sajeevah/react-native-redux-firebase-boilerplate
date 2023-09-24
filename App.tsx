import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  decrementCount() {
    this.setState((prevState: any) => ({
      count: prevState.count - 1,
    }));
  }

  incrementCount() {
    this.setState((prevState: any) => ({
      count: prevState.count + 1,
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="increment" onPress={() => this.incrementCount()} />
        <Text>{this.state.count}</Text>
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
