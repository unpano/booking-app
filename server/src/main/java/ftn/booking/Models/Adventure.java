package ftn.booking.Models;
import javax.persistence.*;
import java.util.List;

@Entity
public class Adventure {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer maxNumOfPersons;

    private Integer roomNum;

    private Long price;

    private String rules;

    private Integer rate;

    ///images

    public Adventure() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getMaxNumOfPersons() {
        return maxNumOfPersons;
    }

    public void setMaxNumOfPersons(Integer maxNumOfPersons) {
        this.maxNumOfPersons = maxNumOfPersons;
    }

    public Integer getRoomNum() {
        return roomNum;
    }

    public void setRoomNum(Integer roomNum) {
        this.roomNum = roomNum;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }
}
