package ftn.booking.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "mark_revision_client")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class MarkRevisionClient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Client client;

    @ManyToOne
    private Instructor instructor;

    private Double mark;

    private String revision_comment;

    private Boolean approvedByAdmin;
}
