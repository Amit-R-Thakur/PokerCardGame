
const express = require("express");

// const req=require("../public");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT =process.env.PORT||3000;
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
let WinnerRanks=["Royal Flush","Pure Sequence","Four Of Kind","Full House","Flush","Sequence","Three of Kind","Two Pair","One Pair","High Card"];
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
let WinningCoin=0;

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
       let RanksTemp=[];
       let Symbol=[];
       RanksTemp.push(elm["card1"].charAt(0));
       RanksTemp.push(elm["card2"].charAt(0));
       RanksTemp.push(elm["card3"].charAt(0));
       RanksTemp.push(elm["card4"].charAt(0));
       RanksTemp.push(elm["card5"].charAt(0));
       RanksTemp.push(elm["card6"].charAt(0));
       RanksTemp.push(elm["card7"].charAt(0));
       Symbol.push(elm["card1"].charAt(1));
       Symbol.push(elm["card2"].charAt(1));
       Symbol.push(elm["card3"].charAt(1));
       Symbol.push(elm["card4"].charAt(1));
       Symbol.push(elm["card5"].charAt(1));
       Symbol.push(elm["card6"].charAt(1));
       Symbol.push(elm["card7"].charAt(1));
       let tempObj={};
       tempObj["userId"]=elm["userId"];
       tempObj["Rank"]=getingResult(RanksTemp,Symbol);
       userResult.push(tempObj);



     //Function For Geting Result..............
     function getingResult(RanksTemp,Symbol)
     {
         if(IsRoyalFlush(RanksTemp,Symbol))return 1;
         else if(IsStraightFlushAndPureSequenceOrNot(RanksTemp,Symbol))return 2;
         else if(FourOfKindOrNot(RanksTemp)) return 3;
         else if(IsFullHouseOrNot(RanksTemp))return 4;
         else if(IsFlushOrNot(Symbol)) return 5;
         else if(IsSequance(RanksTemp)) return 6;
         else if(IsThreeOfKind(RanksTemp)) return 7;
         else if(IsTwoPair(RanksTemp)) return 8;
         else if(IsOnePair(RanksTemp)) return 9;
         else return 10;

     }



      
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
        
        for(let j=i;j<Symbol.length;j++)
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
//Function For Check Three of kind .................
function IsThreeOfKind(Ranks)
{
    for(let i=0;i<Ranks.length;i++)
    {
        let count=0;
        for(let j=0;j<Ranks.length;j++)
        {
            if(Ranks[i]==Ranks[j])
            {
                count++;
            }
        }
        if(count==3)
        {
            return 7;
        }
    }
    return 0;
}
//Function For Check card is Two Pair Or Not
function IsTwoPair(Ranks)
{
    let NewArr=[];
    for(let i=0;i<Ranks.length;i++)
    {
        let Count=0;
        for(let j=i;j<Ranks.length;j++)
        {
            if(Ranks[i]==Ranks[j])
            {
                Count++;
            }

        }
        if(Count==2)
        {
            NewArr.push(Ranks[i]);
        }
    
    }
    if(NewArr.length>1)
    {
        return 8;
    }
    return 0;
}
// Function For Check Card Is One Pair Or Not.
function IsOnePair(Ranks)
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
        if(Count==2)
        {
            return 9;
        }
    
    }
    return 0;
}
//Function For High Card...............
function IsHighCard(RanksTemp)
{
    let IndxNum=[];
    for(let i=0;i<RanksTemp.length;i++)
    {
            IndxNum.push(Number(Ranks.indexOf(RanksTemp[i])));
    }
    
    IndxNum=IndxNum.sort((a,b)=>a-b);
     
     let HighRank=IndxNum[IndxNum.length-1];
     return Ranks[HighRank];

}   
    })
    return userResult;
}
//Function For Deside Final Winner..............
function CnfWinner(Winner)
{
    let Rank=[];
    for(let i=0;i<Winner.length;i++)
    {
        Rank.push(Winner[i].Rank);
    }
    Rank=Rank.sort((a,b)=>a-b);
    for(let i=0;i<Winner.length;i++)
    {
       if( Winner[i].Rank==Rank[0])
       {
           return {"userId":Winner[i].userId,"Rank":Rank[0]};
       }
    }

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
//Function for delete user Card............
function deleteUserCard()
{
  userCard.splice(0,userCard.length);
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
        if(Object.keys(user).length <3)
        {
            socket.emit("waitOneMore", `please Wait For ${3-Object.keys(user).length} more people to Start Game`);

        }


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
            play();
            function play()
            {
                
            if (Object.keys(user).length > 2) {


                let time = 5;
                let send;
                WinningCoin=Object.keys(user).length*200;
                

                if (start == false) {
                    start = true;
                    send = setInterval(sendTimeToAll, 1000);

                }

                function sendTimeToAll() {
                    socket.emit("sendTime", time);
                    socket.broadcast.emit("sendTime", time);
                    if (time == 0) {
                         socket.emit("DisplayAllPlayBtn");
                        socket.broadcast.emit("DisplayAllPlayBtn");
                        
                        socket.emit("CollectingBet");
                        socket.broadcast.emit("CollectingBet");
                        
                        socket.emit("SetStartingBetCoinToDealer",Object.keys(user).length*200);
                        socket.broadcast.emit("SetStartingBetCoinToDealer",Object.keys(user).length*200);
                        

                        socket.emit("sendGameStartMessage", time);
                        socket.broadcast.emit("sendGameStartMessage");
                        clearInterval(send);
                        setDeck();
                        setCard(user);
                        DealerCards();
                        
                        socket.emit("cardDistribution", userCard);
                        socket.broadcast.emit("cardDistribution", userCard);
                       
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
                                let Winner=RoundWinner(userCard,DealerCard);
                                //Function for Confirm Winner ..........
                               let Win=(CnfWinner(Winner));
                               let msg=WinnerRanks[Win.Rank-1];
                               let Name=user[Win.userId];
                               socket.emit("winnerIs",{"UserId":Win.userId,"msg":msg,"Name":Name});
                               socket.broadcast.emit("winnerIs",{"UserId":Win.userId,"msg":msg,"Name":Name});
                               socket.emit("ShowAllCard",userCard);
                               socket.broadcast.emit("ShowAllCard",userCard);
                               socket.emit("WinningCoinIs",{"userId":Win.userId,"coin":WinningCoin});
                               socket.broadcast.emit("WinningCoinIs",{"userId":Win.userId,"coin":WinningCoin});
                               console.log(WinningCoin);
                               let wait=setInterval(restart,1000);
                               let tm=10;
                               function restart()
                               {

                                   socket.emit("sendRestartTime",tm);
                                   socket.broadcast.emit("sendRestartTime",tm);
                                   if(tm==0)
                                   {
                                    WinningCoin=0;
                                    socket.emit("RemoveAllCard",userCard);
                                    socket.broadcast.emit("RemoveAllCard",userCard);
                                    socket.emit("RemoveDealerCard",userCard);
                                    socket.broadcast.emit("RemoveDealerCard");
                                    

                                    
                                    clearInterval(wait);
                                    let msg="";
                                    socket.emit("gameStartedOrNot", msg,true);
                                    socket.broadcast.emit("gameStartedOrNot", msg,true);
                                    start = false;
                                ClearDeck();
                                DeleteDealerCards();
                                deleteUserCard();
                                     play();
                                   }
                                   tm--;
                                   
                               }
                              
                               
                                
                                clearInterval(ResultTimer);

                            }
                            Timer--;

                        }

                    }
                    time--;
                }


            }
        }

        });



    })
    

    ///////Logic For Receved Coin From Client......
    //Function For Manage Coin
   
    socket.on("BetCoin",(data)=>{
        WinningCoin=data.BetCoin+WinningCoin;
        
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