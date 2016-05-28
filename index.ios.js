'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import formatTime from 'minutes-seconds-milliseconds';
    
var stopwatch = React.createClass({
    getInitialState() {
        return {
            timeElapsed: null,
            running: false,
            startTime: null,
            laps: []
        }
    },
    render() {
        return <View style={styles.container}> 
                <View style={styles.header}>
                    <View style={styles.timerWrapper}> 
                        <Text style={styles.timer}>{formatTime(this.state.timeElapsed)}</Text>
                    </View>
                
                    <View style={styles.buttonWrapper}>
                        {this.startStopButton()}
                        {this.lapButton()}
                    </View>         
                </View> 
             
                <View style={styles.footer}>
                    {this.laps()}     
                </View>
        </View>
    },
    laps() {
      return this.state.laps.map((time, index) => {
      return <View key={index} style={styles.lap}>
      <Text style={styles.lapText}>Lap #{index + 1}</Text>
      <Text style={styles.lapText}>{formatTime(time) + ""}</Text>
        </View>
      });
    },
    startStopButton() {
    
       let style = this.state.running ? styles.stopButton : styles.startButton;
        
       return <TouchableHighlight 
       underlayColor="gray" 
       onPress={this.handleStartPress}
       style={[styles.button, styles.startButton, style]}   
           >
            <Text>{ this.state.running ? 'Stop': 'Start'}</Text> 
           </TouchableHighlight> 
    },
    lapButton() {
        return <TouchableHighlight style={styles.button} underlayColor="gray" onPress={this.handleLapPress}>
            <Text>Lap</Text> 
           </TouchableHighlight>   
    },
    handleLapPress() {
      let lap = this.state.timeElapsed;
      this.setState({
          startTime: new Date,
          laps: this.state.laps.concat([lap])
      })
    },
    handleStartPress() {
        
        if(this.state.running) {
            clearInterval(this.interval);
            this.setState({
               running: false 
            });
            return

        }
        
        this.setState({startTime: new Date()});
        
        this.interval = setInterval(() => {
            this.setState({
                timeElapsed: new Date() - this.state.startTime,
                running: true
            });      
        }, 30);

    }
}) 
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 1, 
  },
  footer: {
    flex: 1,
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timer: {
      fontSize: 60,
  },
  button: {
      borderWidth: 2,
      height: 100,
      width: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
  startButton: {
      borderColor: '#00CC00',
  },
  stopButton: {
      borderColor: '#CC0000'
  },
  lap: {
      flexDirection: 'row',
      justifyContent: 'space-around'
  },
  lapText: {
      fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => stopwatch);
