import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeCount} from './src/actions/counts';

class App extends React.Component<any, any> {
  decrementCount() {
    console.log('sajeeva : ', this.props);
    let {count, actions} = this.props;
    count.count--;
    // actions.changeCount(count.count);
  }

  incrementCount() {
    console.log('hasith : ', this.props);
    let {count, actions} = this.props;
    count.count++;
    // actions.changeCount(count.count);
  }

  render() {
    const {count} = this.props;

    return (
      <View styles={styles.container}>
        <Button title="increment" onPress={() => this.incrementCount()} />
        <Text>{count.count}</Text>
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

const mapStateToProps = (state: any) => state.count;

const ActionCreators = Object.assign({}, changeCount);

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
