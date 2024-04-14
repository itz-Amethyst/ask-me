# Ask-me is a service designed to assist with various tasks, such as NFT creation, generating quotes, and translation.

[🔥Live Demo💻](https://www.google.com)

![GIF Demo](https://cdn.discordapp.com/attachments/1113510096622862375/1229167743748538480/Q2-ezgif.com-video-to-gif-converter.gif?ex=662eb2aa&is=661c3daa&hm=d288c303d8a712148b6221c36d018adba39d8fb42bfef29ae3f07cccd88afe4b&)

## Technologies used in project:
 - FastAPi
 - React
 - Tailwind

`UI may appear broken, but I couldn't have done better.`


⚠️**Initially** my idea was to create a simple image generator inspired by the impressive visuals of some NFTs. I wanted to explore the possibility of using a model to generate NFTs based on user input.

✨**Additionally**, I included a feature to help users improve their commands by providing feedback and suggestions. Another feature allows users to request a quote along with an image of its author, adding a touch of authenticity.

🎈**Moreover**, Ask-me supports content in multiple languages by automatically translating it into English. Users can also upload audio files to receive a transcript containing all the words spoken, along with a word count.

```python
NFT_Model = "stable-diffusion-xl-lightning"
Chat_Model = "llama-2-7b-chat-fp16"
Improve_NFT_Command_Model = "hermes-2-pro-mistral-7b"
Quote_Model = "mistral-7b-instruct-v0.2"
Translate_Model = "m2m100-1.2b"
Audio_Model = "whisper"
```

## If I had more time, there are a few things I'd like to add or improve:

1. Enhance the user experience on the frontend, especially in terms of design. Making it more visually appealing can make a big difference.
1. Implement a voice recording feature for whispers. It could add a personal touch and make interactions more engaging.
1. Enable a feature to save pictures to the D1 database, associating them with user IP and browser information as identifiers.
1. Find a solution to deploy Python workers along with their requirements on Cloudflare. This could streamline the deployment process and make scaling easier.


## Run in your machine
 ### Step 1
 
 change the values which are cloudflare_token and id
 `/backend/env.py`
 
 open terminal 
 1. `cd backend`
 2. `python main.py` OR `uvicorn main:app`
 
### Step 2
 change the `debug` value to false in 
`frontend/next.config.js`

run command 
 1. `cd frontend`
 2. `npm i `
 3. `npm run dev`

