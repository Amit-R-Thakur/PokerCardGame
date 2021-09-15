//Array For Profile Image 
let PrfImageList=["../images/face1.jpg","../images/face2.jpg","../images/face3.jpg","../images/face4.jpg","../images/face5.jpg","../images/face6.jpg","../images/face7.jpg","../images/face8.jpg","../images/face9.jpg","../images/face10.jpg","../images/face11.jpg","../images/face12.jpg","../images/face13.jpg"];
let table=["table1","table2","table3","table4","table5"];
let addProfileImage="../images/addUser.jpg";
let MyChangesTable;
//Function For reaturn random Table..........
function RandomTable()
{
    let random=Math.floor(Math.random()*table.length);
    let Randomtable=table[random];
    table.splice(random,1);
    return Randomtable;
}
//Function For return Random PrfImage
function RandomProfileImage()
{
    let random=Math.floor(Math.random()*PrfImageList.length);
    let image=PrfImageList[random];
    PrfImageList.splice(random,1);
    return image;
}

//Function for Manage Coin (get Coin or Set Coin To Loacal Storage)
document.addEventListener("DOMContentLoaded",()=>{
function setCoinToLocalStorage()
{
    let coin =localStorage.getItem("MyPokerGameCoin");
    if(coin==null)
    {
        localStorage.setItem("MyPokerGameCoin",100000);
        coin =localStorage.getItem("MyPokerGameCoin");
        return coin;
    }
    return coin;
}


//Function for set Coin to My Coin
setCoinToMyCoin();
function setCoinToMyCoin()
{
    document.querySelector("#MyCoin").innerText=setCoinToLocalStorage();
}
});
//Function For Real Time Message...........
function Message(msg)
{
    let mainBox=document.querySelector(".msgBox");
    mainBox.innerHTML=`<h2>${msg}</h2>`;
}
//Function For set Time For Starting game......
function setTime(tm)
{
    let  spn=document.querySelector("#time");
    console.log(spn);
    spn.innerText=tm;

}
//Function  for set Game Start Message.............
function sendGameStartMessage(msg)
{
    document.querySelector("#h2").innerText=msg;
}


let socket =io();
let Name=prompt("Enter Your Name to Join");
socket.emit("newUser",Name);


socket.on("userJoin",(data)=>
{
    socket.on("sendTime",(data)=>{
        setTime(data);
    })
    socket.on("sendGameStartMessage",(data)=>{
        let msg=`game Started`;
        sendGameStartMessage(msg);
    })
    let msg=`welcome ${data}`;
    Message(msg);
    socket.on("cardDistribution",(data)=>{console.log(data)});
   
    socket.on("sendMessge",(data)=>{
        let msg=`${data} join the table.`;
    Message(msg);
    });
   socket.on("sendBookedImageAndTable",(data,data2,data3)=>{
    console.log(data);
    if(data=="table5")
    {
        let ptbl=document.querySelector(`.${MyChangesTable}`);
        ptbl.style.backgroundImage=`url("${data2}")`;
          

    }
    else
    {
        let ptbl=document.querySelector(`.${data}`);
        ptbl.style.backgroundImage=`url("${data2}")`;
          

    }
   
       
   });
    socket.on("sendBookedTableByServer",(data,data2)=>{
        
        let tbl=[];
        let img=[];
        for(let x in data){let inx=table.indexOf(data[x]);tbl.push(data[x]);table.splice(inx,1);}
        for(let x in data2){let inx=PrfImageList.indexOf(data2[x]);img.push(data2[x]);PrfImageList.splice(inx,1);}
        if(Object.keys(data).length>0)
        {
            for(let i=0;i<tbl.length;i++)
            {
        let ptbl=document.querySelector(`.${tbl[i]}`);
        ptbl.style.backgroundImage=`url("${img[i]}")`;
            }
        }
        if(table.length==0)
    {
        alert("Table is Full");
        document.querySelector(".btnMainDiv").style.display="none";
        return;
    }

        let Rtable=RandomTable();
        MyChangesTable=Rtable;
    let RImage=RandomProfileImage();
    let Mytable=document.querySelector(`.${Rtable}`);
    let table5=document.querySelector(".table5");

    table5.classList.remove("table5");
    table5.classList.add(Rtable);
    Mytable.classList.remove(Rtable);
    Mytable.style.backgroundImage=`url("${RImage}")`;
    Mytable.classList.add("myProfile");
    socket.emit("ChangesTable",Rtable);
    socket.emit("SendBookedTableList",{bookedBy:`${socket.id}`,bookedTable:`${Rtable}`,bookedProfileImage:`${RImage}`});

         });
   // socket.on("sendBookedImageByServer",(data)=>{for(let x in data){bookedImage.push(data[x])}});
    

});
socket.on("userLeft",(data)=>
{

    let msg=`${data} Left the table.`;
    Message(msg);
});

socket.on("UpdateTableAndImage",(data,data2)=>{
    let tbl=data;
    let img=data2;
    table.push(tbl);
    PrfImageList.push(img);
    document.querySelector(`.${tbl}`).style.backgroundImage=`url("${addProfileImage}")`;
});

