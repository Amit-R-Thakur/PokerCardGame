
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
//Function For set Deck.......
function setDeck()
{
for (let i = 0; i < symbol.length; i++) {
    for (let j = 0; j < Ranks.length; j++) {
        deck.push(`${Ranks[j]}${symbol[i]}`);
    }
}
}
//Function For clear Deck........
function ClearDeck()
{
    deck.splice(0,deck.length);
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
let DealerCard={};
let BetCoinByuser={};

//Function For Confirm Who Is Winner........
function RoundWinner(userCard,DealerCard)
{
    let userResult=[];
    //Merging The User Card and Dealer Card
   userCard.forEach((elm)=>{
       elm["card3"]=DealerCard.card1;
       elm["card4"]=DealerCard.card2;
       elm["card5"]=DealerCard.card3;
       elm["card6"]=DealerCard.card4;
       elm["card7"]=DealerCard.card5;
   });
   userCard.forEach((elm)=>{
       let Ranks=[];
       let Symbol=[];
       Ranks.push(elm["card1"].charAt(0));
       Ranks.push(elm["card2"].charAt(0));
       Ranks.push(elm["card3"].charAt(0));
       Ranks.push(elm["card4"].charAt(0));
       Ranks.push(elm["card5"].charAt(0));
       Ranks.push(elm["card6"].charAt(0));
       Ranks.push(elm["card7"].charAt(0));
       Symbol.push(elm["card1"].charAt(1));
       Symbol.push(elm["card2"].charAt(1));
       Symbol.push(elm["card3"].charAt(1));
       Symbol.push(elm["card4"].charAt(1));
       Symbol.push(elm["card5"].charAt(1));
       Symbol.push(elm["card6"].charAt(1));
       Symbol.push(elm["card7"].charAt(1));
      
       //Function For Check Royal Flush or Not
       function IsRoyalFlush(Ranks,Symbol)
       {
          for(let i=0;i<Symbol.length;i++)
          {
               let count=0;
              for(let j=0;j<Symbol.length;j++)
                {
                   if(Symbol[i]==Symbol[j])
                   {
                       count++;
                   }

               }
       
               if(count==5)
               {
                   let card=Ranks.sort().join("");
                   if(card=="10AJKQ")
                   {
                    return 1;
                   }
               }
           }
           return 0;

       }

       //Function For Check Straight flush and Pure sequence
 function IsStraightFlushAndPureSequenceOrNot(Ranks,Symbol)
  {
    for(let i=0;i<Symbol.length;i++)
    {
        let Count=0;
        for(let j=0;j<Symbol.length;j++)
        {
            if(Symbol[i]==Symbol[j])
            {
                Count++;
            }

        }
        if(Count==5)
        {
            let Sequence=true;
            for(let k=0;k<Ranks.length-1;k++)
            {
                if(Number(Ranks[k+1])!=Number(Ranks[k])+1)
                {
                    Sequence=false;
                    break;
                }
            }
            let TempCard=Ranks.sort().join("");
            if(Sequence==true||TempCard=="109JKQ")
            {
                return 2;
            }
        }
    }
    return 0;
} 
//Function for Check Four Of a Kind or Not..............
function FourOfKindOrNot(Ranks)
{
    for(let i=0;i<Ranks.length;i++)
    {
        let Count=0;
        for(let j=0;j<Ranks.length;j++)
        {
            if(Ranks[i]==Ranks[j])
            {
                Count++;
            }

        }
        if(Count==4)
        {
            return 3;
        }
    }
    return 0;
}
//Function For card is Full House Or Not.............
function IsFullHouseOrNot(Ranks)
{
    let UniqueRanks=Ranks.filter((elm,i,arr)=>{ return arr.indexOf(elm)==i;});
    let NewCard={};
    for(let i=0;i<UniqueRanks.length;i++)
    {
        let count=0;
        for(let j=0;j<Ranks.length;j++)
        {
            if(UniqueRanks[i]==Ranks[j])
            {
                count++;
            }
        }
        NewCard[`${UniqueRanks[i]}`]=count;

    }
    let four=false,Two=false;
    for(let i in NewCard)
    {
        if(NewCard[i]==4)
        {
            four=true;
            delete NewCard[i];
            break;
        }
    }
    for(let i in NewCard)
    {
        if(NewCard[i]==2)
        {
            Two=true;

            break;
        }
    }
    if(four&&Two)
    {
        return 4;
    }
    return 0;

}

//Function For Check Card is Flush Or Not...........
function IsFlushOrNot(Symbol)
{
    for(let i=0;i<Symbol.length;i++)
    {
        let count=0;
        for(let j=0;j<Symbol.length;j++)
        {
            if(Symbol[i]==Symbol[j])
            {
                count++;
            }

        }
        if(count==5)
        {
            return 5;
        }
    }
    return 0;
}
//Function for Check card is in sequance or Not.............
function IsSequance(Ranks)
{
    let NewRanks=[];
    Ranks.forEach((elm)=>{NewRanks.push(Number(elm))});
    let sortedRanks=NewRanks.sort();
    let con=true;
    for(let i=0;i<3;i++)
    {
        console.log(sortedRanks[i+1]);
            if(sortedRanks[i+1]!=sortedRanks[i]+1)
            {
                con=false;
                break;
            }
    }
    if(con)
    {
        return 6;
    }
    return 0;
}





       
    })
}

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
//Function For set Dealer Card............
function DealerCards()
{
    let card1=ReturnRandomCard();
    let card2=ReturnRandomCard();
    let card3=ReturnRandomCard();
    let card4=ReturnRandomCard();
    let card5=ReturnRandomCard();
    DealerCard["card1"]=card1,DealerCard["card2"]=card2,DealerCard["card3"]=card3,DealerCard["card4"]=card4,DealerCard["card5"]=card5;
}
//Function for clear DealerCards
function DeleteDealerCards()
{
    for(i in DealerCard)
    {
        delete DealerCard[i];
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
            socket.emit("gameStartedOrNot", msg,false);
        }
        else
        {
           let msg="";
            socket.emit("gameStartedOrNot", msg,true);

        }
        socket.broadcast.emit("sendMessge", Name);
        socket.emit("sendBookedTableByServer", bookedTable, bookedImage);

        user[socket.id] = Name;
        socket.emit("sendUser", user);


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
                    start = true;
                    send = setInterval(sendTimeToAll, 1000);

                }

                function sendTimeToAll() {
                    socket.emit("sendTime", time);
                    socket.broadcast.emit("sendTime", time);
                    if (time == 0) {
                        socket.emit("sendGameStartMessage", time);
                        socket.broadcast.emit("sendGameStartMessage");
                        clearInterval(send);
                        setDeck();
                        setCard(user);
                        DealerCards();
                        RoundWinner(userCard,DealerCard);
                        socket.emit("cardDistribution", userCard);
                        socket.broadcast.emit("cardDistribution", userCard);
                        socket.emit("DisplayAllPlayBtn");
                        socket.broadcast.emit("DisplayAllPlayBtn");
                        let Timer=30;
                        let ResultTimer=setInterval(ResultTimerFunction,1000);
                        function ResultTimerFunction()
                        {
                            socket.emit("ResultTimerFunction",Timer);
                            socket.broadcast.emit("ResultTimerFunction",Timer);
                            if(Timer==20)
                            {
                                socket.emit("SendThreeCardToDealer",DealerCard.card1,DealerCard.card2,DealerCard.card3);
                                socket.broadcast.emit("SendThreeCardToDealer",DealerCard.card1,DealerCard.card2,DealerCard.card3);
                            }
                            if(Timer==15)
                            {
                                socket.emit("SendFourthCardToDealer",DealerCard.card4);
                                socket.broadcast.emit("SendFourthCardToDealer",DealerCard.card4);

                            }
                            if(Timer==10)
                            {
                                socket.emit("SendFivethCardToDealer",DealerCard.card5);
                                socket.broadcast.emit("SendFivethCardToDealer",DealerCard.card5);

                            }
                            
                            if(Timer==0)
                            {
                                
                                start = false;
                                ClearDeck();
                                clearInterval(ResultTimer);

                            }
                            Timer--;

                        }

                    }
                    time--;
                }


            }

        });



    })
    

    ///////Logic For Receved Coin From Client......
    //Function For Manage Coin
   
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
        socket.emit("AddBetCoinToDealer",data.BetCoin);
       socket.broadcast.emit("AddBetCoinToDealer",data.BetCoin);
      
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