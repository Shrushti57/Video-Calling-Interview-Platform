import { ENV } from "../lib/env.js";

const LANGUAGE_CONFIG = {
  javascript: {
    language: "nodejs",
    versionIndex: "7",
  },
  python: {
    language: "python3",
    versionIndex: "6",
  },
  java: {
    language: "java",
    versionIndex: "6",
  },
};

export const executeCode = async (req, res) => {
  try {
    const { language, code, input = "" } = req.body;

    if (!language || typeof code !== "string") {
      return res.status(400).json({
        success: false,
        error: "Language and code are required",
      });
    }

    const config = LANGUAGE_CONFIG[language];

    if (!config) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`,
      });
    }

    const response = await fetch(
      "https://api.jdoodle.com/v1/execute",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: ENV.JDOODLE_CLIENT_ID,
          clientSecret: ENV.JDOODLE_CLIENT_SECRET,
          script: code,
          stdin: input,
          language: config.language,
          versionIndex: config.versionIndex,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.error || "JDoodle API request failed",
      });
    }

    return res.status(200).json({
      success: true,
      output: data.output || data.error || "No output",
      memory: data.memory,
      cpuTime: data.cpuTime,
      statusCode: data.statusCode,
    });

  } catch (error) {
    console.error("JDoodle Error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to execute code",
    });
  }
};
