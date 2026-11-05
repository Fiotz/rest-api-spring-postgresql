package com.example.demo;

import java.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.*;

import com.example.demo.model.Professor;
import com.example.demo.repository.ProfessorRepo;

@RestController
class ProfessorController {

	@Autowired
	private ProfessorRepo professorRepo;

	public ProfessorController() {

	}

	@GetMapping("/api/professores")
	Iterable<Professor> getProfessores(@RequestParam Optional<Long> faculdadeId) {
		if (faculdadeId.isEmpty()) {
			return professorRepo.findAll();
		}
        return professorRepo.findAll();	
		// return professorRepo.findByFaculdadeId(faculdadeId.get());
	}
	
	@GetMapping("/api/professores/{id}")
	Optional<Professor> getProfessor(@PathVariable long id) {
		return professorRepo.findById(id);
	}
	
	@PostMapping("/api/professores")
	Professor createProfessor(@RequestBody Professor p) {
		Professor createdProf = professorRepo.save(p);
		return createdProf;
	}
	
	@PutMapping("/api/professores/{professorId}")
	Optional<Professor> updateProfessor(@RequestBody Professor professorRequest, @PathVariable long professorId) {
		Optional<Professor> opt = professorRepo.findById(professorId);
		if (opt.isPresent()) {
			if (professorRequest.getId() == professorId) {
				professorRepo.save(professorRequest);
				return opt;
			}
		}
		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Erro ao alterar dados do professor com id " + professorId);	
	}	
	
	@DeleteMapping(value = "/api/professores/{id}")
	void deleteProfessor(@PathVariable long id) {
		professorRepo.deleteById(id);
	}		
}


