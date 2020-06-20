import React from 'react';
import { SafeAreaView, View, ScrollView, StatusBar } from 'react-native';
import styles from '../styles/Home';
import SearchBar from '../components/SearchBar';
import Item from '../components/Item';
import {singerData, playListData, topicData, forYou} from '../data/data';
import MiniPlayer from '../components/MiniPlayer';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        singer: [],
        playlist: [],
        the_loai: []
    };
}

componentDidMount() {
  return fetch("http://192.168.1.253:5000/home")
      .then(response => response.json())
      .then(data => this.setState({
          singer: data.ca_si,
          playlist: data.playlist,
          the_loai: data.the_loai
      }));
}


  render(){
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: '#33AFFF', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <StatusBar barStyle="default" translucent/>
            <View>
              <SearchBar navigation={this.props.navigation}/>
            </View>
            <ScrollView style={styles.scrollView}>
              <Item
                category="Dành cho bạn"
                data={forYou}
                horizontal={true}
                itemAreaStyle={styles.suggestArea}
                itemPictureStyle={styles.suggestPicture}
                itemNameStyle={styles.suggestText}
                itemStyle={styles.suggestStyle}
              />
              <Item 
                category="Playlist"
                data={this.state.playlist}
                horizontal={true}
                scrollEnabled={false}
              />
              <Item 
                category="Ca sĩ" 
                data={this.state.singer}
                horizontal={true}
                scrollEnabled={true}
                itemPictureStyle={styles.singerPictureStyle}
                itemStyle={styles.singerStyle}
                navigate={this.props.navigation.navigate}

              />
              <Item 
                category="Chủ đề"
                data={this.state.the_loai}
                horizontal={true}
              />
            </ScrollView>
          </View>
          <MiniPlayer navigate={this.props.navigation.navigate}/>
        </View>
      </SafeAreaView>
    );
  }
}
