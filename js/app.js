/*
 * 创建一个包含所有卡片的数组
 */
var cardAll=document.querySelectorAll('.card');
var cards=[];
var openCards=[];
var matchcards=[];
var n=0;
var movestext=document.querySelector('.moves');
var clicknum=0;
var t;

// 计时器
var timetext=document.querySelector('.timeshow');
var time=1;
function clock(){
    time++;
    timetext.textContent=time;
    t=setTimeout(function(){
        clock();
        timetext.textContent=time;
    },1000);

}


// 翻牌
function displayCard(evt){
    clicknum++;
    if(clicknum===1){
        clock();
    }
    if(evt.target.className==='card'){
        evt.target.classList.add('open');
        evt.target.classList.add('show');
        openCards.push(evt.target);
        if(openCards.length===2){
            n++;
            movestext.textContent=n;
            setTimeout(()=>{
                matchedCards();
                openCards=[];
            },300);
        }
    }
    return;
}
// openCards数组中有2张牌时比对
function matchedCards(){
    if(openCards[0].children[0].className===openCards[1].children[0].className){
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
            matchcards.push(openCards[0]);
            matchcards.push(openCards[1]);
            if(matchcards.length===16){
                matchcards[0].style.backgroundColor='red';
                clearTimeout(t);
            }
        }
    else{
                openCards[0].classList.remove('open');
                openCards[0].classList.remove('show');
                openCards[1].classList.remove('open');
                openCards[1].classList.remove('show');
        }
    return;
}

for(let i=0;i<cardAll.length;i++){
    cards.push(cardAll[i]);
}

document.querySelector('.deck').addEventListener('click',displayCard);


/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
 var iconCards=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
 "fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb",
 "fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle","fa fa-paper-plane-o","fa fa-cube"];

 var shufflBtn=document.getElementsByClassName('restart')[0];
 var deckCard=document.querySelector('.deck');
 function restartCards(){
    clicknum=0;
    time=1;
    n=0;
    clearTimeout(t);
    //清空原来的卡片
    var deckCard=document.querySelector('.deck');
    while(deckCard.firstChild){
        deckCard.removeChild(deckCard.firstChild);
    }
    // 洗牌
    shuffle(iconCards);
    // 添加打乱的卡片
    for(var i=0;i<iconCards.length;i++){
        deckCard.insertAdjacentHTML('afterbegin','<li class="card"><i class="'+iconCards[i]+'"></i></li>');
    }

 }

 function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shufflBtn.addEventListener('click',restartCards);


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */
