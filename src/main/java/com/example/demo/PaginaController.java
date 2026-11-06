package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaginaController {

    @GetMapping("/professores")
    public String paginaProfessores() {
        // O "forward:" diz para o Spring pegar a requisição e entregar o arquivo estático
        return "forward:/professores.html";
    }
    @GetMapping("/faculdades")
    public String paginaFaculdade() {
        // O "forward:" diz para o Spring pegar a requisição e entregar o arquivo estático
        return "forward:/faculdade.html";
    }
    
    @GetMapping("/disciplinas")
    public String paginaDisciplinas() {
        // O "forward:" diz para o Spring pegar a requisição e entregar o arquivo estático
        return "forward:/disciplinas.html";
    }
}