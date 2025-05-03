class EnduranceExpedition:
    username = "Shackleton"
    script_name = "The Shackleton Expedition"
    subtitle = "The Incredible Voyage of Shackleton's Imperial Trans-Antarctic Expedition"
    author_profile = "/endurance/author_profile.jpg"
    first_story_image = "/endurance/first_image.png"
    first_story_keywords = "Endurance, survival, Antarctica, expedition, leadership"
    image_path = "/endurance/charts/"
    image_counts = 0
    character_list = [
        {
            "name": "Shackleton",
            "description": "The expedition leader, determined and resourceful, guiding his crew through unimaginable challenges.",
            "url": "/endurance/ch_shackleton.png",
        },
        {
            "name": "Frank Worsley",
            "description": "The ship's captain and navigator, whose skills are crucial to the crew's survival and eventual rescue.",
            "url": "/endurance/ch_worsley.png",
        },
        {
            "name": "Tom Crean",
            "description": "A hardy and dependable sailor, whose strength and endurance are vital to the survival of the team.",
            "url": "/endurance/ch_crean.png",
        },
        {
            "name": "Frank Wild",
            "description": "Shackleton's second-in-command, known for his unwavering loyalty and leadership alongside Shackleton.",
            "url": "/endurance/ch_wild.png",
        },
        {
            "name": "Harry McNish",
            "description": "The ship's carpenter, whose ingenuity and craftsmanship are key in the crew's attempts to survive.",
            "url": "/endurance/ch_mcnish.png",
        }
    ]

    story_description = """The Endurance Expedition is an epic tale of survival, leadership, and adventure in the face of the Antarctic's brutal landscape. Led by Sir Ernest Shackleton, the expedition aimed to cross the Antarctic continent but instead became a struggle for survival when their ship, the Endurance, was trapped and crushed by ice. Shackleton's leadership and the crew's resilience were tested to the extreme as they fought against the odds to find a way back to civilization. This story is a testament to the human spirit's capacity for endurance and hope in the most desperate situations."""

    first_story = "Shackleton, your journey begins with ambitious dreams of crossing the Antarctic continent. However, fate has other plans as your ship, the Endurance, becomes trapped in the ice. As the ice crushes the vessel that was your only hope of completing the expedition, you must now lead your crew to safety. With limited supplies and the Antarctic winter approaching, you face the ultimate test of leadership and survival. Your decisions will determine the fate of your crew in this unforgiving icy wilderness."

    prompt_head = "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, incorporating a sense of time passing, to help the user experience the entire narrative. This is the story: " + story_description 