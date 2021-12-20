package ftn.booking.Models;

import javax.persistence.*;

@Entity
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long averageRate;

    private Long revenue;

    ///onaj ko pise izvestaj
    @OneToOne
    private User user;

    @OneToOne
    private Boat boat;

    @OneToOne
    private Cottage cottage;

    @OneToOne
    private Client client;

    public Report() {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boat getBoat() {
        return boat;
    }

    public void setBoat(Boat boat) {
        this.boat = boat;
    }

    public Cottage getCottage() {
        return cottage;
    }

    public void setCottage(Cottage cottage) {
        this.cottage = cottage;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
