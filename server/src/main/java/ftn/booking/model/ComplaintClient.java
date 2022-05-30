package ftn.booking.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "complaint_client")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ComplaintClient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Client client;

    @ManyToOne
    private Instructor instructor;


    private String complaint_comment;

    private String response_admin;


}