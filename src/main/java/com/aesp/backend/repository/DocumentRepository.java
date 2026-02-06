package com.aesp.backend.repository;

import com.aesp.backend.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
}