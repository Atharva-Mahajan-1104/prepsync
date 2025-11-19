// api/_shared.js
import natural from "natural";

// -------------------- STATIC QUESTION BANK --------------------
export const questions = {
  "Core Software Engineer": [
    { question: "What is the difference between stack and heap memory?", difficulty: "Easy", requiredKeywords: ["Stack", "Heap", "Static", "Dynamic", "Memory"] },
    { question: "Explain what a loop is and its basic types.", difficulty: "Easy", requiredKeywords: ["For", "While", "Iteration", "Condition", "Break"] },
    { question: "Describe common data structures and their use cases.", difficulty: "Easy", requiredKeywords: ["Array", "LinkedList", "Queue", "Stack", "Tree"] },
    { question: "What is Object-Oriented Programming and its main principles?", difficulty: "Medium", requiredKeywords: ["Inheritance", "Encapsulation", "Polymorphism", "Classes", "Objects"] },
    { question: "Explain the concept of memory management in programming languages.", difficulty: "Medium", requiredKeywords: ["Stack", "Heap", "Garbage Collection", "Memory Leak", "Allocation"] },
    { question: "What are design patterns and why are they important?", difficulty: "Medium", requiredKeywords: ["Singleton", "Factory", "Observer", "Reusability", "Architecture"] },
    { question: "How would you design a distributed caching system?", difficulty: "Hard", requiredKeywords: ["Consistency", "Partitioning", "Replication", "Latency", "Scalability"] },
    { question: "Explain advanced concurrency patterns and their trade-offs.", difficulty: "Hard", requiredKeywords: ["Mutex", "Deadlock", "Threading", "Synchronization", "Race Condition"] }
  ],
  "Frontend Developer": [
    { question: "What is HTML semantic markup and why is it important?", difficulty: "Easy", requiredKeywords: ["Accessibility", "SEO", "Header", "Nav", "Semantic"] },
    { question: "Explain CSS box model and basic layout concepts.", difficulty: "Easy", requiredKeywords: ["Margin", "Padding", "Border", "Content", "Box-sizing"] },
    { question: "Explain the Virtual DOM and its benefits.", difficulty: "Easy", requiredKeywords: ["Performance", "Reconciliation", "React", "Rendering", "DOM"] },
    { question: "What are CSS preprocessors and their advantages?", difficulty: "Medium", requiredKeywords: ["SASS", "Variables", "Nesting", "Mixins", "Compilation"] },
    { question: "Describe the concept of state management in frontend applications.", difficulty: "Medium", requiredKeywords: ["Redux", "Store", "Actions", "State", "Immutability"] },
    { question: "Explain modern JavaScript module systems and bundling.", difficulty: "Medium", requiredKeywords: ["ESModules", "Webpack", "Import", "Export", "Tree-shaking"] },
    { question: "Design a scalable frontend architecture for a large enterprise app.", difficulty: "Hard", requiredKeywords: ["Microfrontends", "Performance", "Caching", "Authentication", "Modular"] },
    { question: "Implement advanced React patterns and optimizations.", difficulty: "Hard", requiredKeywords: ["HOC", "Hooks", "Memoization", "Suspense", "Code-splitting"] }
  ],
  "Backend Developer": [
    { question: "What is CRUD and how is it used in APIs?", difficulty: "Easy", requiredKeywords: ["Create", "Read", "Update", "Delete", "API"] },
    { question: "Explain basic HTTP methods and status codes.", difficulty: "Easy", requiredKeywords: ["GET", "POST", "PUT", "DELETE", "Status"] },
    { question: "Describe RESTful API design principles.", difficulty: "Easy", requiredKeywords: ["Stateless", "Resources", "HTTP", "Endpoints", "Methods"] },
    { question: "What are the basics of database indexing?", difficulty: "Medium", requiredKeywords: ["Index", "Query", "Performance", "Primary Key", "Search"] },
    { question: "Explain the differences between SQL and NoSQL databases.", difficulty: "Medium", requiredKeywords: ["Scalability", "Schema", "ACID", "Document", "Relational"] },
    { question: "Describe microservices architecture patterns.", difficulty: "Medium", requiredKeywords: ["Services", "Communication", "Gateway", "Docker", "Deployment"] },
    { question: "Design a high-throughput message processing system.", difficulty: "Hard", requiredKeywords: ["Kafka", "Queue", "Scaling", "Partitioning", "Consistency"] },
    { question: "Implement advanced database sharding strategies.", difficulty: "Hard", requiredKeywords: ["Sharding", "Replication", "Consistency", "Distribution", "Failover"] }
  ],
  "AI/ML Engineer": [
    { question: "What is the difference between AI, ML, and Deep Learning?", difficulty: "Easy", requiredKeywords: ["Artificial", "Machine", "Neural", "Data", "Learning"] },
    { question: "Explain basic data preprocessing steps.", difficulty: "Easy", requiredKeywords: ["Cleaning", "Normalization", "Features", "Missing", "Scaling"] },
    { question: "Explain the difference between supervised and unsupervised learning.", difficulty: "Easy", requiredKeywords: ["Labels", "Clustering", "Classification", "Training", "Dataset"] },
    { question: "What are common evaluation metrics in ML?", difficulty: "Medium", requiredKeywords: ["Accuracy", "Precision", "Recall", "F1-Score", "ROC"] },
    { question: "Describe how neural networks work.", difficulty: "Medium", requiredKeywords: ["Neurons", "Layers", "Weights", "Backpropagation", "Activation"] },
    { question: "Explain different types of CNN architectures.", difficulty: "Medium", requiredKeywords: ["Convolution", "Pooling", "ResNet", "VGG", "Features"] },
    { question: "Design an end-to-end ML pipeline for production.", difficulty: "Hard", requiredKeywords: ["Pipeline", "Monitoring", "Deployment", "Version", "Scale"] },
    { question: "Implement advanced NLP transformer architectures.", difficulty: "Hard", requiredKeywords: ["Attention", "BERT", "Embedding", "Transfer", "Fine-tuning"] }
  ],
  "Cloud Engineer": [
    { question: "What are the basic cloud service models?", difficulty: "Easy", requiredKeywords: ["IaaS", "PaaS", "SaaS", "Cloud", "Service"] },
    { question: "Explain basic cloud storage types.", difficulty: "Easy", requiredKeywords: ["Block", "Object", "File", "Storage", "Persistence"] },
    { question: "Explain the concept of containerization and its benefits.", difficulty: "Easy", requiredKeywords: ["Docker", "Isolation", "Microservices", "Portability", "Orchestration"] },
    { question: "What is Infrastructure as Code?", difficulty: "Medium", requiredKeywords: ["Terraform", "Automation", "Configuration", "Version", "Deploy"] },
    { question: "Describe the principles of cloud-native architecture.", difficulty: "Medium", requiredKeywords: ["Scalability", "Containers", "Microservices", "DevOps", "Automation"] },
    { question: "Explain cloud security best practices.", difficulty: "Medium", requiredKeywords: ["IAM", "Encryption", "Security Groups", "Compliance", "Monitoring"] },
    { question: "Design a multi-region disaster recovery solution.", difficulty: "Hard", requiredKeywords: ["Failover", "Replication", "RTO", "RPO", "Backup"] },
    { question: "Implement advanced Kubernetes operators and CRDs.", difficulty: "Hard", requiredKeywords: ["Kubernetes", "Operator", "Custom", "Controller", "Resources"] }
  ]
};

export function allowedDifficultiesForLevel(level) {
  const l = (level || "").toLowerCase();
  switch (l) {
    case "intern": return ["easy"];
    case "junior": return ["easy", "medium"];
    case "mid":    return ["medium"];
    case "senior": return ["medium", "hard"];
    default:       return null;
  }
}

// ---- evaluation, same logic you wrote in index.js but exportable
export function evaluateAnswer(answer, question, context = {}) {
  const { role = "General", company = "Generic", experienceLevel = "Mid" } = context;

  const tokenizer = new natural.WordTokenizer();
  const stemmer = natural.PorterStemmer;
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();

  const answerTokens = tokenizer.tokenize((answer || "").toLowerCase());
  const requiredKeywords = (question.requiredKeywords || []).map(k => k.toLowerCase());

  const wordCount = answerTokens.length || 1;
  const uniqueWords = new Set(answerTokens).size;
  const sentences = (answer || "").split(/[.!?]+/).filter(Boolean);
  const sentenceCount = sentences.length;
  const averageWordLength = (answer || "").length / wordCount;

  const matchedKeywords = requiredKeywords.filter(keyword => {
    const keywordStem = stemmer.stem(keyword);
    return answerTokens.some(token => {
      const tokenStem = stemmer.stem(token);
      const distance = natural.LevenshteinDistance(tokenStem, keywordStem);
      return tokenStem.includes(keywordStem) || distance <= 2;
    });
  });

  const missingKeywords = requiredKeywords.filter(k => !matchedKeywords.includes(k));
  const keywordMatchRatio = requiredKeywords.length
    ? matchedKeywords.length / requiredKeywords.length
    : 0;

  tfidf.addDocument(answer || "");
  let semanticScore = 0;
  requiredKeywords.forEach(k => {
    tfidf.tfidfs(k, (_i, measure) => { semanticScore += measure; });
  });
  semanticScore = Math.min(requiredKeywords.length ? (semanticScore / requiredKeywords.length) : 0, 1.0);

  const roleLower = (role || "").toLowerCase();
  const roleWeight =
    roleLower.includes("frontend") ? 1.1 :
    roleLower.includes("backend")  ? 1.15 :
    roleLower.includes("ml")       ? 1.25 : 1.0;

  const expLower = (experienceLevel || "").toLowerCase();
  const expWeight =
    expLower === "intern" ? 0.8 :
    expLower === "junior" ? 0.9 :
    expLower === "mid"    ? 1.0 :
    expLower === "senior" ? 1.2 : 1.0;

  const depthScore = Math.min((sentenceCount / 5) * expWeight, 1.2);
  const clarityScore = Math.min(uniqueWords / wordCount, 1.0);

  const matchPercentage = Math.min(
    100 *
      (0.45 * keywordMatchRatio +
       0.25 * semanticScore +
       0.15 * clarityScore +
       0.15 * depthScore) *
      roleWeight,
    100
  );

  const classification =
    matchPercentage >= 85 ? "Outstanding" :
    matchPercentage >= 70 ? "Strong" :
    matchPercentage >= 55 ? "Moderate" : "Needs Improvement";

  let feedback = `Analysis for a ${experienceLevel}-level ${role} at ${company}:\n\n`;
  feedback += `Your answer demonstrates a ${classification.toLowerCase()} understanding.\n`;
  feedback += `It covered ~${Math.round(matchPercentage)}% of expected concepts.\n`;
  if (matchedKeywords.length) feedback += `✅ Covered: ${matchedKeywords.join(", ")}.\n`;
  if (missingKeywords.length) feedback += `⚠️ Missing: ${missingKeywords.join(", ")}.\n`;
  if (depthScore < 0.6) feedback += `💡 Add examples or deeper steps for more depth.\n`;
  if (clarityScore < 0.3) feedback += `🧩 Use more varied vocabulary for clarity.\n`;
  if (semanticScore < 0.4) feedback += `🧠 Add more role-specific technical terms.\n`;
  if (sentenceCount < 3) feedback += `📖 Structure as problem → approach → result.\n`;
  else if (sentenceCount > 12) feedback += `✂️ Trim to keep it sharp and focused.\n`;

  return {
    classification,
    matchedKeywords,
    missingKeywords,
    matchPercentage,
    feedback,
    detailedAnalysis: {
      wordCount,
      uniqueWords,
      sentenceCount,
      averageWordLength,
      keywordDensity: Number(((matchedKeywords.length / wordCount) * 100).toFixed(2)),
      semanticScore: Number(semanticScore.toFixed(2)),
      clarityScore: Number(clarityScore.toFixed(2)),
      depthScore: Number(depthScore.toFixed(2)),
    },
  };
}

// simple JSON sanitizer for Gemini output
export function sanitizeJsonLike(txt = "") {
  let s = txt.replace(/```json|```/gi, "");
  s = s
    .replace(/\u201C|\u201D|\u201E|\u201F/g, '"')
    .replace(/\u2018|\u2019|\u2032/g, "'")
    .replace(/\u00A0/g, " ")
    .replace(/\u2026|\.{3}/g, "");
  const start = s.indexOf("[");
  const end = s.lastIndexOf("]");
  if (start !== -1 && end !== -1 && end > start) s = s.slice(start, end + 1);
  s = s.replace(/,(\s*[}\]])/g, "$1");
  return s.trim();
}

export const runtime = "nodejs18.x"; // optional hint to Vercel
