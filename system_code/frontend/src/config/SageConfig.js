import ImgDefault from "../assets/imgs/sages/no-agent.png";
import ImgTagore from "../assets/imgs/sages/tagore.png";
import ImgYangming from "../assets/imgs/sages/yangming.png";
import ImgPo from "../assets/imgs/sages/po.png";
import ImgBaiLi from "../assets/imgs/sages/li_bai.png";
import ImgShiSu from "../assets/imgs/sages/su_shi.png";
import ImgElon from "../assets/imgs/sages/elon_musk.png";
import ImgLoki from "../assets/imgs/sages/loki.png";


export const sageList = [
    {
        sageName:"None",
        sageFullName:"None",
        country:"No sage agent (default).",
        famousSentence:"",
        description:"",
        image:ImgDefault,  
    }
    ,
    {
        sageName:"Tagore",
        sageFullName:"Rabindranath Tagore",
        country:"India",
        famousSentence:"You can’t cross the sea merely by standing and staring at the water.",
        description:"Tagore was a polymath who reshaped Bengali literature and music, as well as Indian art in the late 19th and early 20th centuries. He was a poet, musician, and artist.",
        image:ImgTagore,  
    },    
    {
        sageName:"Po",
        sageFullName:"Kung Fu Panda  (fictional character)",
        country:"Chinese",
        famousSentence:"There is no secret ingredient.",
        description:`Po is a lovable, clumsy panda who becomes the Dragon Warrior in the animated film series "Kung Fu Panda." Raised in the Valley of Peace, Po's journey transforms him from a noodle shop worker into a skilled kung fu master. His positive attitude and determination make him an endearing character.`,
        image:ImgPo,  
    },
    {
        sageName:"Yangming",
        sageFullName:"Yangming Wang",
        country:"Chinese",
        famousSentence:"Knowledge and action are one and the same.",
        description:`Wang is best known for his doctrine of the "unity of knowing and doing." He argued that moral knowledge is not something that can be learned from books`,
        image:ImgYangming,  
    },
    {
        sageName:"Bai Li",
        sageFullName:"Bai Li",
        country:"Chinese",
        famousSentence:"The river sparkles like a piece of jade, the moon shines like pure silver",
        description:`Li Bai was a renowned Chinese poet from the Tang Dynasty. His poetry is known for its romanticism, vivid imagery, and celebration of nature. Li Bai is considered one of the greatest poets in Chinese literature, and his works continue to be admired for their timeless beauty.`,
        image:ImgBaiLi,  
    },
    {
        sageName:"Loki",
        sageFullName:"Loki Laufeyson",
        country:"Asgardian (fictional character)",
        famousSentence:"I am burdened with glorious purpose.",
        description:`Loki is a fictional character from Marvel Comics, based on Norse mythology. As the adoptive brother of Thor, Loki is the God of Mischief and has been both a villain and an antihero in various storylines. Known for his wit, cunning, and complex personality, Loki has become a fan-favorite in the Marvel Cinematic Universe, portrayed by Tom Hiddleston.`,
        image:ImgLoki,  
    },
    {
        sageName:"Dongpo Su",
        sageFullName:"Dongpo Su",
        country:"Chinese",
        famousSentence:"Bitterly I hum a song and think of the old days.",
        description:`Su Shi, a polymath of the Song Dynasty, was not only a prominent poet but also a statesman, calligrapher, and essayist. His poetry often reflects his deep contemplation on life, nature, and the passage of time. Su Shi is revered for his literary contributions and his enduring influence on Chinese culture.`,
        image:ImgShiSu,  
    },
    {
        sageName:"Elon",
        sageFullName:"Elon Reeve Musk",
        country:"South African and American",
        famousSentence:"I would like to die on Mars. Just not on impact.",
        description:`Elon Musk is a business magnate, industrial designer, and entrepreneur. As the founder and CEO of companies like Tesla and SpaceX, Musk is known for his ambitious vision to advance technology, particularly in electric vehicles and space exploration. His charismatic personality and innovative ventures have made him a prominent figure in the tech industry.`,
        image:ImgElon,  
    },
]


export const defaultSage = sageList[0];