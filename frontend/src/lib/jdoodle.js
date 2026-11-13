import axiosInstance from "../lib/axios.js";

export async function executeCode(language, code) {
  try {
    const response = await axiosInstance.post("/execute", {
      language,
      code,
    });

    const data = response.data;

    return {
      success: data.success,
      output: data.output || "No output",
      error: data.error,
      memory: data.memory,
      cpuTime: data.cpuTime,
    };

  } catch (error) {
    console.error(
      "JDoodle execution error:",
      error.response?.data || error.message
    );

    return {
      success: false,
      error:
        error.response?.data?.error ||
        error.message ||
        "Code execution failed",
    };
  }
}
