import { Survey } from "~/types/questionnaire";

export default {
  "begin": [
    {
      "category": "Demographic",
      "description": "Please answer the following questions to help us understand your background. This information will be kept confidential and will not be shared with anyone.",
      "questions": [
        {
          "question": "Email",
          "description": "Please provide your email address for contact in case of any issues.",
          "type": "email"
        },
        {
          "question": "Gender",
          "description": "How do you identify yourself?",
          "type": "choice",
          "options": [
            'Male',
            'Female',
            'Non-binary',
            'Other',
            'Prefer not to say',
          ]
        },
        {
          "question": "Age",
          "description": null,
          "type": "number",
          "subtype": "integer",
          "minValue": 12,
          "maxValue": 120
        },
        {
          "question": "Native language",
          "description": null,
          "type": "select",
          "subtype": "single"
        },
        {
          "question": "English proficiency",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": ["Beginner", "Intermediate", "Proficient", "Native"]
        }
      ]
    },
    {
      "category": "Manikin",
      "description": "Please answer the following questions, taking into consideration how are you feeling right now.",
      "questions": [
        {
          "question": "Valence",
          "description": "The emotional quality or positivity/negativity of an experience or emotion.",
          "image": "",
          "type": "likert",
          "subtype": 9,
          "minValue": "Unhappy",
          "maxValue": "Happy"
        },
        {
          "question": "Arousal",
          "description": "The level of physiological and psychological activation or energy associated with an experience or emotion.",
          "image": "",
          "type": "likert",
          "subtype": 9,
          "minValue": "Calm",
          "maxValue": "Excited"
        },
        {
          "question": "Dominance",
          "description": "The degree of control or influence an emotion has over an individual's thoughts and behaviors.",
          "image": "",
          "type": "likert",
          "subtype": 9,
          "minValue": "Controlled",
          "maxValue": "In control"
        }
      ]
    },
    {
      "category": "PANAS",
      "description": "Please answer the following questions, taking into consideration how are you feeling right now.",
      "questions": [
        {
          "question": "Interested",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Distressed",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Excited",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Upset",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Strong",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Guilty",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Scared",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Hostile",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Enthusiastic",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Proud",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Irritable",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Alert",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Ashamed",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Inspired",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Nervous",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Determined",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Attentive",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Jittery",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Active",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Afraid",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        }
      ]
    }
  ],
  "end": [
    {
      "category": "Manikin",
      "description": "Please answer the following questions, taking into consideration how are you feeling right now.",
      "questions": [
        {
          "question": "Valence",
          "description": "The emotional quality or positivity/negativity of an experience or emotion.",
          "image": "",
          "type": "likert",
          "subtype": 9,
          "minValue": "Unhappy",
          "maxValue": "Happy"
        },
        {
          "question": "Arousal",
          "description": "The level of physiological and psychological activation or energy associated with an experience or emotion.",
          "image": "",
          "type": "likert",
          "subtype": 9,
          "minValue": "Calm",
          "maxValue": "Excited"
        },
        {
          "question": "Dominance",
          "description": "The degree of control or influence an emotion has over an individual's thoughts and behaviors.",
          "image": "",
          "type": "likert",
          "subtype": 9,
          "minValue": "Controlled",
          "maxValue": "In control"
        }
      ]
    },
    {
      "category": "PANAS",
      "description": "Please answer the following questions, taking into consideration how are you feeling right now.",
      "questions": [
        {
          "question": "Interested",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Distressed",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Excited",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Upset",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Strong",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Guilty",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Scared",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Hostile",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Enthusiastic",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Proud",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Irritable",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Alert",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Ashamed",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Inspired",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Nervous",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Determined",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Attentive",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Jittery",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Active",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        },
        {
          "question": "Afraid",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Very slightly or not at all",
            "A little",
            " Moderately",
            "Quite a bit",
            "Extremely"
          ]
        }
      ]
    },
    {
      "category": "GUESS",
      "description": "Please answer these questions carefully.",
      "questions": [
        {
          "question": "I think the characters in the game are well developed.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I am captivated by the game’s story from the beginning.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I enjoy the fantasy or story provided by the game.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I can identify with the characters in the game.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I am emotionally moved by the events in the game.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I am very interested in seeing how the events in the game will progress.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I can clearly understand the game’s story.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I think the game is fun.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I enjoy playing the game.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        },
        {
          "question": "I feel bored while playing the game.",
          "description": null,
          "type": "choice",
          "subtype": "single",
          "options": [
            "Strongly disagree",
            "Disagree",
            "Somewhat disagree",
            "Neither agree nor disagree",
            "Somewhat agree",
            "Agree",
            "Strongly agree"
          ]
        }
      ]
    },
    {
      "category": "Narrative Scale",
      "description": "Please answer the following questions with the story of the game you are playing in mind.",
      "questions": [
        {
          "question": "I am often impatient to find out how a story ends.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "I am often glued to a story, yearning to see how everything plays out.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "Stories arouse my curiosity easily.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "It is easy for me to get involved with the feelings of the characters in a story.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "I am often affected emotionally by stories.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "I often feel happy when a character succeeds, and I feel sad when they suffer in some way.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "I often become very involved in a story that I would otherwise consider unrealistic, just for the fun of it.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "I can easily immerse myself even in unrealistic stories.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "I often find myself accepting events that I might have otherwise considered unrealistic.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "The story world is often closer to me than the real world.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "I often feel that a story creates a new world, and then that world suddenly disappears when the story ends.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        },
        {
          "question": "When I read a story, I often feel that my body is in the room, but my mind is inside the world created by the story.",
          "description": null,
          "type": "likert",
          "subtype": 7,
          "minValue": "Disagree",
          "maxValue": "Agree"
        }
      ]
    },
    {
      "category": "Others",
      "description": "Please answer the following questions.",
      "questions": [
        {
          "question": "Did you encounter a black screen or unknown characters during gameplay?",
          "description": null,
          "type": "choice",
          "subtype": "binary",
          "options": ["Yes", "No"]
        },
        {
          "question": "If you encountered any issues during gameplay, please describe them here.",
          "description": "Please provide as much detail as possible. In case you don't have any issues, please type 'N/A'.",
          "type": "text"
        },
        {
          "question": "Do you have any comments or suggestions about the game?",
          "description": "Please provide as much detail as possible. In case you don't have any comments or suggestions, please type 'N/A'.",
          "type": "text"
        }
      ]
    }
  ]
} as Survey
