const con=require('./connect')
const express=require('express')
const validator=require('validator')
const fs=require('fs')
const path=require('path')
const utf8=require('utf8')
const app=express()
const port = process.env.PORT ||3000

const publicdir=path.join(__dirname,'../photos')
const publicdir_profile=path.join(__dirname,'../profilepic')
app.use(express.static(publicdir))
app.use(express.static(publicdir_profile))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: true}))



app.post('/api/signup',(req,res)=>{
        var name1=req.body.name
        var email1=req.body.email
       if (validator.isEmail(email1)){
        var sql = "INSERT INTO signup (name, email) VALUES (?,?)";
        con.query(sql,[name1,email1] ,function (err, result) {
          if (err) throw err;
          res.send(result);
          }) 
       }
       else{
        res.send("not an email");
           console.log('not an email');
       }
})



app.post('/api/signup/:id/phone_num',(req,res)=>{
    var id=req.params.id;
    var phone_num=req.body.phone_num
      var sql = `INSERT INTO phone_number(phone_num,user_id) VALUES (?,?)`;
    con.query(sql,[phone_num,id],function (err, result) {
      if (err) throw err;
      res.send(result);
      })   
})

app.get('/api/signup/name/home1',(req,res)=>{
  var sql = `SELECT * FROM items`;
con.query(sql,function (err, result) {
  if (err) throw err;
  res.send(result);
  })   
})

app.get('/api/signup/items/image/:item_id',(req,res)=>{
  var id1=req.params.item_id;
  var user1;
    var sql = `SELECT user_id FROM items WHERE item_id="${id1}"`;
    con.query(sql,function (err, result) {
      if (err) throw err;
      user1=(result[0].user_id);
      console.log(user1);
      if (err) throw err;
var sql = `SELECT * FROM profilepic where user_id=${user1}`;
con.query(sql,function (err, result) {
if (err) throw err;
res.send(result);
})   
 })
 })

 app.get('/api/signup/items/image/name/:item_id',(req,res)=>{
  var id1=req.params.item_id;
  var user7;
    var sql = `SELECT user_id FROM items WHERE item_id="${id1}"`;
    con.query(sql,function (err, result) {
      if (err) throw err;
      user7=(result[0].user_id);
      console.log(user7);
      if (err) throw err;
var sql = `SELECT * FROM signup where user_id=${user7}`;
con.query(sql,function (err, result) {
if (err) throw err;
res.send(result);
})   
 })
 })

 app.get('/api/signup/items/login/:phone_num',(req,res)=>{
  var phone_number_user=req.params.phone_num;
  var user7;
    var sql = `SELECT user_id FROM phone_number WHERE phone_num="${phone_number_user}"`;
    con.query(sql,function (err, result) {
      if (err) throw err;
      user7=(result[0].user_id);
      console.log(user7);
      if (err) throw err;
var sql = `SELECT * FROM signup where user_id=${user7}`;
con.query(sql,function (err, result) {
if (err) throw err;
res.send(result);
})   
 })
 })


 app.get('/api/signup/items/image/phone/:item_id',(req,res)=>{
  var id2=req.params.item_id;
  var user9;
    var sql = `SELECT user_id FROM items WHERE item_id="${id2}"`;
    con.query(sql,function (err, result) {
      if (err) throw err;
      user9=(result[0].user_id);
      console.log(user9);
      if (err) throw err;
var sql = `SELECT * FROM phone_number where user_id=${user9}`;
con.query(sql,function (err, result) {
if (err) throw err;
res.send(result);
})   
 })
 })



app.get('/api/signup/name/profileget/:email',(req,res)=>{
  var email1=req.params.email;
        var user;
          var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
        con.query(sql,function (err, result) {
          if (err) throw err;
          user=(result[0].user_id);
          console.log(user);
          var user_id=user;
          console.log(user_id);
  var sql = `SELECT * FROM profilepic where user_id=?`;
con.query(sql,user_id,function (err, result) {
  if (err) throw err;
  res.send(result);
  })   
})
})


app.get('/api/signup/name/profileget/name/:email',(req,res)=>{
  var email1=req.params.email;
        var user6;
          var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
        con.query(sql,function (err, result) {
          if (err) throw err;
          user6=(result[0].user_id);
          console.log(user6);
          var user_id=user6;
          console.log(user_id);
  var sql = `SELECT * FROM signup where user_id=?`;
con.query(sql,user_id,function (err, result) {
  if (err) throw err;
  res.send(result);
  })   
})
})

app.post('/api/signup/:id/items',(req,res)=>{
    var user_id=req.params.id;
    var price=req.body.price;
    var category=req.body.category;
    var description=req.body.description;
    var photo_url=req.body.photo_url;
    var item=req.body.item;
    var hostelblocks=req.body.hostelblocks;

    var sql=`INSERT INTO items(price,category,description,photo_url,item,user_id,hostel_block) VALUES (?,?,?,?,?,?,?)`;
    con.query(sql,[price,category,description,photo_url,item,user_id,hostelblocks],function (err, result) {
        if (err) throw err;
        res.send(result);
        })

})




app.get('/api/signup/:id',(req,res)=>{
    var id=req.params.id;
      var sql = `SELECT * FROM signup WHERE user_id=${id}`;
    con.query(sql,function (err, result) {
      if (err) throw err;
      res.send(result);
      })   
})

app.get('/api/signup/:id/phone_num',(req,res)=>{
    var id=req.params.id;
      var sql = `SELECT * FROM phone_number WHERE user_id=${id}`;
    con.query(sql,function (err, result) {
      if (err) throw err;
      res.send(result);
      })   
})


app.get('/api/signup/:id/items',(req,res)=>{
    var id=req.params.id;
      var sql = `SELECT * FROM items WHERE user_id=${id}`;
    con.query(sql,function (err, result) {
      if (err) throw err;
      res.send(result);
      })   
})

app.get('/api/signup/name/:email',(req,res)=>{
  var email1=req.params.email;
    var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
  con.query(sql,function (err, result) {
    if (err) throw err;
    console.log(result[0].user_id);
    res.send(result[0]);
    })   
})


app.post('/api/signup/name/user/:email',(req,res)=>{
  var email1=req.params.email;
  var user;
    var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
  con.query(sql,function (err, result) {
    if (err) throw err;
    user=(result[0].user_id);
    console.log(user);
    var random_num=Math.floor(
      Math.random() * (999 - 0) + 0
    )
    var random_number=random_num;
    console.log(random_number);
    var price=req.body.price;
    var category=req.body.category;
    var description=req.body.description;
    var b64string1=req.body.photo_url1;
    var b64string2=req.body.photo_url2;
    var b64string3=req.body.photo_url3;
    var item=req.body.item;
    var hostelblocks=req.body.hostel_block;
    var user_id=user;
    console.log(user_id);
    var buf1 = Buffer.from(b64string1, 'base64');
    var buf2 = Buffer.from(b64string2, 'base64');
    var buf3 = Buffer.from(b64string3, 'base64');
    var pathpic1=`../photos/image1${item}${user_id}${random_number}.jpg`
    var pathpic2=`../photos/image2${item}${user_id}${random_number}.jpg`
    var pathpic3=`../photos/image3${item}${user_id}${random_number}.jpg`
    var pathpicture1=`image1${item}${user_id}${random_number}.jpg`
    var pathpicture2=`image2${item}${user_id}${random_number}.jpg`
    var pathpicture3=`image3${item}${user_id}${random_number}.jpg`
    fs.writeFileSync(pathpic1,buf1);
    fs.writeFileSync(pathpic2,buf2);
    fs.writeFileSync(pathpic3,buf3);
    
    var sql=`INSERT INTO items(price,category,description,photo_url1,photo_url2,photo_url3,item_name,user_id,hostel_block,random_number) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    con.query(sql,[price,category,description,pathpicture1,pathpicture2,pathpicture3,item,user_id,hostelblocks,random_number],function (err, result) {
        if (err) throw err;
        res.send(result);
        })
    })   
   

})

app.post('/api/signup/name/phone_num/:email',(req,res)=>{
  var email1=req.params.email;
  var user8;
    var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
  con.query(sql,function (err, result) {
    if (err) throw err;
    user8=(result[0].user_id);
    console.log(user8);
    var phone_num=req.body.phone_num;
    var user_id=user8;
    console.log(user_id);
    
    var sql=`INSERT INTO phone_number(phone_num,user_id) VALUES (?,?)`;
    con.query(sql,[phone_num,user_id],function (err, result) {
        if (err) throw err;
        res.send(result);
        })
    })   
   

})






app.get('/api/signup/name/profile/:email',(req,res)=>{
  var email1=req.params.email;
  var user2;
    var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
  con.query(sql,function (err, result) {
    if (err) throw err;
   user2=(result[0].user_id);
    console.log(user2);
    var sql=`SELECT * FROM items WHERE user_id=${user2}`;
    con.query(sql,function (err, result) {
        if (err) throw err;
        res.send(result);
        })
    })   
    })   


    app.get('/api/signup/name/home/:email',(req,res)=>{
      var email1=req.params.email;
      var user2;
        var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
      con.query(sql,function (err, result) {
        if (err) throw err;
       user2=(result[0].user_id);
        console.log(user2);
        var sql=`SELECT * FROM items WHERE user_id=${user2}`;
        con.query(sql,function (err, result) {
            if (err) throw err;
            res.send(result);
            })
        })   
        })
        
        app.delete('/api/signup/items/:item_id',(req,res)=>{
          var id=req.params.item_id;
            var sql = `DELETE FROM items WHERE item_id=${id}`;
          con.query(sql,function (err, result) {
            if (err) throw err;
            res.send(result);
            })   
      })

      


      app.post('/api/signup/name/userprofile/:email',(req,res)=>{
        var email1=req.params.email;
        var user;
          var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
        con.query(sql,function (err, result) {
          if (err) throw err;
          user=(result[0].user_id);
          console.log(user);
          var user_id=user;
          console.log(user_id);
          
          // var profilepic=req.body.profile_pic;
          // var random_num=Math.floor(
          //   Math.random() * (999 - 0) + 0
          // )
          // var random_number=random_num;
          // console.log(random_number);
         
          // var profilebuf = Buffer.from(profilepic, 'base64');
          // var profilepathpic=`../profilepic/profile${user_id}${random_number}.jpg`
          // var profilepathpicture=`profile${user_id}${random_number}.jpg`
          // fs.writeFileSync(profilepathpic,profilebuf);
          
          
          var sql=`INSERT INTO profilepic(user_id) VALUES (?)`;
          con.query(sql,[user_id],function (err, result) {
              if (err) throw err;
              res.send(result);
              })
          })   
         
      
      })
      app.patch('/api/signup/name/userprofile/update/:email',(req,res)=>{
        var email1=req.params.email;
        var user;
          var sql = `SELECT user_id FROM signup WHERE email="${email1}"`;
        con.query(sql,function (err, result) {
          if (err) throw err;
          user=(result[0].user_id);
          console.log(user);
          var user_id=user;
          console.log(user_id);
          
          var profilepic=req.body.profile_pic;
          var random_num=Math.floor(
            Math.random() * (999 - 0) + 0
          )
          var random_number=random_num;
          console.log(random_number);
         
          var profilebuf = Buffer.from(profilepic, 'base64');
          var profilepathpic=`../profilepic/profile${user_id}${random_number}.jpg`
          var profilepathpicture=`profile${user_id}${random_number}.jpg`
          fs.writeFileSync(profilepathpic,profilebuf);
          
          
          var sql=`UPDATE profilepic SET profile_pic_url=? WHERE user_id=?`;
          con.query(sql,[profilepathpicture,user_id],function (err, result) {
              if (err) throw err;
              res.send(result);
              })
          })   
         
      
      })
      
        
    
       




app.listen(port,(err,result)=>{
    if(err){
        console.log('error has occured')
    }
})