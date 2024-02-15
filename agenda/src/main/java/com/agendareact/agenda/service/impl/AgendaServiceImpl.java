package com.agendareact.agenda.service.impl;

import com.agendareact.agenda.model.PersonVO;
import com.agendareact.agenda.repository.AgendaRepository;
import com.agendareact.agenda.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public class AgendaServiceImpl implements AgendaService {

    @Autowired
    private AgendaRepository agendaRepository;
    @Override
    public List<PersonVO> getAllPersons() {
        return agendaRepository.findAll();
    }

    @Override
    public Optional<PersonVO> getPersonById(String id) {
        return agendaRepository.findById(id);
    }

    @Override
    public PersonVO save(PersonVO personVO) {
        return agendaRepository.save(personVO);
    }

    @Override
    public PersonVO update(PersonVO personVO, String id) {
        agendaRepository.deleteById(id);
        return agendaRepository.save(personVO);
    }

    @Override
    public List<PersonVO> findByFirstNameContaining(String name) {
        return agendaRepository.findByFirstNameContaining(name);
    }

    @Override
    public ResponseEntity deletePerson(String id) {
        try {
            agendaRepository.deleteById(id);
            return ResponseEntity.ok("Person has been deleted!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting person: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity deleteAllPersons() {
        try {
            agendaRepository.deleteAll();
            return ResponseEntity.ok("All persons have been deleted!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting all persons: " + e.getMessage());
        }
    }
}
