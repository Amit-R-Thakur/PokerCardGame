
const express = require("express");

// const req=require("../public");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;
// console.log(path.join(__dirname ,"../public"));
app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public"));
});
// const getVisitor=()=>{
//     let client=io.sockets.client().connected;
//     let sockets=object.values(client);
//     let users=sockets.map(s=>s.user);
//     return users;
// }
// const emitVisitors=()=>{
//     io.emit("visitors",getVisitor());
// }
//Function for emits All users

//Function For card Distribution

///Creating 52 Cards....................
let deck = [];
//     Hearts,Clubs,Diamonds,Spades
let symbol = ["H", "C", "D", "S"];
let Ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
for (let i = 0; i < symbol.length; i++) {
    for (let j = 0; j < Ranks.length; j++) {
        deck.push(`${Ranks[j]}${symbol[i]}`);
    }
}
//................Deck is Created..................

//Function For return Random Card and Remove that Card...........
function ReturnRandomCard() {
    let RandomIndex = Math.floor(Math.random() * deck.length);
    let RandomCard = deck[RandomIndex];
    deck.splice(RandomIndex, 1);
    return RandomCard;
}



let user = {};
let bookedTable = {};
let bookedImage = {};
let userCard = [];
let BetCoinByuser={};

//Function For set Card For User...........
function setCard(user) {
    for (let i in user) {
        let userId = i;
        let card1 = ReturnRandomCard();
        let card2 = ReturnRandomCard();
        let table = bookedTable[userId];
        let obj = {};
        obj["userId"] = userId, obj["card1"] = card1, obj["card2"] = card2, obj["table"] = table;
        userCard.push(obj);


    }

}
//Function For PlayGame.......

//Game started or Not.....................
let start = false;



io.on("connection", (socket) => {


    socket.on("newUser", (Name) => {

        console.log(`${Name} Joined`);
        socket.emit("userJoin", Name);
        if (start == true) {
            let msg = "please Wait....";
            socket.emit("gameStartedOrNot", msg);
        }
        socket.broadcast.emit("sendMessge", Name);
        socket.emit("sendBookedTableByServer", bookedTable, bookedImage);

        user[socket.id] = Name;
        socket.emit("sendUser", user);


        //  if(Object.keys(user).length>0)
        //  {
        //      let time=5;
        //      let send;

        //      if(start==false)
        //      {
        //          send=setInterval(sendTimeToAll,1000);
        //         start=true;

        //      }

        //      async function sendTimeToAll()
        //   {
        //       socket.emit("sendTime",time);
        //       socket.broadcast.emit("sendTime",time);

        //       if(time==0)
        //       {

        //         socket.emit("sendGameStartMessage",time);
        //         socket.broadcast.emit("sendGameStartMessage");
        //           clearInterval(send);
        //           setCard(user);
        //           socket.emit("cardDistribution",userCard);
        //           socket.broadcast.emit("cardDistribution",userCard);

        //           let Round=0;
        //           while(Round!=5)
        //           {

        //           for(let i=0;i<userCard.length;i++)
        //           {
        //               console.log("amit");
        //               socket.emit("PlayGame",userCard);
        //               socket.broadcast.emit("PlayGame",userCard);
        //               socket.on("RecevedCoin",(data,data2)=>{
        //                      console.log(data,data2);
        //                 })

        //               Round++;
        //               console.log(Round);

        //           }
        //         }


        //       }
        //       time--;

        //   }




        // }



        let ChangesTable;
        socket.on("ChangesTable", (data2) => {
            ChangesTable = data2;
        })
        socket.on("SendBookedTableList", (data) => {

            socket.broadcast.emit("sendBookedImageAndTable", data.bookedTable, data.bookedProfileImage, ChangesTable);


            bookedTable[data.bookedBy] = data.bookedTable;
            bookedImage[data.bookedBy] = data.bookedProfileImage;




        });
        socket.on("LetsStartGame", () => {
            if (Object.keys(user).length > 1) {

                let time = 5;
                let send;

                if (start == false) {
                    send = setInterval(sendTimeToAll, 1000);
                    start = true;

                }

                function sendTimeToAll() {
                    socket.emit("sendTime", time);
                    socket.broadcast.emit("sendTime", time);
                    if (time == 0) {

                        socket.emit("sendGameStartMessage", time);
                        socket.broadcast.emit("sendGameStartMessage");
                        clearInterval(send);
                        setCard(user);
                        socket.emit("cardDistribution", userCard);
                        socket.broadcast.emit("cardDistribution", userCard);

                    }



                    time--;
                }


            }

        });



    })
    

    ///////Logic For Receved Coin From Client......
    socket.on("BetCoin",(data)=>{
        
        if(BetCoinByuser[data.userId])
        {
        BetCoinByuser[data.userId]=Number(BetCoinByuser[data.userId])+Number(data.BetCoin);
        }
        else
        {
            BetCoinByuser[data.userId]=data.BetCoin;
        }
        let sendUserData={};
        sendUserData["Name"]=user[data.userId];
        sendUserData["Coin"]=BetCoinByuser[data.userId];
        socket.broadcast.emit("BetCoinByUsers",sendUserData);
        socket.emit("BetCoinBySelf",sendUserData);
        
      
    })









    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnect`);

        socket.broadcast.emit("userLeft", user[socket.id]);
        socket.broadcast.emit("UpdateTableAndImage", bookedTable[socket.id], bookedImage[socket.id]);
        delete bookedTable[socket.id];
        delete bookedImage[socket.id];
        delete user[socket.id];
        socket.emit("sendUser", userCard);
    });

});


server.listen(PORT, () => {
    console.log(`Server is listning on port ${PORT}`);
})