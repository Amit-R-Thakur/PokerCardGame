//function for create table...............
document.addEventListener("DOMContentLoaded",()=>{
    let rupeesIcon=`<i class="fas fa-rupee-sign"></i>`;
    let raiseIcon=`<i class="fas fa-chevron-up"></i>`;
    let botLimit=50000;
    let mainDiv=document.createElement("div");
    mainDiv.classList.add("main");
    document.body.appendChild(mainDiv);
    CreateHtmlParts();
    //Functions for HTML Parts................
    function CreateHtmlParts()
    {
    createTable();
    createProfile();
    CreatecardDiv();
    CreateDealerCoinAndCardDiv();
    CreateMessageBox();
    CreateTimerBox();
    }
    //Function For Create Message Box.............
    function CreateMessageBox()
    {
        let div=document.createElement("div");
        div.classList.add("msgBox");
        mainDiv.appendChild(div);
    }

    //Function for create Timer Box
    function CreateTimerBox()
    {
        let div=document.createElement("div");
        div.classList.add("timerBox");
        let msg=`<h2 id="h2"><span id="mssg">game start in </span><span id="time">5</span>s</h2>`;
        div.innerHTML=msg;
        mainDiv.appendChild(div);

    }
    //Function For create table......
    function createTable()
    {
        let div1=document.createElement("div");
        let div2=document.createElement("div");
        div1.classList.add("div1");
        div2.classList.add("div2");
        mainDiv.appendChild(div1);
        mainDiv.appendChild(div2);
    }
    //Function For Create Profile..........
    function createProfile()
    {
        let prf1=document.createElement("div");
        let prf2=document.createElement("div");
        let prf3=document.createElement("div");
        let prf4=document.createElement("div");
        let prf5=document.createElement("div");
        let prf6=document.createElement("div");
        mainDiv.appendChild(prf1);
        mainDiv.appendChild(prf2);
        mainDiv.appendChild(prf3);
        mainDiv.appendChild(prf4);
        mainDiv.appendChild(prf5);
        mainDiv.appendChild(prf6);
        prf1.classList.add("table1","t1");
        prf2.classList.add("table2","t2");
        prf3.classList.add("table3","t3");
        prf4.classList.add("table4","t4");
        prf5.classList.add("table5","t5");
        prf6.classList.add("prf6","dealer");
        let mode1=document.createElement("div");
        mode1.setAttribute("id","mode1")
        prf1.appendChild(mode1);
        let mode2=document.createElement("div");
        mode2.setAttribute("id","mode2")
        prf2.appendChild(mode2);
        let mode3=document.createElement("div");
        mode3.setAttribute("id","mode3")
        prf3.appendChild(mode3);
        let mode4=document.createElement("div");
        mode4.setAttribute("id","mode4")
        prf4.appendChild(mode4);
        let mode5=document.createElement("div");
        mode5.setAttribute("id","mode5")
        prf5.appendChild(mode5);

        //creating div for chips
        let chip1=document.createElement("div");
        let chip1is=`<h1>${rupeesIcon}<span id='rup1'>200</span></h1>`;
        chip1.innerHTML=chip1is;
        chip1.setAttribute("id","chip1");
        mainDiv.appendChild(chip1);
        let chip2=document.createElement("div");
        let chip2is=`<h1>${rupeesIcon}<span id='rup2'>200</span></h1>`;
        chip2.innerHTML=chip2is;
        chip2.setAttribute("id","chip2");
        mainDiv.appendChild(chip2);
        let chip3=document.createElement("div");
        mainDiv.appendChild(chip3);
        let chip3is=`<h1>${rupeesIcon}<span id='rup3'>200</span></h1>`;
        chip3.innerHTML=chip3is;
        chip3.setAttribute("id","chip3");
        let chip4=document.createElement("div");
        let chip4is=`<h1>${rupeesIcon}<span id='rup4'>200</span></h1>`;
        chip4.innerHTML=chip4is;
        chip4.setAttribute("id","chip4");
        mainDiv.appendChild(chip4);
        let chip5=document.createElement("div");
        chip5.setAttribute("id","chip5");
        mainDiv.appendChild(chip5);
        boardButton();

    }
    //Function for create bord button...............
    function boardButton()
    {
        let btnMainDiv=document.createElement("div");
        btnMainDiv.classList.add("btnMainDiv");
        mainDiv.appendChild(btnMainDiv);
        let foldBtnDiv=document.createElement("div");
        foldBtnDiv.classList.add("foldBtnDiv");
        let foldBtn=document.createElement("button");
        foldBtn.innerText="fold";
        foldBtn.setAttribute("id","fold")
        foldBtnDiv.appendChild(foldBtn);
        btnMainDiv.appendChild(foldBtnDiv);
        let EmptyDiv=document.createElement("div");
        let tcoinDiv=document.createElement("div");
        tcoinDiv.classList.add("tcoinDiv");
        let tcoin=`<b>${rupeesIcon}<span id='MyCoin'></span></b>`;
        tcoinDiv.innerHTML=tcoin;
        EmptyDiv.appendChild(tcoinDiv)
        EmptyDiv.classList.add("EmptyDiv");
        btnMainDiv.appendChild(EmptyDiv);
        let callBtnDiv=document.createElement("div");
        callBtnDiv.classList.add("callBtnDiv");
        let callBtn=`<button id='call'>call<br>${rupeesIcon}<span id='rs'>200<span></button>`;
        callBtnDiv.innerHTML=callBtn;
        btnMainDiv.appendChild(callBtnDiv);
        let raiseBtnDiv=document.createElement("div");
        raiseBtnDiv.classList.add("raiseBtnDiv");
        let raiseBtn=`<button id='raise'><span id='raiseIcon'>${raiseIcon}</span><br>raise</button>`;
        raiseBtnDiv.innerHTML=raiseBtn;
        btnMainDiv.appendChild(raiseBtnDiv);
        document.querySelector("#raise").addEventListener("click",()=>{
            
           let rs= document.querySelector("#rs").innerText;
           let trs=document.querySelector("#MyCoin").innerText
           rs=rs*2;
           trs=trs-rs;
           if(rs<botLimit&&trs>0)
           {
               document.querySelector("#rs").innerText=rs;
           }
           else if(trs<0)
           {
               alert("Your Balance is Low");
           }
           else 
           {
               alert("You cross BotLimit")
           }
        });
        document.querySelector("#call").addEventListener("click",()=>{
            let rs= document.querySelector("#rs").innerText;
            let trs=document.querySelector("#MyCoin").innerText;
            trs=trs-rs;
            if(trs>0)
            {
            document.querySelector("#MyCoin").innerText=trs;
            localStorage.setItem("MyPokerGameCoin",trs);
            }


        });


    }

    //Function for Create div For card
     function CreatecardDiv()
     {
         let mainDiv=document.querySelector(".main");
         let cardDiv1=document.createElement("div");
         cardDiv1.classList.add("cardDiv1");
         let card1=document.createElement("div");
         card1.setAttribute("id","p1card1");
         cardDiv1.appendChild(card1);
         let card2=document.createElement("div");
         card2.setAttribute("id","p1card2");
         cardDiv1.appendChild(card2);
         mainDiv.appendChild(cardDiv1);

         let cardDiv2=document.createElement("div");
         cardDiv2.classList.add("cardDiv2");
         card1=document.createElement("div");
         card1.setAttribute("id","p2card1");
         cardDiv2.appendChild(card1);
          card2=document.createElement("div");
         card2.setAttribute("id","p2card2");
         cardDiv2.appendChild(card2);
         mainDiv.appendChild(cardDiv2);
         let cardDiv3=document.createElement("div");
         cardDiv3.classList.add("cardDiv3");
         card1=document.createElement("div");
         card1.setAttribute("id","p3card1");
         cardDiv3.appendChild(card1);
          card2=document.createElement("div");
         card2.setAttribute("id","p3card2");
         cardDiv3.appendChild(card2);
         mainDiv.appendChild(cardDiv3);
         let cardDiv4=document.createElement("div");
         cardDiv4.classList.add("cardDiv4");
         card1=document.createElement("div");
         card1.setAttribute("id","p4card1");
         cardDiv4.appendChild(card1);
          card2=document.createElement("div");
         card2.setAttribute("id","p4card2");
         cardDiv4.appendChild(card2);
         mainDiv.appendChild(cardDiv4);
         let cardDiv5=document.createElement("div");
         cardDiv5.classList.add("MycardDiv");
         card1=document.createElement("div");
         card1.setAttribute("id","Mycard1");
         cardDiv5.appendChild(card1);
          card2=document.createElement("div");
         card2.setAttribute("id","Mycard2");
         cardDiv5.appendChild(card2);
         mainDiv.appendChild(cardDiv5);
         
     }

    //Function For Create Dealer Coin and Card..............
    function CreateDealerCoinAndCardDiv()
    {
        let mainDiv=document.querySelector(".main");
        let DealerMainDiv=document.createElement("div");
        let coinDiv=document.createElement("div");
        coinDiv.classList.add("DealerCoinDiv");
        let coin=document.createElement("div");
        coin.classList.add("coindiv");
        let dealerCoin=`<h1>${rupeesIcon}<span id='dealer'>1000</span></h1>`;
        coin.innerHTML=dealerCoin;
        coinDiv.appendChild(coin);
        DealerMainDiv.appendChild(coinDiv);
        let cardDiv=document.createElement("div");
        cardDiv.classList.add("DealerCardDiv");
        let dealerCard1=document.createElement("div");
        dealerCard1.classList.add("dealerCard");
        dealerCard1.setAttribute("id","dealerCard1");
        cardDiv.appendChild(dealerCard1);
        let dealerCard2=document.createElement("div");
        dealerCard2.classList.add("dealerCard");
        dealerCard2.setAttribute("id","dealerCard2");
        cardDiv.appendChild(dealerCard2);
        let dealerCard3=document.createElement("div");
        dealerCard3.classList.add("dealerCard");
        dealerCard3.setAttribute("id","dealerCard3");
        cardDiv.appendChild(dealerCard3);
        let dealerCard4=document.createElement("div");
        dealerCard4.classList.add("dealerCard");
        dealerCard4.setAttribute("id","dealerCard4");
        cardDiv.appendChild(dealerCard4);
        let dealerCard5=document.createElement("div");
        dealerCard5.classList.add("dealerCard");
        dealerCard5.setAttribute("id","dealerCard5");
        cardDiv.appendChild(dealerCard5);
        DealerMainDiv.appendChild(cardDiv);
        DealerMainDiv.classList.add("DealerMainDiv");
        mainDiv.appendChild(DealerMainDiv);
    }
    
  
///JAVAScript Part Started................





//Fuction For Set Card To Each Player
function SetCardToPlayer()
{
    let Card1=1;
    let Card2=2;
    for(let i=0;i<4;i++)
    {
        let Random1=ReturnCardImageUrl(ReturnRandomCard());
        let Random2=ReturnCardImageUrl(ReturnRandomCard());
        let playerCard1=document.querySelector(`#p${i+1}card${Card1}`);
        playerCard1.style.backgroundImage=`url("${Random1}")`;
        playerCard1.style.backgroundSize="100% 100%";
        let playerCard2=document.querySelector(`#p${i+1}card${Card2}`);
        playerCard2.style.backgroundImage=`url("${Random2}")`;
        playerCard2.style.backgroundSize="100% 100%";

    }
}
// function For set Card For Self...........
function SetCardForSelf()
{
    let Mycard1=document.querySelector("#Mycard1");
    let Mycard2=document.querySelector("#Mycard2");
    Mycard1.style.backgroundImage=`url("${ReturnCardImageUrl(ReturnRandomCard())}")`;
    Mycard1.style.backgroundSize="100% 100%";
    Mycard2.style.backgroundImage=`url("${ReturnCardImageUrl(ReturnRandomCard())}")`;
    Mycard2.style.backgroundSize="100% 100%";
}

//Function For Set Card For Dealer..............
function SetCardForDealer()
{
    for(i=0;i<5;i++)
    {
        let DealerCard=document.querySelector(`#dealerCard${i+1}`);
        DealerCard.style.backgroundImage=`url("${ReturnCardImageUrl(ReturnRandomCard())}")`;
        DealerCard.style.backgroundSize="100% 100%";

    }

}


//Function For Set Card...............
function setCard()
{
    
SetCardToPlayer();
SetCardForSelf();
SetCardForDealer();

}
//setCard();












})