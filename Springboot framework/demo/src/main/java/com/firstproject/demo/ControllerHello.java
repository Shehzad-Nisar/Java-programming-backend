package com.firstproject.demo;

import org.apache.coyote.Request;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ControllerHello {

    @RequestMapping(value = "/student/{id}" , method = RequestMethod.GET)
    public Student getStudent(@PathVariable int id){
        return new Student("Ziaraf Hussain", id);
    }
}


