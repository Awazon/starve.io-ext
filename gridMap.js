// ==UserScript==
// @name         Starve.io Map+
// @namespace    Awazon🌸#9702
// @version      0.1
// @description  map extension
// @match        http*://starve.io/
// @grant        none
// ==/UserScript==


(function(){

    let map;

    let mapWidth = 30000 - 3300;
    let mapHeight = 30000;

    let infoElem = document.createElement("div");
    infoElem.style["position"] = "absolute";
    infoElem.style["right"] = "0%";
    infoElem.style["bottom"] = "0%";
    infoElem.style["fontFamily"] = "baloo paaji";
    infoElem.style["color"] = "white";
    infoElem.style["padding"] = "20px";
    document.body.appendChild(infoElem);

    function updatePos(posX,posY){
        infoElem.innerHTML = `posX : ${posX}<br>posY : ${posY}`
    }

    function hookWsSendFunc(wsObj){
        let realSendFunc = wsObj.send;
        wsObj.send = function(){
            let parse = JSON.parse(arguments[0]);
            if(parse[0] == 1){
                updatePos(parse[1],parse[2]);
            }
            realSendFunc.apply(this,arguments);
        }
    }

    function detectVar(){
        let result = [];
        let result2 = [];
        for(let i in window){
            if(typeof window[i] == "object" && i.length == 2){
                for(let j in window[i]){
                    try{
                        if('onopen' in window[i][j]){
                            result2.push(i,j);
                        }
                        if('fillStyle' in window[i][j][0]){
                            result.push(i,j)
                        }
                    }catch(e){
                        //console.error(e)
                    }
                }
            }
        }
        return [result,result2];
    }

    function injectGridMap(mapVar){
        let img = new Image;
        img.src = "https://i.imgur.com/zUq4JjF.png" //Grid

        window[mapVar[0]][mapVar[1]][0].drawImage(img,0,0,193,193); //Minimap day
        window[mapVar[0]][mapVar[1]][1].drawImage(img,0,0,193,193); //Minimap night
        window[mapVar[0]][mapVar[3]][0].drawImage(img,0,0,600,600); //Bigmap day
        window[mapVar[0]][mapVar[3]][1].drawImage(img,0,0,600,600); //Bigmap night

        console.log("injected grid maps")
    }

    function inject(){
        let mp_vars = detectVar();
        if(mp_vars[1].length == 0){
            setTimeout(inject,1000);
        }else{
            injectGridMap(mp_vars[0]);
            setTimeout(function(){injectGridMap(mp_vars[0]);},1000);
            let wsVars = mp_vars[1];
            let wsObject = window[wsVars[0]][wsVars[1]];
            hookWsSendFunc(wsObject);
            map = mp_vars[0];
        }
    }

    function init(){
        inject();
    }
    init();

})();