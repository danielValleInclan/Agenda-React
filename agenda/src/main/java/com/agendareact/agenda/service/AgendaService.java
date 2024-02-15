package com.agendareact.agenda.service;

import com.agendareact.agenda.model.PersonVO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface AgendaService {
    List<PersonVO> getAllPersons();
    Optional<PersonVO> getPersonById(String id);
    PersonVO save(PersonVO personVO);
    PersonVO update(PersonVO personVO, String id);
    List<PersonVO> findByNameContaining(String name);
    ResponseEntity deletePerson(String id);
    ResponseEntity deleteAllPersons();
}
