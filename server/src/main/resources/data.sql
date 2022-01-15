/*insert into authority (name) values ('ROLE_CLIENT');
insert into authority (name) values ('ROLE_COTTAGE_OWNER');
insert into authority (name) values ('ROLE_BOAT_OWNER');
insert into authority (name) values ('ROLE_INSTRUCTOR');
insert into authority (name) values ('ROLE_ADMIN');

update users set enabled = true where id=1;

    /////BOATS

insert into boats(name, address, behavior_rules, cancellation_price, capacity, fishing_equipment, max_speed, motor_power, description, number_of_motors, rating)
values( 'Ocean', 'Luka Beograd', 'Nije dozvoljeno skakanje', 1, 120,'Fishing rod', 15, 120, 'Brod idealan za odmor', 3, 8);

insert into boats(name, address, behavior_rules, cancellation_price, capacity, fishing_equipment, max_speed, motor_power, description, number_of_motors, rating)
values( 'Hristina', 'Luka Novi Sad', 'Nije dozvoljeno skakanje', 2, 1000,'Fishing rod', 20, 200, 'Brod za pecanje', 4, 10);

insert into boats(name, address, behavior_rules, cancellation_price, capacity, fishing_equipment, max_speed, motor_power, description, number_of_motors, rating)
values( 'AquaMarine', 'Luka Smederevo', 'Zabranjeno pusenje u unutrasnjosti broda', 2, 12,'No equipment', 10, 190, 'Brod za proslave', 2, 6);

insert into boats(name, address, behavior_rules, cancellation_price, capacity, fishing_equipment, max_speed, motor_power, description, number_of_motors, rating)
values( 'Dolphin', 'Luka Dunav', 'Nije dozvoljeno skakanje', 1, 100,'Fishing rod', 11, 180, 'Brod idealan za odmor', 3, 4);



  /////USERS

insert into users(dtype, address, city, country, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, picture, role, reason_for_registration, num_of_penalties, biography)
values( 'USER', 'Danicareva 15', 'Beograd', 'Srbija', 'hristisuknjaja@gmail.com', 1, 'Hristina', 'Suknjaja', '2017-01-13T17:09:42', '$2a$12$kN7QAYrF2CPNMkO50Mylz.lEL.s0I0XfuZK5aMeln/4NsOMzyO8x6', '0656004241',null, 2,'Wanna rent a boat', 0, 'Student');


  /////RESERVATIONS

insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-03-13T17:09:42', 1000, 1,'2022-01-13T17:09:42', null, 1, 1, null);

insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-05-01T17:09:42', 1000, 1,'2022-04-01T17:09:42', null, 2, 1, null);

insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-10-01T17:09:42', 1000, 1,'2022-11-01T17:09:42', null, 3, 1, null);

  */

