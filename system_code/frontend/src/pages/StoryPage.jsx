import React, { useState, useEffect } from "react";
import "../assets/css/story.css";
import "../assets/css/conversation.css";
import ThreeOptionsTable from "../components/ThreeOptionsTable";
import Conversation from "../components/Conversation";
import axios from "axios";
import { storyRouter,widgetChatRouter, widgetToastChatRouter,summarizePromptRouter  } from "../config/routeConfig";
import { useNavigate } from "react-router-dom";
import IconLoading from "../assets/icons/Loading.svg";
import StoryCard from "../components/StoryCard";
import IconLeft from "../assets/icons/Icon_card_left.svg";
import IconRight from "../assets/icons/Icon_card_right.svg";
import { createSelectionFunction } from "../utils/util";
import SocialMedia from "../components/SocialMedia";
import ChatWidget from "../components/ChatWidget";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupChat from "../components/GroupChat";
import GroupChatInfo from "../components/GroupChatInfo";

const StoryPage = () => {
    const navigate = useNavigate();
    //leftPage content and rightPage content
    const [scriptInfo, setScriptInfo] = useState({});
    const [leftPage, setLeftPage] = useState([]);
    const [promptList, setPromptList] = useState([])
    const [rightPage, setRightPage] = useState();  
    const [summary, setSummary] = useState("N/A");

    // state 0:  waiting to generate a story event
    // state 1 : waiting to ask three options
    // state 2:  waiting to start a conversation
    // state 3:  continue after making options
    // state 4:  contine after conversation
    // state 5:  ask for group chat
    // state 6:  continue group chat
    // state -1: awaiting user operations. disable the button
    // let select = createSelectionFunction([0,1,2,5], [0.25,0.25,0.25, 0.25]);  // not two consecutive state
    const [select, setSelect] = useState();
    // let select;
    const [questionState, setQuestionState] = useState();
    // const [questionState, setQuestionState] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [storyIndex, setStoryIndex] = useState(0);
    const [order, setOrder] = useState(2);
    // show character's social media
    const [leftInfo, setLeftInfo]= useState();
    const [showLeftInfo, setShowLeftInfo] = useState(false);
    const [currentSage, setCurrentSage] = useState({});
    const [mode, setMode] = useState("");
    const [sageStyle, setSageStyle] = useState("");
    const [eventDescription, setEventDescription] = useState();

    // check if logined and choose script
    useEffect(() => {
        const asyncUseEffect = async () => {
            if(!sessionStorage.getItem("simulife-user")){
                navigate("/welcome");
            }
            if(!sessionStorage.getItem("scriptplay-info")){
                navigate("/");
            }  
            if(!localStorage.getItem("sage-info")){
                navigate("/");
            }
            const scriptplayInfo = JSON.parse(sessionStorage.getItem("scriptplay-info"));
            setScriptInfo(scriptplayInfo);
            setCurrentSage(JSON.parse(localStorage.getItem("sage-info")));    


            setMode(sessionStorage.getItem("sage-mode"));
            setSageStyle(sessionStorage.getItem("sage-style"));

            // console.log(sessionStorage.getItem("sage-mode"));
            // console.log(sessionStorage.getItem("sage-style"));
            // console.log(JSON.parse(localStorage.getItem("sage-info")));

            console.log(sessionStorage.getItem("sage-style") === "No Agent")

            // let selectSettings = createSelectionFunction(scriptplayInfo.mode_settings.state_options, scriptplayInfo.mode_settings.probability);
            // setSelect(() => selectSettings);
            // setQuestionState(selectSettings());
            setQuestionState(1);
        };
        asyncUseEffect()
    }, [navigate])

    // load the first story after load scriptInfo object
    useEffect(() => {  
        setLeftPage([{story:scriptInfo.first_story, image:scriptInfo.first_image}]);
    }, [scriptInfo])


    // set leftPage to newest story
    useEffect(() => {
        setStoryIndex(leftPage.length - 1);
    }, [leftPage])

    // summarize every 7 pages
   useEffect(() => {
    if(promptList.length >= 5){

        summarizePrompt();
    }
   }, [promptList]) 


    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    //axios 

    const summarizePrompt = () => {
        const n =promptList.length;
        const prompt = promptList.slice(0, n-2).join(" ");
        axios.post(summarizePromptRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            prompt:prompt,
        }).then((resp) => {
            setSummary(resp.data)
        }).then(() => {
            setPromptList([promptList[n-1]]);
        })
        .catch((e) => {
            console.log(e);
        })

    }


    // state = 0 :get a story descripion with no event happens
    const askForStory = () => {
        // console.log(promptList)

        const prompt = promptList.join(" ");
        setIsLoading(true);
        axios.post(storyRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            order:order,
            script_name:scriptInfo.script,
            prompt_state:"0",
            prompt:prompt,
            summary:summary,
        })
            .then((resp) => {
                // console.log(resp);
                setPromptList([...promptList, resp.data.story])
                setLeftPage([...leftPage, {story:resp.data.story, image:resp.data.img}])
                setIsLoading(false);
                // setQuestionState(randomInt(3));
                setQuestionState(select());
                setOrder(order + 1);
                
                if(currentSage.sageFullName !== "None" && sageStyle !== "No Agent" && mode === "Post-Action Mode"){
                    sendToastMessage(resp.data.story, widgetMessages, "no-event", "No event encountered, the user is just reading the storyline.");
                }
                
            })
            .catch((error) => {
                alert("Oops, please try again!");
                console.log(error);
                setIsLoading(false);
            }) 
    }


    // state = 1: get prompt for asking for three options
    const askForOptions = () => {
        // console.log(promptList)

        const prompt = promptList.join(" ");
        setIsLoading(true);
        axios.post(storyRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            order:order,
            script_name:scriptInfo.script,
            prompt_state:"1",
            prompt:prompt,
            summary:summary,
        })
            .then((resp) => {
                // console.log(resp);
                setPromptList([...promptList, resp.data.story])
                setLeftPage([...leftPage, {story:resp.data.story, image:resp.data.img}])
                setRightPage({
                    type:"optionTable",
                    question:resp.data.question, 
                    option_1:resp.data.option_1,
                    option_2:resp.data.option_2,
                    option_3:resp.data.option_3,
                })
                setIsLoading(false);
                setQuestionState(-1);
                setOrder(order + 1);

                let ed =  {question:resp.data.question, option_1:resp.data.option_1, option_2:resp.data.option_2, option_3:resp.data.option_3};
                setEventDescription(ed)
                if(currentSage.sageFullName !== "None" && sageStyle !== "No Agent" && mode === "Pre-Action Mode"){
                    sendToastMessage(resp.data.story, widgetMessages, "decision-making", ed);
                }
            })
            .catch((error) => {
                alert("Oops, please try again!");
                console.log(error);
                setIsLoading(false);
            })       
    }

    // state = 3: continue story after user made a choice
    const continueOptions = (choice) => {
        // console.log(promptList)
        console.log(eventDescription);

        const prompt = promptList.join(" ");
        setIsLoading(true);
        axios.post(storyRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            order:order,
            script_name:scriptInfo.script,
            prompt_state:"3",
            prompt:prompt,
            choice:choice,
            summary:summary,
        })
            .then((resp) => {
                // console.log(resp);
                setPromptList([...promptList, resp.data.story])
                setLeftPage([...leftPage, {story:resp.data.story, image:resp.data.img}])
                // setQuestionState(select());
                ////////////////////////////////////// for user study //////////////////////////////////
                setQuestionState(2);
                setIsLoading(false);
                setOrder(order + 1);

                if(currentSage.sageFullName !== "None" && sageStyle !== "No Agent" && mode === "Post-Action Mode"){
                    let ed = eventDescription;
                    ed.user_choice = choice;
                    console.log(ed);
                    sendToastMessage(resp.data.story, widgetMessages, "decision-making", ed);
                }
            })
            .then(() => {
                setRightPage();
                // clear event description
                setEventDescription();
            })
            .catch((error) => {
                alert("Oops, please try again!");
                console.log(error);
                setIsLoading(false);
            })       
    }

    // state = 2
    const askForCharacter = () => {
        // console.log(promptList)

        const prompt = promptList.join(" ");
        setIsLoading(true);
        axios.post(storyRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            order:order,
            script_name:scriptInfo.script,
            prompt_state:"2",
            prompt:prompt,
            summary:summary,
        })
            .then((resp) => {
                // console.log(resp);
                setPromptList([...promptList, resp.data.story])
                setLeftPage([...leftPage, {story:resp.data.story, image:resp.data.img}])
                setRightPage({
                    type:"conversation",
                    characterName:resp.data.character_name, 
                    avatar:resp.data.avatar,
                    // personality:resp.data.character_personality,
                    // relationship:resp.data.relationship,
                    // characterDescription:resp.data.character_description,
                    firstSentence:resp.data.first_sentence,
                    chatBackground:resp.data.chat_background,
                })
                setIsLoading(false);
                setQuestionState(-1);
                setOrder(order + 1);

                // set left page as social media
                setLeftInfo({
                    type:"social-media",
                    smBG:resp.data.sm_bg_img,
                    characterName:resp.data.character_name, 
                    avatar:resp.data.avatar,
                    personality:resp.data.character_personality,
                    relationship:resp.data.relationship,
                    characterDescription:resp.data.character_description,
                    posts:[
                        {post:resp.data.post_1, image:resp.data.post_image_1}, 
                        {post:resp.data.post_2, image:resp.data.post_image_2}, 
                        {post:resp.data.post_3, image:resp.data.post_image_3}, 
                    ]
                });
                setShowLeftInfo(false);


                if(currentSage.sageFullName !== "None" && sageStyle !== "No Agent" && mode === "Pre-Action Mode"){
                    sendToastMessage(resp.data.story, widgetMessages, "conversation", "The user is going to have a conversation with " + resp.data.character_name + " who is " + resp.data.character_description);
                }
            })
            .catch((error) => {
                alert("Oops, please try again!");
                console.log(error);
                setIsLoading(false);
            }) 
    }

    // state = 4
    const continueConversation = (messages, characterName) => {
        // console.log(promptList)

        const prompt = promptList.join(" ");
        setIsLoading(true);
        axios.post(storyRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            order:order,
            script_name:scriptInfo.script,
            prompt_state:"4",
            prompt:prompt,
            messages:messages,
            character_name:characterName,
            summary:summary,
        })
            .then((resp) => {
                // console.log(resp);
                setPromptList([...promptList,resp.data.new_prompt ,resp.data.story])
                setLeftPage([...leftPage, {story:resp.data.story, image:resp.data.img}])
                // setQuestionState(select());
                ////////////////////////////////////// for user study //////////////////////////////////
                setQuestionState(5);
                setIsLoading(false);
                setOrder(order + 1);
                setShowLeftInfo(false);
                setLeftInfo();

                if(currentSage.sageFullName !== "None" && sageStyle !== "No Agent" && mode === "Post-Action Mode"){
                    sendToastMessage(resp.data.story, widgetMessages, "conversation", messages);
                }
            })
            .then(() => {
                setRightPage();
            })
            .catch((error) => {
                alert("Oops, please try again!");
                console.log(error);
                setIsLoading(false);
            }) 
    }

    // state = 5
    const askForGroupChat = () => {
        // console.log(promptList)

        const prompt = promptList.join(" ");
        setIsLoading(true);
        axios.post(storyRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            order:order,
            script_name:scriptInfo.script,
            prompt_state:"5",
            prompt:prompt,
            summary:summary,
        })
            .then((resp) => {
                // console.log(resp);
                setPromptList([...promptList, resp.data.story])
                setLeftPage([...leftPage, {story:resp.data.story, image:resp.data.img}])
                setRightPage({
                    type:"groupchat",
                    userName:scriptInfo.user_name,
                    characterList:resp.data.character_list,
                    firstSpeaker:resp.data.first_sentence.speaker,
                    firstSentence:resp.data.first_sentence.content,
                    chatBackground:resp.data.story,
                })
                setIsLoading(false);
                setQuestionState(-1);
                setOrder(order + 1);

                setLeftInfo({
                    type:"groupchat-info",
                    characterList:resp.data.character_list,
                })
                setShowLeftInfo(false);
                

                //
                if(currentSage.sageFullName !== "None" && sageStyle !== "No Agent" && mode === "Pre-Action Mode"){
                    sendToastMessage(resp.data.story, widgetMessages, "group conversation", resp.data.character_list);
                }
            })
            .catch((error) => {
                alert("Oops, please try again!");
                console.log(error);
                setIsLoading(false);
            }) 
    }

    // state 6: 
    const continueGroupChat = (messages, characterName) => {
             // console.log(promptList)

        const prompt = promptList.join(" ");
        setIsLoading(true);
        axios.post(storyRouter, {
            scriptplay_id:scriptInfo.scriptplay_id,
            order:order,
            script_name:scriptInfo.script,
            prompt_state:"6",
            prompt:prompt,
            messages:messages,
            character_name:characterName,
            summary:summary,
        })
            .then((resp) => {
                // console.log(resp);
                setPromptList([...promptList,resp.data.new_prompt ,resp.data.story])
                setLeftPage([...leftPage, {story:resp.data.story, image:resp.data.img}])
                // setQuestionState(select());
                ////////////////////////////////////// for user study //////////////////////////////////
                setQuestionState(1);
                setIsLoading(false);
                setOrder(order + 1);
                setShowLeftInfo(false);
                setLeftInfo();

                if(currentSage.sageFullName !== "None" && sageStyle !== "No Agent" && mode === "Post-Action Mode"){
                    sendToastMessage(resp.data.story, widgetMessages, "group conversation", messages);
                }
            })
            .then(() => {
                setRightPage();
            })
            .catch((error) => {
                alert("Oops, please try again!");
                console.log(error);
                setIsLoading(false);
            }) 
    }



    // click button to continue chatting with gpt
    const continueStory = ()=>{
        if(questionState === 0){
            askForStory();
        }else if(questionState === 1){
            // get three options
            askForOptions();
        }else if(questionState === 2 ){
            // get a conversation
            askForCharacter();
        }else if(questionState === 5){
            askForGroupChat();   
        }else if(questionState === -1){
            //
            alert("Please finish current story event first!");
        }   
    }


    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
   // paging renderings

    //end story
    const endStory = (e) => {
        e.preventDefault();
        navigate("/ending");
    }

    // change story page
    const preStory = () => {
        if(storyIndex === 0){
            return;
        }else{
            setStoryIndex(storyIndex - 1);
        }
    }
    const nextStory = () => {
        if(storyIndex === leftPage.length - 1){
            return;
        }else{
            setStoryIndex(storyIndex + 1);
        }
    }



    // render left page
    const renderStories = () => {
        for(let i=0; i<leftPage.length; i++){
            if(i === storyIndex){
                return <StoryCard story={leftPage[i].story} id={i+1} image={leftPage[i].image}></StoryCard>;
            }
        }
    }


    // render right page according automatically
    const renderRrightPage = () => {
        if(!rightPage){
            return (
                <div className="story-right">
                    <h2></h2>
                    <div className="story-right-body">
                    </div>
                </div>
            );
        }else if(rightPage.type === "optionTable"){
            return (
                <div className="story-right">
                    <h2>Decision Making</h2>
                    <div className="story-right-body">
                        <ThreeOptionsTable question={rightPage.question} option_1={rightPage.option_1} option_2={rightPage.option_2} option_3={rightPage.option_3} continueOptions={continueOptions} ></ThreeOptionsTable>
                    </div>
                </div>
            );
        }else if(rightPage.type === "conversation"){
            return (
                <div className="story-right">
                    <h2>Individual Chat</h2>
                    <div className="story-right-body">
                        <Conversation 
                            toggleShowLeftInfo={toggleShowLeftInfo} 
                            avatar={rightPage.avatar}
                            characterName={rightPage.characterName} 
                            personality={rightPage.personality} 
                            firstSentence={rightPage.firstSentence} 
                            chatBackground={rightPage.chatBackground} 
                            continueConversation={continueConversation} 
                            order={order}
                        ></Conversation>
                    </div>
                </div>
            );
        }else if(rightPage.type === "groupchat"){
            return (
                <div className="story-right">
                    <h2>Group Chat</h2>
                    <div className="story-right-body">
                        <GroupChat 
                            toggleShowLeftInfo={toggleShowLeftInfo} 
                            script={scriptInfo.script}
                            userName={rightPage.userName} 
                            characterList={rightPage.characterList} 
                            firstSpeaker={rightPage.firstSpeaker} 
                            firstSentence={rightPage.firstSentence}
                            chatBackground={rightPage.chatBackground}
                            continueGroupChat={continueGroupChat}
                        ></GroupChat>
                    </div>
                </div>
            );
        }
    }

    const renderLeftPage = () => {
        if(showLeftInfo && leftInfo.type === "social-media"){
            return <SocialMedia socialMedia={leftInfo}></SocialMedia>;
        }else if(showLeftInfo && leftInfo.type === "groupchat-info"){
            return <GroupChatInfo characterList={leftInfo.characterList}></GroupChatInfo>;
        }else{
            return (
                <div className="story-left">
                    <div className="story-left-header">
                        <h2 onClick={() => console.log( sageStyle)}>Story Panel</h2>
                    </div>
                    <div className="story-left-body">
                        <div className="story-card-container">
                            {renderStories()}
                            <img src={IconLeft} alt="icon to left card"  className="story-card-btn story-card-left" onClick={preStory}></img>
                            <img src={IconRight} alt="icon to right card" className="story-card-btn story-card-right" onClick={nextStory}></img>
                        </div>
                        
                    </div>
                    <div className="story-left-footer">
                        <div className="story-left-btns">
                            {questionState === -1 ? <></> : <button className="continue-story" onClick={continueStory}>Continue</button>}
                            {questionState === -1 ? <></> : <button className="end-story" onClick={endStory}>End story</button>}
                        </div>
                    </div>
                </div>
            ); 
        }
    }

    const toggleShowLeftInfo = (e) => {
        // e.preventDefault();
        if(leftInfo){
            setShowLeftInfo(!showLeftInfo);
        }
    }

    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------
    // For sage agent(widget)
    const [widgetMessages, setWidgetMessages] = useState([]);
    const [widgetMsg, setWidhetMsg] = useState("");
    const sendMessageWidget = (messages,new_message) => {
        axios.post(widgetChatRouter, {
            scriptplay_agent_id:scriptInfo.scriptplay_agent_id,
            script_name:scriptInfo.script,
            widget_name:currentSage.sageFullName,
            messages:messages,
            new_message:new_message,
            username: scriptInfo.user_name,
        })
        .then((resp) => {
            // console.log(resp);
            setWidgetMessages([...messages, {role:"assistant", content:resp.data}]);
        })
        .catch((error) => {
            alert("Oops, please try again!");
            console.log(error);
        }) 
    }
    // user send message
    const sendMessage = (e) => {
        e.preventDefault();
        const newMessages = [...widgetMessages, {role:"user", content:widgetMsg}];
        sendMessageWidget(newMessages, widgetMsg);
        setWidhetMsg("");
    }

    const handleMsgChange = (e) => {
        setWidhetMsg(e.target.value);
    }


    //auto trigger toastify messages
    const sendToastMessage = (story, widgetMessages, event, event_description) => {
        // if none agent chosen
        if(currentSage.sageFullName === "None"){
            return ;
        }

        axios.post(widgetToastChatRouter, {
            scriptplay_agent_id:scriptInfo.scriptplay_agent_id,
            script_name:scriptInfo.script,
            order:order,
            widget_name:currentSage.sageFullName,
            story:story,
            messages:widgetMessages,
            style: sageStyle,
            mode: mode,
            username: scriptInfo.user_name,
            event:event,
            event_description:event_description,
        })
        .then((resp) => {
            // console.log(resp);
            notify(resp.data);
            setWidgetMessages([...widgetMessages, {role:"assistant", content:resp.data}]);
        })
        .catch((error) => {
            console.log(error);
        }) 
    }


    const notify = (toastMsg) => {
        toast(toastMsg ,{
            position: "bottom-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }




    return (
        <div className="main">
            <div className="storypage">
                {renderLeftPage()}

                <ToastContainer />
                {renderRrightPage()}
            </div>


            {/* <ChatWidget currentSage={currentSage} messages={widgetMessages} msg={widgetMsg} sendMessage={sendMessage} handleMsgChange={handleMsgChange}></ChatWidget> */}
            {currentSage.sageFullName !== "None" && sageStyle !== "No Agent" &&
                <ChatWidget currentSage={currentSage} messages={widgetMessages} msg={widgetMsg} sendMessage={sendMessage} handleMsgChange={handleMsgChange}></ChatWidget>
            }


            {/* loading */}
            <div className={`loading-container isloading-${isLoading}`}>
                <img className="loading" src={IconLoading} alt="loading icon"></img>
            </div>
            <div className={`loading-background isloading-${isLoading}`}></div>
        </div>
    );
};

export default StoryPage;