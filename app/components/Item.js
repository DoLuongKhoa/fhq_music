import React from 'react';
import { View, Text, Image, ScrollView, Keyboard,TouchableOpacity, AsyncStorage } from 'react-native';
import styles from './ComponentStyles/Item';
import PropTypes from 'prop-types';

export default class Item extends React.Component {
  constructor(props){
    super(props);
  }
  pressItem = index => {
    if (this.props.type === 'song'){
      this.playSong(index);
    } else {
      this.props.navigate('PlaylistComponent', {type: this.props.type, data: this.props.data[index]});
    }
  }

  render(){
    return(  
      <View style={[styles.itemArea, this.props.itemAreaStyle]}>
        <Text style={[styles.titleText, this.props.titleTextStyle]}>{this.props.category}</Text>
        <ScrollView 
          horizontal={this.props.horizontal}
          onScroll={Keyboard.dismiss}
          scrollEventThrottle={0}
          pagingEnabled={this.props.pagingEnabled}
          scrollEnabled={this.props.scrollEnabled}
        >
          {this.props.data.map((item, index) => (
            <TouchableOpacity key={index.toString()} activeOpacity={0.5} onPress={() => this.pressItem(index)}>
              <View style={[styles.item, this.props.itemStyle]}>
                <Image style={[styles.itemPicture, this.props.itemPictureStyle]} source={{
                  uri: item.picture,
                }}/>
                <Text style={[styles.itemName, this.props.itemNameStyle]}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
      </View>     
    )
  }
}

Item.propTypes = {
  itemAreaStyle: PropTypes.object,
  titleTextStyle: PropTypes.object,
  category: PropTypes.string,
  horizontal: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
  data: PropTypes.array.isRequired,
  itemStyle: PropTypes.object,
  itemPictureStyle: PropTypes.object,
  itemNameStyle: PropTypes.object
}

Item.defaultProps = {
  horizontal: false,
  scrollEnabled: true,
  pagingEnabled: true,
  data: [],
}
