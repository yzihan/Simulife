import ShantaramProfile from "../assets/imgs/shantaram/Shantaram.png";
import HarryPotterProfile from "../assets/imgs/harrypotter/HarryPotter.png"
import WitcherProfile from "../assets/imgs/witcher/Witcher.png"
import ThreeBodyProfile from "../assets/imgs/threebody/WenjieYe.png"
import ShackletonProfile from "../assets/imgs/endurance/Shackleton.png";
import SullyProfile from "../assets/imgs/thehudson/sully.png"
import TubmanProfile from "../assets/imgs/tubman/tubman.png";

import ShantaramBG from "../assets/imgs/shantaram/shantaram_bg.png";
import HarryPotterBG from "../assets/imgs/harrypotter/harrypotter_bg.png";
import WitcherBG from "../assets/imgs/witcher/witcher_bg.png";
import ThreeBodyBG from "../assets/imgs/threebody/threebody_bg.png";
import EnduranceBG from "../assets/imgs/endurance/Shackleton_bg.png";
import HudsonRiverBG from "../assets/imgs/thehudson/thehudson_bg.png"
import TubmanBG from "../assets/imgs/tubman/tubman_bg.png";
import { harrietTubmanEnding } from "./endings";


export const scripts = [
    { 
        title:"Shantaram",   // id used to identify script in frontend
        script_name:"Shantaram",   // id used to identify script with backend and what users see
        keys: "Criminal, Life",
        role:"Prisoner",
        profile:ShantaramProfile,
        bg:ShantaramBG,
    },
    {
        title: "FreedomQuest",
        script_name: "Harriet Tubman's Freedom Quest",
        keys: "Freedom, Courage",
        role: "Resilient Liberator",
        profile: TubmanProfile,
        bg: TubmanBG
    }, 
    {
        title: "Endurance",
        script_name: "The Shackleton Expedition",
        keys: "Survival, Exploration",
        role: "Expedition Leader",
        profile: ShackletonProfile,
        bg: EnduranceBG,
    },
    {
        title:"HarryPotter",
        script_name:"Harry Potter",
        keys: "Magic",
        role:"Wizard",
        profile:HarryPotterProfile,
        bg:HarryPotterBG,
    },
    {
        title:"Witcher",
        script_name:"The Witcher",
        keys: "Adventure",
        role:"Monster hunter",
        profile:WitcherProfile,
        bg:WitcherBG,
    },
    {
        title:"ThreeBody",
        script_name:"The Three-Body Problem",
        keys: "Science Fiction",
        role:"Astrophysicist",
        profile:ThreeBodyProfile,
        bg:ThreeBodyBG,
    },
    {
        title: "TheHudson",
        script_name: "MiracleOnTheHudson",
        keys: "Survival, Heroism",
        role: "Pilot",
        profile: SullyProfile,
        bg: HudsonRiverBG,
    },   
    
]

export const getBackground = (script) => {
    if(script === "Shantaram"){
        return ShantaramBG;
    }else if(script === "HarryPotter"){
        return HarryPotterBG;
    }else if(script === "Witcher"){
        return WitcherBG;
    }else if(script === "ThreeBody"){
        return ThreeBodyBG;
    }else if(script === "Endurance"){
        return EnduranceBG;
    }else if(script === "TheHudson"){
        return SullyProfile;
    }else if(script === "FreedomQuest"){
        return harrietTubmanEnding;
    }
}
