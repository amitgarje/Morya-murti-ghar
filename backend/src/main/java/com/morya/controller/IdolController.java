package com.morya.controller;

import com.morya.entity.Idol;
import com.morya.repository.IdolRepository;
import com.morya.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/idols")
public class IdolController {

    @Autowired
    private IdolRepository idolRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<List<Idol>> getAllIdols() {
        return ResponseEntity.ok(idolRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<?> createIdol(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("heightCm") Integer heightCm,
            @RequestParam("material") String material,
            @RequestParam("description") String description,
            @RequestParam("status") String status,
            @RequestParam("image") MultipartFile imageFile) {

        try {
            String imageUrl = cloudinaryService.uploadImage(imageFile);

            Idol idol = new Idol();
            idol.setId("i" + UUID.randomUUID().toString().substring(0, 8));
            idol.setName(name);
            idol.setCategory(category);
            idol.setHeightCm(heightCm);
            idol.setMaterial(material);
            idol.setDescription(description);
            idol.setStatus(status);
            idol.setImageUrl(imageUrl);
            idol.setCreatedAt(LocalDate.now());

            Idol savedIdol = idolRepository.save(idol);
            return new ResponseEntity<>(savedIdol, HttpStatus.CREATED);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating idol: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateIdol(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam("heightCm") Integer heightCm,
            @RequestParam("material") String material,
            @RequestParam("description") String description,
            @RequestParam("status") String status,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        Optional<Idol> optionalIdol = idolRepository.findById(id);
        if (optionalIdol.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Idol not found");
        }

        Idol idol = optionalIdol.get();
        idol.setName(name);
        idol.setCategory(category);
        idol.setHeightCm(heightCm);
        idol.setMaterial(material);
        idol.setDescription(description);
        idol.setStatus(status);

        try {
            if (imageFile != null && !imageFile.isEmpty()) {
                // Delete old image
                if (idol.getImageUrl() != null) {
                    cloudinaryService.deleteImageByUrl(idol.getImageUrl());
                }
                // Upload new image
                String newImageUrl = cloudinaryService.uploadImage(imageFile);
                idol.setImageUrl(newImageUrl);
            }

            Idol updatedIdol = idolRepository.save(idol);
            return ResponseEntity.ok(updatedIdol);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating idol: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIdol(@PathVariable String id) {
        Optional<Idol> optionalIdol = idolRepository.findById(id);
        if (optionalIdol.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Idol not found");
        }

        Idol idol = optionalIdol.get();
        try {
            if (idol.getImageUrl() != null) {
                cloudinaryService.deleteImageByUrl(idol.getImageUrl());
            }
            idolRepository.delete(idol);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting idol: " + e.getMessage());
        }
    }
}
