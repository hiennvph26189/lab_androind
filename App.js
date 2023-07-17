import { StatusBar } from 'expo-status-bar';
import {React,useState,useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button , ScrollView} from 'react-native';
import axios from "axios";
import {post} from "./api"
export default function App() {
  const [tenkhachhang, setName]= useState("");
  const [sdt, setPhone]= useState("");
  const [email, setEmail]= useState("");
  const [diachi, setDiachi]= useState("");
  const [arrThongTin, setArrThongTin]= useState([]);
  useEffect(()=>{
    getArr();
    
  },)

  getArr =async()=>{
    await axios.get("https://shoponline1231.000webhostapp.com/getThongTin.php").then(res=>{
        setArrThongTin(res.data);
    }).catch(err=>{console.log(err)});
  }
   submit = async()=>{
    
   var bodyFormData = new FormData();
   bodyFormData.append('tenkhachhang', tenkhachhang);
   bodyFormData.append('sdt', sdt);
   bodyFormData.append('email', email);
   bodyFormData.append('diachi', diachi);
   
   axios({
    method: "post",
    url: "https://shoponline1231.000webhostapp.com/thongtinkhachhang.php",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
     if(response.data.status == "success"){
        setName("")
        setDiachi("")
        setEmail("")
        setPhone("")
        getArr()
        console.log(arrThongTin)
     }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  //  await  axios.post("https://shoponline1231.000webhostapp.com/thongtinkhachhang.php",bodyFormData).then(res =>{
  //   console.log(res.data)
  //   }).catch(err=> console.log(err))
  }
  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", paddingTop:10,alignItems:"center"}}>
        <Text>Họ va tên: </Text>
        <TextInput
          placeholder='Nhập tên'
          value={tenkhachhang}
          onChangeText={(text)=>setName(text)}
        />
      </View>
      <View style={{flexDirection:"row", paddingTop:10,alignItems:"center"}}>
        <Text>Phone: </Text>
        <TextInput
          placeholder='Nhập Số điện thoại'
          value={sdt}
          keyboardType='number-pad'
          onChangeText={(text)=>setPhone(text)}
        />
      </View>
      <View style={{flexDirection:"row", paddingTop:10,alignItems:"center"}}>
        <Text>Email: </Text>
        <TextInput
          placeholder='Nhập Email'
          value={email}
          onChangeText={(text)=>setEmail(text)}
        />
      </View>
      <View style={{flexDirection:"row", paddingTop:10,alignItems:"center"}}>
        <Text>Địa chỉ: </Text>
        <TextInput
          placeholder='Nhập Địa chỉ'
          value={diachi}
          onChangeText={(text)=>setDiachi(text)}
        />
      </View>
      <Button
        onPress={()=>{submit()}}
        title="Post"
        color="#841584"
        
      />
      <ScrollView>
        
          {arrThongTin.map(item=>{
            return(
              <View key={item.id} style={{marginBottom:20}}>
              <Text>Tên: {item.tenkhachhang}</Text>
              <Text>SĐT: {item.sdt}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Địa chỉ: {item.diachi}</Text>
            </View> 
            )
                  
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:20,
    backgroundColor: '#fff',
  
  },
});
