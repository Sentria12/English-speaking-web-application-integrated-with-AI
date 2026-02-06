package com.aesp.backend.service;

import com.aesp.backend.entity.Learner;
import com.aesp.backend.repository.LearnerRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class PracticeService {

    private static final Logger logger = LoggerFactory.getLogger(PracticeService.class);
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private LearnerRepository learnerRepository;

    @Value("${gemini.api.key}")
    private String apiKey;

    public String analyzeAudio(MultipartFile audioFile, String topic, Integer userId) {
        if (audioFile == null || audioFile.isEmpty())
            return "{\"error\": \"File audio rỗng\"}";

        // Lấy trình độ để AI đưa ra gợi ý Adaptive
        Learner learner = learnerRepository.findById(userId).orElse(null);
        String level = (learner != null) ? learner.getEnglishLevel().toString() : "BEGINNER";

        try {
            byte[] audioBytes = audioFile.getBytes();
            String base64Audio = Base64.getEncoder().encodeToString(audioBytes);
            String mimeType = audioFile.getContentType() != null ? audioFile.getContentType() : "audio/wav";

            // Prompt tối ưu trả về JSON
            String prompt = String.format(
                    "Analyze this English speaking audio for a %s learner on topic '%s'. " +
                            "Return ONLY a JSON object with this structure: " +
                            "{\"score\": number, \"feedback\": \"string\", \"suggestion\": \"string\"}. " +
                            "If level is BEGINNER, provide a full example sentence in 'suggestion'. " +
                            "If level is ADVANCED, provide 3-4 advanced keywords in 'suggestion'.",
                    level, topic);

            Map<String, Object> textPart = Map.of("text", prompt);
            Map<String, Object> inlineData = Map.of("mimeType", mimeType, "data", base64Audio);
            Map<String, Object> audioPart = Map.of("inlineData", inlineData);
            Map<String, Object> content = Map.of("parts", List.of(textPart, audioPart));
            Map<String, Object> requestBody = Map.of("contents", List.of(content));

            String url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key="
                    + apiKey;

            ResponseEntity<String> response = restTemplate.postForEntity(url, new HttpEntity<>(requestBody),
                    String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            String rawJson = root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

            // Làm sạch chuỗi JSON nếu Gemini bọc trong ```json ... ```
            return rawJson.replaceAll("```json", "").replaceAll("```", "").trim();

        } catch (Exception e) {
            logger.error("AI Error", e);
            return "{\"error\": \"Lỗi phân tích AI\"}";
        }
    }

    public String startConversation(String topic, String userMessage) {
        String url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key="
                + apiKey;
        String prompt = String.format(
                "Mentor English conversation. Topic: %s. Student: %s. Respond briefly and encourage.", topic,
                userMessage);

        try {
            Map<String, Object> requestBody = Map.of("contents",
                    List.of(Map.of("parts", List.of(Map.of("text", prompt)))));
            ResponseEntity<String> response = restTemplate.postForEntity(url, new HttpEntity<>(requestBody),
                    String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            return root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
