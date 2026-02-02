package com.aesp.backend.controller;

import com.aesp.backend.entity.LearningPackage;
import com.aesp.backend.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
// Cho phép Frontend truy cập và gửi kèm Header Authorization (Token)
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", allowCredentials = "true")
public class PackageController {

    @Autowired
    private PackageService packageService;

    @GetMapping
    public ResponseEntity<List<LearningPackage>> getAllPackages() {
        List<LearningPackage> packages = packageService.getAllPackages();
        // Trả về danh sách (kể cả rỗng) để Frontend nhận được mảng [] thay vì lỗi 204
        return ResponseEntity.ok(packages);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningPackage> getPackageById(@PathVariable Integer id) {
        LearningPackage pkg = packageService.getPackageById(id);
        if (pkg == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pkg);
    }
}