// ==UserScript==
// @name         Distarve
// @namespace    Awazon🌸#9702 , Kail#3027
// @version      0.1
// @description  Use Discord on Starve.io
// @match        http*://starve.io/
// @require　　　https://raw.githubusercontent.com/discordjs/discord.js/webpack/discord.11.5.1.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @downloadURL  https://github.com/Awazon/Distarve/raw/master/ext_distarve.user.js
// @grant        none
// ==/UserScript==

(function(){

    const version = "0.1";

    //--- Discord API ---//
    const client = new Discord.Client();
    //test = client;

    //--- Settings ---//
    let _setting = {
        // default settings
        discordToken: "", // Your discord token
        channelId: "", // channel id

        fontSize: 20,
        avatarSize: 20,
        userNameColor: "#000000", //black
        messageColor: "#000000", //black
        backgroundColor: "#FFFFFF", //white
        opacity: 0.7,

        displayWidth: 20,
        displayHeight: 60,
        displayTop: 25,

        chatKey: "t", // default T
        showSettingMenuKey: "k", // default K
        showDiscordMessagesKey: "c", // default C

        prefix: ";", // default ;
    };

    //--- LoadSetting ---//
    let storageVersion = localStorage.getItem('distarve_version');
    if(!storageVersion){
        localStorage.setItem("distarve_version",version);
    }
    if(storageVersion != version){
        localStorage.setItem("distarve_version",version);
        let dis = JSON.parse(localStorage.getItem('ext_distarve'));
        for(let i in dis){
            if(_setting[i] != void 0){
                _setting[i] = dis[i];
            }
        }
        localStorage.removeItem("ext_distarve");
    }

    let setting = JSON.parse(localStorage.getItem('ext_distarve'));
    if(!setting){
        setting = _setting;
        localStorage.setItem("ext_distarve",JSON.stringify(setting));
    }

    let fontName = "baloo paaji";

    //--- Other ---//
    let showDiscord = true;
    let showSettings = false;

    //--- UI Element ---//
    let disp = document.createElement("div");
    disp.style['position'] = "absolute";
    disp.style['background-color'] = "#424242";
    disp.style['width'] = `${setting.displayWidth}%`;
    disp.style['height'] = `${setting.displayHeight}%`;
    disp.style['top'] = `${setting.displayTop}%`;
    disp.style['opacity'] = setting.opacity;
    disp.style['borderTopLeftRadius'] = "10px";
    disp.style['borderTopRightRadius'] = "10px";
    disp.style['borderBottomLeftRadius'] = "10px";
    disp.style['borderBottomRightRadius'] = "10px";
    disp.style['paddingTop'] = "5px";
    disp.style['textAlign'] = "center";
    disp.style['fontSize'] = "150%";
    disp.style['fontFamily'] = fontName;
    disp.style['textShadow'] = "white 1px 1px 1px, white -1px 1px 1px, white 1px -1px 1px, white -1px -1px 1px";
    disp.style['visibility'] = "visible";
    disp.style['userSelect'] = "none";
    document.body.appendChild(disp);
    disp.innerHTML = `<b>DISTARVE</b> <font size='2'> ver ${version}</font>`;

    let sendMsg = document.createElement("div");
    sendMsg.style['fontFamily'] = fontName;
    sendMsg.style['width'] = "100%"
    sendMsg.innerHTML = `<input id='sendMessageInput' style='width:100%; height:4%;'></input>`;
    disp.appendChild(sendMsg);

    let msgElem = document.createElement("div");
    msgElem.style["position"] = "absolute";
    msgElem.style['width'] = "100%";
    msgElem.style['height'] = "80%";
    msgElem.style['background-color'] = setting.backgroundColor;
    msgElem.style['opacity'] = setting.opacity;
    msgElem.style['color'] = "black";
    msgElem.style['padding'] = "10px";
    msgElem.style['pointer-events'] = "auto";
    msgElem.style['overflow'] = "auto";
    msgElem.style['boxSizing'] = "border-box";
    msgElem.style['fontSize'] = `${setting.fontSize}`;
    msgElem.style['fontFamily'] = "none";
    msgElem.style['textAlign'] = "left";
    msgElem.style['textShadow'] = "none";
    sendMsg.appendChild(msgElem);

    let settingElem = document.createElement("div");
    settingElem.style['position'] = "absolute";
    settingElem.style['right'] = "0%";
    settingElem.style['bottom'] = "0%";
    settingElem.style['background'] = "#000000"
    settingElem.style['color'] = "#FFFFFF";
    settingElem.style['padding'] = "10px";
    settingElem.style['display'] = "none";
    settingElem.style['fontFamily'] = fontName;
    settingElem.style['borderTopLeftRadius'] = "10px";
    settingElem.style['borderTopRightRadius'] = "10px";
    settingElem.style['borderBottomLeftRadius'] = "10px";
    settingElem.style['borderBottomRightRadius'] = "10px";
    settingElem.innerHTML = `<div style='text-align:center'><font size='4'>-DISTARVE SETTING-</font></div>
                            <div style='text-align:center'><font color='red'>(DON'T SHOW YOUR TOKEN TO OTHERS!)</font></div>
                            <input id='s_discordToken' value=${setting.discordToken}></input> Your discord token
                            <br>
                            <input id='s_channelId' value=${setting.channelId}></input> Discord channel ID
                            <br>
                            <div style='text-align:center'><button id='saveDiscordSettingButton'>SAVE</button></div>
                            <br>
                            <input id='s_fontSize' value=${setting.fontSize}></input> Font size
                            <br>
                            <input id='s_avatarSize' value=${setting.avatarSize}></input> Avatar size
                            <br>
                            <input id='s_userNameColor' value=${setting.userNameColor}></input> Username color
                            <br>
                            <input id='s_messageColor' value=${setting.messageColor}></input> Message color
                            <br>
                            <input id='s_backgroundColor' value=${setting.backgroundColor}> Background color</input>
                            <br>
                            <input id='s_opacity' value=${setting.opacity}></input> Opacity
                            <br>
                            <input id='s_displayWidth' value=${setting.displayWidth}></input> Display width
                            <br>
                            <input id='s_displayHeight' value=${setting.displayHeight}></input> Display height
                            <br>
                            <input id='s_displayTop' value=${setting.displayTop}></input> Display top
                            <br>
                            <input id='s_chatKey' value=${setting.chatKey}></input> Chat key
                            <br>
                            <input id='s_showSettingMenuKey' value=${setting.showSettingMenuKey}></input> Show setting menu key
                            <br>
                            <input id='s_showDiscordMessagesKey' value=${setting.showDiscordMessagesKey}></input> Show discord msg key
                            <br>
                            <input id='s_prefix' value=${setting.prefix}></input> Prefix
                            <br>
                            <div style='text-align:center'><button id='saveSettingsButton'>SAVE</button></div>`;
    document.body.appendChild(settingElem);

    let sendMessageInput = document.getElementById("sendMessageInput");
    let saveSettingsButton = document.getElementById("saveSettingsButton");
    let saveDiscordSettingButton = document.getElementById("saveDiscordSettingButton")

    //--- Game Variable ---//
    let canvas = document.getElementById("game_canvas");
    let ctx = canvas.getContext("2d");

    let chat = document.getElementById("chat_block");
    let chatInput = document.getElementById("chat_input");

    //--- API Func ---//
    client.on('ready', () => {
        updateMessage();
        console.log('Distarve ready...');
    });

    client.on('message', msg =>{
        if(msg.channel.id == setting.channelId){
            updateMessage();
        }
    });

    function updateMessage(){
        if(setting.discordToken != ""){
            let targetChannel = client.channels.get(setting.channelId);
            targetChannel.fetchMessages({ limit: 100 })
            .then((messages) => {
                let allMessages = messages.array();
                let result = "";
                for(let key in allMessages){
                    let userName = allMessages[key].author.username;
                    let avatarUrl = `https://cdn.discordapp.com/avatars/${allMessages[key].author.id}/${allMessages[key].author.avatar}`
                    let messageContent = allMessages[key].content;
                    result += `<img style="border-radius:100%;" border="1" src=${avatarUrl} width=${setting.avatarSize} height=${setting.avatarSize}> ${userName}<br>${messageContent}<hr style="border:0;border-top:1px solid black;">`
                }
                msgElem.innerHTML = `<font size='2'><b>Server : ${targetChannel.guild.name}<br>Channel : ${targetChannel.name}</b></font><br>` + result;
            })
            .catch(console.error);
        }
    }

    function snedMessage(content){
        client.channels.get(setting.channelId).send(content);
        sendMessageInput.value = "";
    }

    //--- Func ---//
    function onKeyUp(e){
        if(chat.style['display'] != "inline-block"){
            if(e.key == setting.chatKey){
                sendMessageInput.focus();
            }
            if(e.key == setting.showDiscordMessagesKey){
                if(showDiscord){
                    showDiscord = false;
                    disp.style['visibility'] = "hidden";
                }else{
                    showDiscord = true;
                    disp.style['visibility'] = "visible";
                }
            }
            if(e.key == setting.showSettingMenuKey){
                if(showSettings){
                    showSettings = false;
                    settingElem.style['display'] = "inline";
                }else{
                    showSettings = true;
                    settingElem.style['display'] = "none";
                }
            }
        }
    }

    function onInputKeyDown(e){
        if(chat.style['display'] != "inline-block"){
            if(e.key == "Enter"){
                snedMessage(sendMessageInput.value);
            }
        }
        e.stopPropagation();
    }

    function onStarveChatKeyDown(e){
        if(e.key == "Enter"){
            if(chatInput.value[0] == setting.prefix){
                msg = chatInput.value;
                snedMessage(msg.replace(setting.prefix, ""));
                chatInput.value = "";
            }
        }
    }

    function saveSettings(){
        for(let i in setting){
            console.log(`s_${i}`)
            setting[i] = document.getElementById(`s_${i}`).value;
        }
        localStorage.setItem("ext_distarve",JSON.stringify(setting));
        if(confirm("The settings take effect when you reload the page. Do you want to reload?")){
            location.reload();
        }
    }

    function saveDiscordSetting(){
        let token = document.getElementById("s_discordToken").value;
        let channel = document.getElementById("s_channelId").value;
        setting.discordToken = token;
        setting.channelId = channel;
        localStorage.setItem("ext_distarve",JSON.stringify(setting));
        updateMessage();
    }

    function detectVar(){
        let result = [];
        let result2 = [];
        for(let i in window){
            if(typeof window[i] == "object" && i.length == 2){
                for(let j in window[i]){
                    try{
                        if('onopen' in window[i][j]){
                            //webSocket
                            result2.push(j);
                        }
                        if('fillStyle' in window[i][j][0]){
                            //map ctx
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
        let vars = detectVar();
        if(vars[1].length == 0){
            setTimeout(inject,1000);
        }else{
            injectGridMap(vars[0]);
            setTimeout(function(){injectGridMap(vars[0]);},1000);
        }
    }

    //--- init ---//
    function init(){
        ok = true;
        //if~
        if(ok){
            inject();
            window.addEventListener("keyup",onKeyUp);
            //window.addEventListener("keydown",onKeyDown);
            sendMessageInput.addEventListener("keydown",onInputKeyDown);
            chat.addEventListener("keydown",onStarveChatKeyDown);
            saveSettingsButton.addEventListener("mousedown",saveSettings);
            saveDiscordSettingButton.addEventListener("mousedown",saveDiscordSetting);

            client.login(setting.discordToken); //login
        }else{
            setTimeout(init,100);
        }
    }
    init();

})();
