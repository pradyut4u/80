import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import db from '../config.js'
import {MyHeader} from '../Components/myHeader.js'

export default class ItemRequest extends React.Component{
	constructor(){
		super()
		this.state={
			userId:firebase.auth().currentUser.email,
			itemName: '',
			reason: ''
		}
	}
	uniqueId(){
		return(
			Math.random().toString(36).substring(7)
		)
	}
	addRequest = (itemName,reason) =>{
		var userId=this.state.userId
		var requestId=this.uniqueId()
		db.collection('requestedItems').add({
		userId:userId,itemName:itemName,reason:reason,requestId:requestId})
		this.setState({
			itemName:'',
			reason:''
		})
		return(
			alert("Item requested Succesfully")
		)
	}
	render(){
		return(
			<View>
			<KeyboardAvoidingView>
			<MyHeader title='Donete books' navigation={this.props.navigation}/>
			<TextInput placeholder="Item name" onChangeText={text=>{this.setState({itemName:text})}} value={this.state.itemName}/>
			<TextInput placeholder="Reason" multiline numberOfLines={5} onChangeText={text=>{this.setState({reason:text})}} value={this.state.reason}/>
			<TouchableOpacity onPress={()=>{this.addRequest(this.state.itemName,this.state.reason)}}>
			<Text>Request</Text>
			</TouchableOpacity>
			</KeyboardAvoidingView>
			</View>
		)
	}
}