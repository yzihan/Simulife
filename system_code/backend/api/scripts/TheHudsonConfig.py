class MiracleOnTheHudson:
    username = "Sully"
    script_name = "MiracleOnTheHudson"
    subtitle = "A Real-Life Tale of Courage and Survival"
    author_profile = "/thehudson/author_profile.jpg"
    first_story_image = "/thehudson/first_image.png"
    first_story_keywords = "Miracle, Hudson, survival, courage, teamwork"
    image_path = "/thehudson/charts/"
    image_counts = 1
    character_list = [
        {
            "name": "Sully",
            "description": "The calm and experienced pilot of Flight 1549, who heroically lands the plane on the Hudson River, saving everyone on board.",
            "url": "/thehudson/ch_sully.png",
        },
        {
            "name": "Skiles",
            "description": "The co-pilot of Flight 1549, whose quick actions and teamwork with Sully contribute to the successful water landing.",
            "url": "/thehudson/ch_skiles.png",
        },
        {
            "name": "Stark",
            "description": "A middle-aged man caught in the extraordinary situation of the Miracle on the Hudson. His mix of apprehension and determination captures the essence of quiet bravery amidst uncertainty. Representing the diverse passengers on board, his story is one of resilience and hope.",
            "url": "/thehudson/ch_passenger.png",
        },
        {
            "name": "Alexandra",
            "description": "A dedicated female rescuer part of the emergency response team during the Miracle on the Hudson. Dressed in her rescue uniform and ready for action, her focused determination and compassion embody the bravery and dedication of first responders in critical situations.",
            "url": "/thehudson/ch_rescuer2.png",
        },
        {
            "name": "John",
            "description": "One of the first responders, part of the rescue operation that swiftly acted to ensure the safety of all passengers and crew.",
            "url": "/thehudson/ch_rescuer1.png",
        },
    ]

    story_description = """The Miracle on the Hudson is an inspiring true story of heroism and survival. On January 15, 2009, US Airways Flight 1549, piloted by Captain Chesley "Sully" Sullenberger and First Officer Jeffrey Skiles, struck a flock of geese and lost all engine power. Demonstrating incredible skill and calm under pressure, Sully successfully landed the plane on the Hudson River, saving the lives of all 155 people on board. This tale not only celebrates the quick actions of the crew but also the spirit of cooperation and resilience among the passengers and the first responders. """

    first_story = "Sully, you're moments after takeoff when a flock of geese strikes the engines, leaving you with no power. The plane is losing altitude rapidly, and you're faced with an impossible decision: try to return to LaGuardia, divert to another nearby airport, or attempt a water landing on the Hudson. With lives in your hands and seconds to act, you choose the river. It's a race against time to prepare the cabin and execute a landing no commercial pilot has ever done successfully. Your actions in the next few minutes will define a miracle. "

    prompt_head = "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, incorporating a sense of time passing, to help the user experience the entire narrative. This is the story: " + story_description 