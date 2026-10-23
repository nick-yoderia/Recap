---
date: October 23 2026
title: Recap
---

# 

**About arc42**

arc42, the template for documentation of software and system
architecture.

Template Version 9.0-EN. (based upon AsciiDoc version), July 2025

Created, maintained and © by Dr. Peter Hruschka, Dr. Gernot Starke and
contributors. See <https://arc42.org>.

# Introduction and Goals (Keyan)

Recap is a project focused on improving meeting effectiveness and efficiency. Its primary goal is to process audio files and extract useful, concise, and accurate information. 

Once an audio file is uploaded, the system processes the recording, generates a summary, and displays it to the user.  Users can export summaries as PDF files or markdowns, to retain and refer back to meeting information over time. Users do not need to create an account or sign in, database entries are associated with the user’s browser through long-lived cookies. 

The system should process audio files reliably and generate accurate and understandable summaries within a reasonable amount of time. Errors should not cause the application to fail, they should be handled gracefully and communicated clearly to the user. The user interface should also be intuitive and provide a seamless experience for users. 


## Requirements Overview (Rita)

### **Contents**

The main purpose of Recap is to provide a structured summary for the user. The system takes an uploaded audio file in mp3, mp4, or WAV format and transcribes it into a summary display to the user. 

### **Main Features**

- Provide simple user interface that is easy to navigate
- Summarize audio file into a structured format
- Summary format contains a short summary section, key decisions, topic outline with timestamps
- User has an option to download a summary into a pdf file or markdowns 
- Handle unexpected file gracefully

### **Motivation**

The system is intended to provide an accurate summary where users can refer back to the meeting information later. 

(not main features)/ detailed requirement table
- After the user upload the audio file, audio file will be deleted
- Display a file upload percentage

### **Form**

TODO

## Quality Goals (Keyan)

Work in progress:

| Quality | Motivation |
|---------|------------|
| Understandability | Information pulled from the audio/video files should not be a wall of text. Extract a short overall summary, key decisions, action items, and a topic outline with timestamps. |
| Reliability | The system does not crash in the face of file or API failure. Errors should be handled gracefully and communicated clearly to Users. |
| Compatibility | Application works for devices of any size, running any operating system linux, mac, or windows. Audio files from anything should be accepted (Zoom, Teams, phone calls, etc. ) |
| Usability | The User interface should be attractive and intuitive for all users. The database should store user's information on a per browser basis, so past recaps can be displayed and re-opened. |
| Interoperability | The Application should provide a simple Rest API that is capable of grabbing users past meetings, posting new meetings, and communicating what stage the pipeline is in. |

## Stakeholders (Charles)

TODO

| Role/Name    | Contact         | Expectations        |
|--------------|-----------------|---------------------|
| *\<Role-1\>* | *\<Contact-1\>* | *\<Expectation-1\>* |
| *\<Role-2\>* | *\<Contact-2\>* | *\<Expectation-2\>* |

# Architecture Constraints (Charles)

TODO

# Context and Scope (Nick)

Recap is a web application that takes a speech recording from the user's browser and transcribes it. It relies on an external LLM to transform that transcription into a concise summary. Recording meetings, hosting meetings, live listening, managing accounts, and acting on the meeting summaries are outside of the scope. Recap is only responsible for processing files provided by the user and a history of previous uploads by said user is provided through returning user's browser cookies.

# Solution Strategy (Dennis)

The application will be a web-based platform that will process audio files using AI to return a transcription and other AI-powered features, while using cookies to keep track of the user’s past transcriptions in a database. Therefore, the structure of the project is three parts that includes the frontend, backend, and database.

React will be used to create the user interface for uploading files and viewing status of file transcription and view past transcriptions. FastAPI will be the backend API to coordinate requests from the frontend. Faster-Whisper is the model of choice to handle speech transcription. Additionally, the backend will also support other AI processing features.

All AI processing will be happening in the background, so that the frontend is not limited and required to wait while it is happening. Progress will be available with an interactive interface which will display the status of the file, which will include status values like “uploading,” “transcribing,” and “ready,” just to name a few.

Once processed, transcriptions and any other generated data will be stored using SQLite, allowing users to return and view any past transcriptions. For security reasons, the file itself will not be stored anywhere, only the resulting generated data. This data will be tracked using long-lived user cookies, so there will be no login required.

# Building Block View (Luke)

## Scope and Context

![Scope and Context](assets/luke/scope-and-context-diagram.svg)

React provides users with a single interface to upload meeting recordings from their local filesystem and view structured summaries of the audio content. The system interfaces with the OpenAI API to generate the summaries from meeting transcripts. 

### Interfaces
| Interface | Direction | Description |
|---|---|---|
| User Interface | User ↔ Recap | Uploads recordings and displays summaries |
| OpenAI API | Recap ↔ OpenAI | Sends transcripts and receives structured summaries |

## Level 1

![Level 1 Building Blocks](assets/luke/level-1-building-block-diagram.svg)


### Contained blackboxes
| Building Block | Description |
|---|---|
| Front End | Provide the interface that users will interact with when uploading meeting recordings or viewing structured meeting summaries. |
| Back End| Process recordings, generate transcripts with Whisper, interact with OpenAI API, and manage data transfer between front end and database. |
| Database | Record metadata about meeting recordings, transcripts, and summaries|
---
### Interfaces
| Interface | Direction | Description |
|---|---|---|
| User Interface | User ↔ Front End | Uploads recordings and displays summaries |
| Backend API | Front End ↔ Backend | Send raw audio for processing and return structured summary and processing status | 
| Persistence API | Backend ↔ Database | Manage communication from backend to database |
| OpenAI API | Backend ↔ OpenAI | Sends transcripts and receives structured summaries |
---


## Level 2

![Level 2 Backend Building Blocks](assets/luke/level-2-backend-diagram.svg)

### Contained blackboxes
| Building Block | Description |
|---|---|
| Request Handler | Interpret requests from front end, call corresponding back end modules, access stored meeting data, and return results to front end |
| Audio Processing | Process raw audio files with ffmpeg |
| Transcript Generation | Generate structured transcripts from processed audio files with Faster-Whisper |
| Summarize | Coordinate communication with OpenAI API and generate structured summaries of passed transcripts  |
---

### Interfaces
| Interface | Direction | Description |
|---|---|---|
| Backend API | Front End ↔ Backend  | Receives uploaded audio files and returns structured summaries |
| Audio Processing CLI | Request Handler ↔ Audio Processing | Initiates audio processing and returns completion status |
| Transcription CLI | Request Handler ↔ Transcript Generation | Initiates transcription with Faster-Whisper and returns completion status |
| Summarization CLI | Request Handler ↔ Summarize | Initializes summarization and returns completion status|
| OpenAI API | Summarize ↔ OpenAI | Sends transcripts and receives structured summaries from OpenAI|
| Database Access | Backend Components ↔ Database | Each component individually manages reading and writing to the database. | 

---


# Runtime View (Rita + Keyan 😀)

- user upload an audio file frontend -> check if file is valid -> Axios send http request to RestAPI -> backend do the summary -> RestAPI send HTTP to frontend Axios -> Frontend display the summary
- Backend process:
- invalid file submitted -> display a message to the user, automatically reject the file

## \<Runtime Scenario 1\>

- *\<insert runtime diagram or textual description of the scenario\>*

- *\<insert description of the notable aspects of the interactions
  between the building block instances depicted in this diagram.\>*

## \<Runtime Scenario 2\>

## …​

## \<Runtime Scenario n\>

# Deployment View (Nick)

## Infrastructure Level 1

```mermaid
flowchart TB
 subgraph container["Recap Container (Docker)"]
        api["API app (FastAPI)<br>API + serves React build"]
        convert["Convert Job (CLI)<br>FFmpeg"]
        transcribe["Transcribe Job (CLI)<br>Faster-Whisper"]
        summarize["Summarize Job (CLI)"]
  end
 subgraph host["Host Machine"]
        container
        volume[("Persistent Volume<br>data/recap.db<br>data/media/")]
  end
    user@{ label: "User's Browser<br>(runs React app)" } <-- HTTPS --> api
    api <-- runs CLI --> convert & transcribe & summarize
    convert <-- SQL,<br>File System --> volume
    transcribe <-- SQL,<br>File System --> volume
    summarize <-- SQL --> volume
    summarize <-- HTTPS --> llm["External LLM API"]
    api <-- SQL,<br>File System --> volume

    user@{ shape: rect}
```

### **Motivation**  
We are targeting a complete self-hosted web application. The main priorities are simplicity, portability, and functionality. We are not expecting high traffic which means we can defer the use of container clusters, complex event streams and message/job queues. Furthermore, to maintain simplicity we are utilizing a single Docker container to contain the entirety of the web app host. This has the secondary benefit of giving us portability to run on varying hosts and operating systems. With this infrastructure layout we also maintain the modularity required for a multi-person project. Utilizing a central app for the API and subprocesses for the modular components of Recap gives clear compartmentalization of the application.

### **Quality and/or Performance Features**
- **Responsiveness**: The API and web server relay jobs to the parallel CLI subprocesses. This keeps them free to handle incoming traffic without having to wait for running jobs to complete before serving other users.
- **Persistence and Reliability**: The database and data volume persist across container restarts, rebuilds, and crashes. The downside of running a single Docker container on a single host machine is a single point of failure. If the host goes down, or gets so much traffic that CPU load becomes too high, the application will respond slowly or not at all.
- **Scalability**: This model does not provide scalability on its own. It cannot scale to high traffic that exhausts CPU or GPU load. However, its infrastructure layout could be converted to take advantage of event streams and cluster configurations later with some refactoring.
- **Privacy**: The transcript is the only user data that leaves the host machine; it is sent to the external LLM for the summarize function. Otherwise, user data stays on the host machine. Recap keeps a copy of the user's audio file after FFmpeg conversion, along with the resulting transcription and summary.

### **Mapping of Building Blocks to Infrastructure**
TODO: Waiting on Building Block View

# Quality Requirements (Nick)

## Quality Requirements Overview

## Quality Scenarios

# Risks and Technical Debts (Dennis)

# Glossary (Dennis)

| Term | Definition |
|------|------------|
| Whisper | |
| Faster Whisper | |
| Open AI | |
| Python | |
| UV Packet Manager | |
| Git Hub | |
| Vite | |
| Tailwind | |
| Axios | |
| React-router-dom | |
| Fast API | |
