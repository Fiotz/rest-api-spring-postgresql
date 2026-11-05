package com.example.demo.repository;

import com.example.demo.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessorRepo extends JpaRepository<Professor, Long> {

}