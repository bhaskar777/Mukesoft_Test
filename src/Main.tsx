import React, { Component } from 'react'
import { SafeAreaView, View, StyleSheet, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';


interface MainProps {

}

interface MainState {
    activeIndex: number,
    dataSource: []

}

class Main extends Component<MainProps, MainState> {
    private _carousel: Carousel<unknown> | null | undefined;


    constructor(props: any) {
        super(props);
        this.state = {
            activeIndex: 0,
            dataSource: []

        }
        this._renderItem = this._renderItem.bind(this)

    };

    componentDidMount() {
        fetch("http://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson
                })
            })
            .catch(error => console.log(error))
    }



    _renderItem({ item, index }: any) {

        return (
            <View style={
                styles.dataView
            }>
                <Text  style={[styles.titleText, {textTransform:'capitalize'}]}>{item.title}</Text>
                <Text style={[styles.bodyText, {marginTop:24, textTransform:'capitalize'}]}>{item.body}</Text>
            </View>

        )
    }
    render() {
        console.log('====================================');
        console.log(this.state.dataSource);
        console.log('====================================');

        return (
            <SafeAreaView style={styles.container}>

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={300}
                />



            </SafeAreaView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dataView: {
        borderRadius: 12,
        backgroundColor: 'floralwhite',
        height: 350,
        padding: 50,
        marginTop:24
    },
    titleText:{
        fontSize:14,
        
    },
    bodyText:{
        fontSize:12,
        
    }
})

export default Main;