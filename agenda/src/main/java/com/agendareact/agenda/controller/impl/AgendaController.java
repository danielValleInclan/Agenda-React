package com.agendareact.agenda.controller.impl;

import com.agendareact.agenda.controller.AgendaAPI;
import com.agendareact.agenda.model.PersonVO;
import com.agendareact.agenda.repository.AgendaRepository;
import com.agendareact.agenda.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping("/api/v1/")
@RestController

public class AgendaController implements AgendaAPI {

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private AgendaService agendaService;

    @Override
    @GetMapping("/agenda")
    public List<PersonVO> getAllPersons() {
        return agendaService.getAllPersons();
    }

    @Override
    @GetMapping("/agenda/{id}")
    public Optional<PersonVO> getPersonById(@PathVariable String id) {
        return agendaService.getPersonById(id);
    }

    @Override
    @PostMapping("/agenda")
    public PersonVO save(@RequestBody PersonVO personVO) {
        return agendaService.save(personVO);
    }

    @Override
    @PutMapping("/agenda/{id}")
    public PersonVO update(@RequestBody PersonVO personVO,@PathVariable String id) {
        return agendaService.update(personVO, id);
    }

    @Override
    @GetMapping("/agenda/name/{name}")
    public List<PersonVO> findByNameContaining(@PathVariable String name) {
        return agendaService.findByNameContaining(name);
    }

    @Override
    @DeleteMapping("/agenda/{id}")
    public ResponseEntity deletePerson(@PathVariable String id) {
        return agendaService.deletePerson(id);
    }

    @Override
    @DeleteMapping("/agenda/delete-all")
    public ResponseEntity deleteAllPersons() {
        return agendaService.deleteAllPersons();
    }
}
