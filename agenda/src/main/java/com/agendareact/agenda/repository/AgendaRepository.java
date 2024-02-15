package com.agendareact.agenda.repository;

import com.agendareact.agenda.model.PersonVO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AgendaRepository extends MongoRepository<PersonVO, String> {
    List<PersonVO> findByFirstNameContaining(String firstName);


}
