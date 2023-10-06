/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { decrement, increment } from './src/features/counter/counterSlice';
import { connect } from 'react-redux';
import { RootState } from './src/app/store';
class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      header: '',
      description: '',
    };
  }

  incrementCount = () => {
    this.props.dispatch(increment());
  };

  decrementCount = () => {
    this.props.dispatch(decrement());
  };

  handleHeaderChange = (text: any) => {
    this.setState({ header: text });
  };

  handleDescriptionChange = (text: any) => {
    this.setState({ description: text });
  };

  handleSubmit = () => {
    console.log('Header:', this.state.header);
    console.log('Description:', this.state.description);
  };

  render() {
    return (
      <SafeAreaView>
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={styles.textBox}
            placeholder="Header"
            onChangeText={this.handleHeaderChange}
            value={this.state.header}
          />
          <TextInput
            style={styles.textBox}
            placeholder="Description"
            multiline
            onChangeText={this.handleDescriptionChange}
            value={this.state.description}
          />
          <Button title="Submit" onPress={this.handleSubmit} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    count: state.counter.value,
  };
};

export default connect(mapStateToProps)(App);

// const mapStateToProps = (state) => {
//   return {
//     count: state.counter.value
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     increment: () => dispatch(increment()),
//     decrement: () => dispatch(decrement())
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);
