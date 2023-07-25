import { StatusBar } from 'expo-status-bar';
import {React,useState,useEffect} from "react";
import { StyleSheet, Text, View, TextInput, Button , ScrollView,Pressable, TouchableOpacity} from 'react-native';
import axios from "axios";

export default function App() {
  const [tenkhachhang, setName]= useState("");
  const [sdt, setPhone]= useState("");
  const [email, setEmail]= useState("");
  const [diachi, setDiachi]= useState("");
  const [arrThongTin, setArrThongTin]= useState([]);
  const [id, setId]= useState(0);

  

  useEffect(()=>{
    getArr();
   
  },[])
  const addData = (dataAdd)=>{
    let datax = JSON.stringify(dataAdd);
    
    axios.post("https://memitshop.store/api/donhang",datax).then(res=>{
      setName("")
      setDiachi("")
      setEmail("")
      setPhone("")
      getArr()
    }).catch(err=>{console.log(err)});
  } 
  const UpdateItem = ()=>{
    dataAdd={
      fullname:tenkhachhang,
      phone:sdt,
      email:email,
      address:diachi,
      status:1
    }
    let datax = JSON.stringify(dataAdd);
    
    axios.put("https://memitshop.store/api/donhang/"+id,datax).then(res=>{
      setName("")
        setDiachi("")
        setId(0)
        setEmail("")
        setPhone("")
        getArr()
    }).catch(err=>{console.log(err)});
  }  
  // const deleteData = ()=>{
   
  //   axios.delete("https://memitshop.store/api/donhang/"+id).then(res=>{
  //     console.log(res.data)
  //   }).catch(err=>{console.log(err)});
  // }
  getArr =async()=>{
     axios.get("https://memitshop.store/api/donhang").then(res=>{
      
     setArrThongTin(res.data.data)
    }).catch(err=>{console.log(err)});
    
  }
   submit = async()=>{ 
   
    addData({
      fullname:tenkhachhang,
      phone:sdt,
      email:email,
      address:diachi,
      status:1
    })


  }
  
  DeleteItem = async()=>{
    if(id>0){
      axios.delete("https://memitshop.store/api/donhang/"+id).then(res=>{
        setName("")
        setDiachi("")
        setId(0)
        setEmail("")
        setPhone("")
        getArr()
      }).catch(err=>{console.log(err)});
    }
   
   
  }
  getText =(id)=>{
    arrThongTin.map((item)=>{
        if(item.id == id){
          setName(item.fullname)
          setDiachi(item.address)
          setEmail(item.email)
          setPhone(item.phone)
          setId(item.id.toString())
        }
    })
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
      <View style={{display:"none"}}>
      <TextInput
          placeholder='Nhập tên'
          value={id}
          onChangeText={(text)=>setId(text)
          }
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
      <View style={{flexDirection:"row", paddingTop:10,alignItems:"center",justifyContent:"center"}}>
    

      <TouchableOpacity
        onPress={()=>{submit()}}
       
       
        style={{ marginRight: 10, padding: 10, backgroundColor:"#841584",borderRadius:5}}
      ><Text style={{color: '#fff'}}>POST</Text>
      </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>{getArr()}}
        style={{ marginRight: 10, padding: 10, backgroundColor:"#841584",borderRadius:5}}
      >
        <Text style={{color: '#fff'}}>GET</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>{UpdateItem()}}
        style={{ marginRight: 10, padding: 10, backgroundColor:"#841584",borderRadius:5}}
      >
        <Text style={{color: '#fff'}}>UPDATE</Text>
        </TouchableOpacity>

       <TouchableOpacity
        onPress={()=>{DeleteItem()}}
        style={{ marginRight: 10, padding: 10, backgroundColor:"#841584",borderRadius:5}}
      >
        <Text style={{color: '#fff'}}>DELETE</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        
          {arrThongTin.map(item=>{
            return(
              <TouchableOpacity key={item.id} style={{marginBottom:20}} onPress={()=>{getText(item.id)}} >
              <Text>Tên: {item.fullname}</Text>
              <Text>SĐT: {item.phone}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Địa chỉ: {item.address}</Text>
            </TouchableOpacity> 
            )

          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:30,
    backgroundColor: '#fff',
  
  },
});
