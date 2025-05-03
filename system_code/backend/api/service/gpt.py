
from ..scripts.script_util import PromptTemplate
import datetime
from ..dao import ScriptPlayDAO,WidgetDAO
from ..utils.utils import *
from ..utils.image_util import *
from ..scripts.WidgetSettings import WidgetSetting

# scripts
from ..scripts.ShantaramConfig import Shantaram
from ..scripts.HarryPotterConfig import HarryPotter
from ..scripts.WitcherConfig import Witcher
from ..scripts.ThreeBodyConfig import ThreeBody
from ..scripts.EnduranceConfig import EnduranceExpedition
from ..scripts.TheHudsonConfig import MiracleOnTheHudson
from ..scripts.TubmanConfig import HarrietTubman

from ..ai_models.openai_api import OpenAIAPI




class GptAPI:
    """
    prompt state: 
        0: ask for a story description
        1: ask for three options
        2: ask for character
        3: ask for story description after options
        4: ask for story description after conversation
    """
    @staticmethod
    def storyGPT(req):
        # script name is not being used so far
        script_name, prompt_state, prompt, scriptplay_id, order = req["script_name"], req["prompt_state"], req["prompt"], req["scriptplay_id"], req["order"]
        print("state",prompt_state)

        # set prompt script
        Script_class = HarryPotter
        if script_name == "Shantaram":
            Script_class = Shantaram
        elif script_name == "Witcher":
            Script_class = Witcher
        elif script_name == "ThreeBody":
            Script_class = ThreeBody
        elif script_name == "Endurance":
            Script_class = EnduranceExpedition
        elif script_name == "TheHudson":
            Script_class = MiracleOnTheHudson
        elif script_name == "FreedomQuest":
            Script_class = HarrietTubman

            
        username = Script_class.username

        # for summarized prompt header
        if req["summary"] == "N/A":  
            prompt = Script_class.prompt_head + " " + prompt
        else:
            prompt = PromptTemplate.wrap_prompt_head(prompt=req["summary"]) + prompt
            
        
        ##############################################3##################33
        # this is temp
        first_story_image = Script_class.first_story_image
        ###################################################################
        

        # ask for story
        if prompt_state == "0":
            try:
                resp = OpenAIAPI.send_prompt(prompt = prompt+ " "+  PromptTemplate.ask_story(username))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_prompt(prompt = prompt+ " "+  PromptTemplate.ask_story(username))
                res = parse_to_json(resp)

            # generate img
            ###############################################################################
            # img = DalleAPI.generateImg(res["story"])
            # res["img"] = get_image(Script_class=Script_class)
            res["img"] = first_story_image
            ###############################################################################

            #store data
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="story-description",data = res)
            return res
        
        # ask for options
        elif prompt_state == "1":
            try:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_options(username))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_options(username))
                res = parse_to_json(resp)

            # generate img
            ###############################################################################
            # img = DalleAPI.generateImg(res["story"])
            # res["img"] = get_image(Script_class=Script_class)
            res["img"] = first_story_image
            ###############################################################################



            #store data
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            # ScriptPlayDAO.create_options(scriptplay_id, order+1, res["question"], res["option_1"], res["option_2"], res["option_3"])
            ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="generate-options",data = res)
            return res
        
        # ask for character
        elif prompt_state == "2":
            try:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_character(username))
                res = parse_ask_character_to_json(resp)
            except:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_character(username))
                res = parse_ask_character_to_json(resp)
            
            res["chat_background"] = PromptTemplate.get_chat_background(username, res["character_name"], res["character_personality"], prompt)
            res["avatar"] = get_random_avatar()
            # generate img
            ###############################################################################
            # generate img
            # img = DalleAPI.generateImg(res["story"])
            res["sm_bg_img"] = "/sample/sample_sm_bg.png"

            for image, i in zip(get_random_post_imgs(), [1,2,3]):
                res["post_image_" + str(i)] = image
            ###############################################################################
            # res["img"] = get_image(Script_class=Script_class)
            res["img"] = first_story_image
            
            #store data
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            # ScriptPlayDAO.start_conversation(scriptplay_id, order+1, res["character_name"], res["character_personality"], res["chat_background"], res["first_sentence"])
            ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="generate-character",data = res)
            return res
        
        #continue options
        elif prompt_state == "3":
            try:
                resp = OpenAIAPI.send_prompt(prompt + " " +PromptTemplate.continue_options(username, req["choice"]))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_prompt(prompt + " " +PromptTemplate.continue_options(username, req["choice"]))
                res = parse_to_json(resp)


            # generate img
            ###############################################################################
            # img = DalleAPI.generateImg(res["story"])
            # res["img"] = get_image(Script_class=Script_class)
            res["img"] = first_story_image
            ###############################################################################
            
            #store data
            # ScriptPlayDAO.choose_option(scriptplay_id, order, req["choice"])
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="continue-options",data = res)
            ScriptPlayDAO.add_option_choice(object_id=scriptplay_id, order=order-1,choice=req["choice"])
            return res
        

        # continue story after conversation
        elif prompt_state == "4":
            # make a summary of conversation
            messages, character_name = req["messages"], req["character_name"]
            try:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.end_conversation(messages,character_name, username))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.end_conversation(messages,character_name, username))
                res = parse_to_json(resp)
            
            # generate img
            ###############################################################################
            # img = DalleAPI.generateImg(res["story"])
            # res["img"] = get_image(Script_class=Script_class)
            res["img"] = first_story_image
            ###############################################################################


            #store data
            # ScriptPlayDAO.insert_story_description(scriptplay_id, order, res["story"], res["img"])
            # ScriptPlayDAO.end_convseration(scriptplay_id, order)
            ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="continue-character",data = res)
            ScriptPlayDAO.add_character_conversation(object_id = scriptplay_id, order = order-1,messages = messages)
            return res
        
        elif prompt_state == "5":
            try:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_groupchat(username=username))
                res = parse_ask_character_to_json(resp)
            except:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.ask_groupchat(username=username))
                res = parse_ask_character_to_json(resp)
            
            # res["img"] = get_image(Script_class=Script_class)
            res["img"] = first_story_image
            res["character_list"] = get_random_avatars(res["character_list"])

            ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="generate-groupchat",data = res)
            return res
    
    # continue story after group chat
        elif prompt_state == "6":
            # make a summary of conversation
            messages, character_name = req["messages"], req["character_name"]
            try:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.end_groupchat(messages, username))
                res = parse_to_json(resp)
            except:
                resp = OpenAIAPI.send_prompt(prompt + " " + PromptTemplate.end_groupchat(messages, username))
                res = parse_to_json(resp)
            

            # res["img"] = get_image(Script_class=Script_class)
            res["img"] = first_story_image

            #store data
            ScriptPlayDAO.add_gameplay_data(object_id = scriptplay_id, order = order, event_type="continue-groupchat",data = res)
            ScriptPlayDAO.add_groupchat_conversation(object_id = scriptplay_id, order = order-1,messages = messages)
            return res

    
    @staticmethod
    def chatGPT_conversation(req):
        resp = OpenAIAPI.send_messages(messages=req["prompt"])

        # Get the current time
        current_time = datetime.datetime.now()
        # formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
        formatted_time = current_time.strftime("%H:%M")
        res = {"resp":resp, "time":formatted_time}
        return res
    
    @staticmethod
    def widgetGPT(req):
        script_name, messages, scriptplay_agent_id,widget_name, username = req["script_name"], req["messages"],  req["scriptplay_agent_id"], req["widget_name"], req["username"]
        
        messages = WidgetSetting.prepare_messages(messages=messages, script_name=script_name,widget_name=widget_name, username=username)
        resp = OpenAIAPI.send_messages(messages=messages)

        WidgetDAO.add_script_play_agent_messages(scriptplay_agent_id, {"role":"user", "content":req["new_message"]})
        WidgetDAO.add_script_play_agent_messages(scriptplay_agent_id, {"role":"assistant", "content":resp})
        return resp
    

    @staticmethod
    def widgetToastGPT(req):
        script_name = req["script_name"]
        messages = req["messages"]
        scriptplay_agent_id = req["scriptplay_agent_id"]
        widget_name = req["widget_name"]
        style = req["style"] 
        mode = req["mode"]
        username = req["username"]
        story = req["story"]
        event = req["event"]
        event_description = req["event_description"]
        

        messages = WidgetSetting.prepare_toast_messages(messages=messages, 
                                                        widget_name=widget_name, 
                                                        style=style, 
                                                        mode=mode, 
                                                        script_name=script_name,
                                                        username=username,
                                                        story=story, 
                                                        event=event, 
                                                        event_description=event_description)
        resp = OpenAIAPI.send_messages(messages=messages)
        WidgetDAO.add_script_play_agent_messages(scriptplay_agent_id, {"role":"assistant", "content":resp}, type="toast",order = req["order"])
        return resp
    
    @staticmethod
    def widget_helper(req):
        resp = OpenAIAPI.send_messages(messages=req["messages"])
        return resp
    

    @staticmethod
    def summarize_prompt(req):
        resp = OpenAIAPI.send_prompt(PromptTemplate.summarize_prompt(req["prompt"]))
        return resp

    @staticmethod
    def chatGPT_groupchat(req):
        resp = OpenAIAPI.send_prompt(PromptTemplate.get_groupchat_bg(
            username=req["username"],
            script = req['script'],
            character_list=req["character_list"],
            messages=req["messages"],
            chat_background=req["chat_background"]
        ))
        res = parse_ask_character_to_json(resp)
        return res
