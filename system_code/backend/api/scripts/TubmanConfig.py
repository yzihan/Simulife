class HarrietTubman:
    username = "Harriet"
    script_name = "Harriet Tubman's Freedom Quest"
    subtitle = "Inspired by the life of Harriet Tubman"
    author_profile = "/tubman/author_profile.jpg"
    first_story_image = "/tubman/first_image.png"
    first_story_keywords = "Harriet Tubman, Underground Railroad, slavery, freedom, courage"
    image_path = "/tubman/charts/"
    image_counts = 30
    character_list = [
        {
            "name": "Harriet",
            "description": "The protagonist, born into slavery, who becomes a leading figure in the Underground Railroad, helping slaves escape to freedom.",
            "url": "/tubman/ch_harriet.png",
        },
        {
            "name": "John Tubman",
            "description": "Harriet's first husband, a free black man who does not share her dream of freedom for all.",
            "url": "/tubman/ch_john.png",
        },
        {
            "name": "William Still",
            "description": "An African American abolitionist and conductor on the Underground Railroad who helps Harriet in her missions.",
            "url": "/tubman/ch_william.png",
        },
        {
            "name": "Marie",
            "description": "A friend and abolitionist in Philadelphia who provides Harriet with a safe house and support.",
            "url": "/tubman/ch_marie.png",
        },
        {
            "name": "Gideon",
            "description": "A fictional antagonist determined to capture Harriet, embodying the constant danger she faces.",
            "url": "/tubman/ch_gideon.png",
        }
    ]

    story_description = """This role-playing game is inspired by the remarkable life of Harriet Tubman. Born into slavery, Harriet escapes and becomes a key figure in the Underground Railroad, a secret network designed to help enslaved African Americans escape to freedom. Facing immense danger, Harriet returns to the South multiple times to guide others to safety. Along the way, she encounters allies and enemies, overcomes obstacles, and fights for justice and equality. Her courage, ingenuity, and determination make her a legendary figure in the fight against slavery."""

    first_story = "Harriet, your incredible journey begins with a daring escape from slavery. You've heard whispers of the Underground Railroad, a path to freedom, but the road ahead is fraught with danger. Your first challenge is to navigate through the woods under the cover of night, evading slave catchers who are hot on your trail. Trusted allies await to guide you to safety, but you must first reach them. The decisions you make will shape your destiny and the lives of those you vow to return and free. Will you muster the courage to forge ahead, or will fear hold you back? The quest for freedom begins now."

    prompt_head = "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, incorporating a sense of time passing, to help the user experience the entire narrative. This is the story: " + story_description 
