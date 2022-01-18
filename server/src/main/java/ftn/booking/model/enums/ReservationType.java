package ftn.booking.model.enums;

public enum ReservationType {
    COTTAGE("cottage"),
    BOAT("boat"),
    ADVENTURE("adventure");


    private String value;

    ReservationType(String value){
        this.value=value;
    }

    String getValue()
    {
        return this.value;
    }
}
