package ftn.booking.Models;

import javax.persistence.*;

@Entity
public class BoatReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long averageRate;

    private Long revenue;

    @OneToOne
    @JoinColumn(name = "boat_id", nullable = false)
    private Boat boat;

    public BoatReport() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAverageRate() {
        return averageRate;
    }

    public void setAverageRate(Long averageRate) {
        this.averageRate = averageRate;
    }

    public Long getRevenue() {
        return revenue;
    }

    public void setRevenue(Long revenue) {
        this.revenue = revenue;
    }

    ///graph;
}
