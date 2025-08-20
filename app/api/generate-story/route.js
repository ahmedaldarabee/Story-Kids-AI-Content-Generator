import { db } from "@/config/db";
import { storyTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenAI } from '@google/genai';
import axios from "axios";

export async function POST(req) {
    try {
        const { storySubject, storyType, ageGroup } = await req.json();

        if (!storySubject || !storyType || !ageGroup) {
            return NextResponse.json(
                { error: "Missing required fields: storySubject, storyType, or ageGroup" },
                { status: 400 }
            );
        }

        const user = await currentUser();
        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized User" },
                { status: 401 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const PROMPT = `
            Create a magical and engaging children's story based on the following input:
                - Title/Subject: ${storySubject}
                - Story Type: ${storyType}
                - Age Group: ${ageGroup}

                
            Your response should be returned strictly in JSON format and follow the schema described.
            
                Story Details:
                - Title/Subject: ${storySubject}
                - Story Type: ${storyType}
                - Age Group: ${ageGroup}

                Story Requirements:
                - Make the language appropriate for ${ageGroup} children
                - Include moral lessons and positive values
                - Create engaging characters and plot
                - Make it ${storyType === 'Educational' ? 'educational and informative' : storyType === 'Bed Story' ? 'calming and soothing for bedtime' : 'adventurous and exciting'}
                - Generate 5-8 chapters/pages depending on the age group

                Create an appropriate image prompt for the story cover:
                "Create a whimsical and colorful children's book illustration for a story about '${storySubject}'. 
                The artwork should be in a friendly, cartoon-like style suitable for ${ageGroup} children. Include bright, cheerful colors with characters that look approachable and magical. The scene should capture the essence of '${storySubject}' with elements that would appeal to young readers. Make it look like a professional children's book cover with a dreamy, imaginative quality perfect for a ${storyType.toLowerCase()}."
            
                Important:
                - The story content should be specifically about: ${storySubject} 
                - Make it appropriate for ${ageGroup} age group
                - Style it as a ${storyType}
                - Include positive messages and age-appropriate vocabulary
                - Each chapter should be engaging but not too long for the target age group
                - CRITICAL: Return ONLY valid JSON, no additional text or explanations. Ensure all strings are properly escaped and quoted
                - Do not include trailing commas in JSON objects or arrays

                Respond using this EXACT JSON structure only (no extra text):
                {
                    "story": {
                        "title": "Creative story title here",
                        "description": "story summary here",
                        "type": "${storyType}",
                        "ageGroup": "${ageGroup}",
                        "totalPages": 6,
                        "imagePrompt": "Cover image description here",
                        "pages": [
                            {
                                "pageNumber": 1,
                                "title": "Chapter title here",
                                "content": "Story content here",
                                "imagePrompt": "Page image description here"
                            }
                        ]
                    }
                }
        `;

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const config = {
            responseMimeType: "application/json"
        };

        const model = 'gemini-2.0-flash-exp';
        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: PROMPT,
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: [{ role: "user", parts: [{ text: PROMPT }] }],
            generationConfig: { responseMimeType: "application/json" },
        });


        // Check if response exists and has the expected structure
        if (!response?.candidates?.[0]?.content?.parts?.[0]?.text) {
            console.error('Invalid AI response structure:', response);
            return NextResponse.json(
                { error: "Failed to generate story content" },
                { status: 500 }
            );
        }

        let rawResponse = response.candidates[0].content.parts[0].text;
        
        // Clean the response
        const cleanedJSON = rawResponse
            .replace(/^```json\s*/i, '')
            .replace(/\s*```$/i, '')
            .trim();

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(cleanedJSON);
        } catch (parseError) {
            return NextResponse.json(
                { error: "Failed to parse AI response as JSON" },
                { status: 500 }
            );
        }

        if (!parsedResponse?.story) {
            return NextResponse.json(
                { error: "Invalid story format from AI" },
                { status: 500 }
            );
        }

        // image generation section
        const imagePromptInfo = parsedResponse.story?.imagePrompt
        const imageURL = await generateImage(imagePromptInfo);
        const newStoryId = uuidv4();

        try {
            await db.insert(storyTable).values({
                storyId: newStoryId,
                storySubject,
                storyType,
                ageGroup,
                imageURL:imageURL,
                content: parsedResponse,
                email: user?.emailAddresses?.[0]?.emailAddress,
            });

        } catch (dbError) {
            return NextResponse.json(
                { error: "Failed to save story to database" },
                { status: 500 }
            );
        }


        return NextResponse.json({ 
            success: true, 
            storyId: newStoryId 
        });
        
    } catch (error) {
        return NextResponse.json({ 
            error: "Internal server error",
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        }, { status: 500 });
    }
}

const generateImage = async (imagePromptInfo) => {
    const BASE_URL='https://aigurulab.tech';
    const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: imagePromptInfo,
            model: 'sdxl',
            aspectRatio:"16:9"
        },
        {
            headers: {
                'x-api-key': process.env.API_KEY,
                'Content-Type': 'application/json',
            },
        })
        
    return result.data.image;
}