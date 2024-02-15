package com.agendareact.agenda.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document
public class PersonVO {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String street;
    private Integer postalCode;
    private String city;
    private LocalDate birthday;
}
