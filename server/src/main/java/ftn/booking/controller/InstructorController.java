package ftn.booking.controller;


import ftn.booking.model.Boat;
import ftn.booking.model.Instructor;
import ftn.booking.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping( value = "/instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;


    @GetMapping(value = "/{findAll}", produces = "application/json")
    public @ResponseBody
    List<Instructor> findAll() {
        return instructorService.findAll();
    }

}
