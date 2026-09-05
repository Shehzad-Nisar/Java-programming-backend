package com.firstproject.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerHello {

    @GetMapping("/student/{id}")
    public Student getStudent(@PathVariable int id){
        return new Student("Ziaraf Hussain", id);
    }
}


