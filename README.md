

# 🚀 **PrepSync – AI Interview Coach**

PrepSync is an AI-powered interview coaching platform that helps students and job-seekers practice and improve their interview skills through **real-time AI feedback**, **voice-based mock interviews**, **adaptive question generation**, and a **smart performance analytics dashboard**.

Live Demo → **[https://ai-coach-d.vercel.app/](https://ai-coach-d.vercel.app/)**

---

## ⭐ **Why PrepSync?**

Most students struggle with interviews because they lack:

* Personalized feedback
* Real-time evaluation
* Voice practice
* Objective scoring
* Progress tracking

PrepSync acts as a **personal AI Interview Coach**, helping candidates understand:

**“What am I doing wrong? How do I fix it? Am I improving?”**

---

## 🧠 **Key Features**

### 🎤 **Voice-Based Mock Interviews**

* Speak answers naturally
* Real-time transcription (Web Speech API)
* Timed question mode
* Simulates real interview pressure

### 🤖 **AI Answer Evaluation**

* Hybrid AI engine using **Gemini API + Natural.js NLP**
* TF-IDF semantic scoring
* Keyword relevance analysis
* Structured feedback with improvement tips

### 🎯 **AI-Generated Interview Questions**

* Gemini-generated questions
* Adaptive difficulty
* Technical, HR, Behavioral, System Design categories
* Unlimited variations

### 📊 **Performance Analytics Dashboard**

* Trend graphs
* Category-wise metrics
* Strongest & weakest areas
* Full session history

---

# 🧰 **Tech Stack**

### **Frontend**

* React + TypeScript
* Vite
* Tailwind CSS (Dark Mode)
* Framer Motion
* Recharts
* Axios
* Web Speech API
* MediaRecorder API

### **Backend**

* Node.js (18+)
* Express.js
* Vercel Serverless Functions
* Helmet
* CORS
* Rate Limiting
* dotenv

### **AI / NLP**

* Google Gemini API
* Natural.js (tokenization, stemming, TF-IDF)
* Hybrid scoring engine

---

# 🏗️ **System Architecture (Summary)**

* **Frontend** (React + TS) handles UI, voice input, transcription, dashboards
* **Backend** (Node + Express on Vercel) provides API routes
* **NLP Engine** uses Natural.js for keyword extraction, TF-IDF scoring
* **AI Engine** uses Google Gemini for semantic feedback + question generation
* **Client** communicates with backend via Axios
* **Serverless deployment** ensures auto-scaling and low-latency

---

# 🔄 **Data Flow (End to End)**

1. User selects category or role
2. AI generates a question (Gemini)
3. User speaks → Web Speech API → converts speech → text
4. Text sent to backend
5. Natural.js processes keywords + TF-IDF
6. Gemini API analyzes semantic quality
7. Hybrid model generates scores + feedback
8. Frontend displays insights + charts
9. Data used for progress analytics

---

# 🔐 **Security Overview**

* CORS protection
* Helmet for secure HTTP headers
* Rate limiting on API routes
* `.env` for secrets (never stored in repo)
* Sanitized user inputs

---

# ⚙️ **Setup Instructions**

### **1. Clone the repo**

```bash
git clone https://github.com/<your-username>/prepsync-ai-interview-coach
cd prepsync-ai-interview-coach
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Environment variables**

Create `.env` from `.env.example`:

```
NODE_ENV=production
PORT=3001
HUGGINGFACE_API_KEY=your_key
VITE_API_BASE_URL=/api
CORS_ORIGIN=http://localhost:5173
```

### **4. Run the development server**

```bash
npm run dev
```

### **5. Deploy backend (Vercel)**

* Deploy `/api` folder as Vercel serverless functions
* Add environment variables in Vercel dashboard

### **6. Deploy frontend**

* Deploy using Vercel or Netlify
* Set environment variable: `VITE_API_BASE_URL=/api`

---

# 🔮 **Future Enhancements**

* Full backend migration to **Spring Boot** for high scalability
* Introduce **custom fine-tuned AI models** (train + host own LLM)
* Remove dependency on external LLM APIs
* Add multilingual interview support
* Resume analyzer + ATS scoring module
* Mock system design interviews with diagrams

---

# 👤 **Author**

**Atharva Mahajan**
MIT ADT University, Pune

---

# ⭐ **If you found this helpful, please star the repo!**

---


📁 The **perfect .gitignore**

Just tell me!
