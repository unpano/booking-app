insert into authority (name) values ('ROLE_CLIENT');
insert into authority (name) values ('ROLE_COTTAGE_OWNER');
insert into authority (name) values ('ROLE_BOAT_OWNER');
insert into authority (name) values ('ROLE_INSTRUCTOR');
insert into authority (name) values ('ROLE_ADMIN');




insert into users(dtype, active, address, city, country, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, role, reason_for_registration, loyalty_program, num_of_penalties, biography)
values('Client', false, 'Starine Novaka 1' , 'Belgrade', 'Serbia', 'hristina@gmail.com', true, 'Hristina', 'Suknjaja', '2022-03-13T17:09:42', '$2a$12$WVN1sSdIl3AkRQ.ac1PB8uktJ5uj1DAaYVWLbx4QqDIrPDS61FqKm', '0656003121', 'ROLE_CLIENT', 'Wanna rent a boat', 1, 2, 'Student');

insert into users(dtype, active, address, city, country, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, role, reason_for_registration, loyalty_program, num_of_penalties, biography)
values('BoatOwner', false, 'Starine Novaka 1' , 'Belgrade', 'Serbia', 'jovana@gmail.com', true, 'Jovana', 'Babic', '2022-03-13T17:09:42', '$2a$12$WVN1sSdIl3AkRQ.ac1PB8uktJ5uj1DAaYVWLbx4QqDIrPDS61FqKm', '0656003121', 'ROLE_BOAT_OWNER', 'Wanna rent a boat', 1, 2, 'Student');

insert into users(dtype, active, address, city, country, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, role, reason_for_registration, loyalty_program, num_of_penalties, biography)
values('Client', false, 'Starine Novaka 1' , 'Belgrade', 'Serbia', 'stefan@gmail.com', true, 'Stefan', 'Stefanovic', '2022-03-13T17:09:42', '$2a$12$WVN1sSdIl3AkRQ.ac1PB8uktJ5uj1DAaYVWLbx4QqDIrPDS61FqKm', '0656003121', 'ROLE_CLIENT', 'Wanna rent a boat', 1, 2, 'Student');

insert into users(dtype, active, address, city, country, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, role, reason_for_registration, loyalty_program, num_of_penalties, biography)
values('CottageOwner', false, 'Starine Novaka 1' , 'Belgrade', 'Serbia', 'julija@gmail.com', true, 'Julija', 'Stefanovic', '2022-03-13T17:09:42', '$2a$12$WVN1sSdIl3AkRQ.ac1PB8uktJ5uj1DAaYVWLbx4QqDIrPDS61FqKm', '0656003121', 'ROLE_COTTAGE_OWNER', 'Wanna rent a boat', 1, 2, 'Student');

insert into users(dtype, active, address, city, country, email, enabled, first_name, last_name, last_password_reset_date, password, phone_number, role, reason_for_registration, loyalty_program, num_of_penalties, biography)
values('Instructor', false, 'Starine Novaka 1' , 'Belgrade', 'Serbia', 'marija@gmail.com', true, 'Marija', 'Stefanovic', '2022-03-13T17:09:42', '$2a$12$WVN1sSdIl3AkRQ.ac1PB8uktJ5uj1DAaYVWLbx4QqDIrPDS61FqKm', '0656003121', 'ROLE_INSTRUCTOR', 'Wanna rent a boat', 1, 2, 'Student');




insert into additional_services(info, name, price)
values('Dinner starts at 20pm', 'DINNER', '1400');

insert into additional_services(info, name, price)
values('Sailing starts at 20pm', 'SAILING', '1400');


insert into additional_services(info, name, price)
values('Short adventure', 'ADVENTURE +', '1400');

insert into additional_services(info, name, price)
values('Your friends may join you', '2+ PERSONS', '1400');


insert into boat_service(boat_id, service_id)
values(1,1);

insert into boat_service(boat_id, service_id)
values(1,2)

insert into boat_service(boat_id, service_id)
values(1,3);

insert into boat_service(boat_id, service_id)
values(2,2)

insert into boat_service(boat_id, service_id)
values(2,3)

insert into boat_service(boat_id, service_id)
values(2,4)

insert into boat_service(boat_id, service_id)
values(3,1)

insert into boat_service(boat_id, service_id)
values(3,3)

insert into boat_service(boat_id, service_id)
values(4,4)


insert into cottage_additional_services(cottage_id, additional_services)
values(1, 1 )
insert into cottage_additional_services(cottage_id, additional_services)
values(2, 1 )
insert into cottage_additional_services(cottage_id, additional_services)
values(2, 2 )

insert into cottage_additional_services(cottage_id, additional_services)
values(3, 1 )
insert into cottage_additional_services(cottage_id, additional_services)
values(3, 2 )








insert into user_authority (user_id, authority_id)
values (1, 1);

insert into user_authority (user_id, authority_id)
values (2, 3);

insert into user_authority (user_id, authority_id)
values (3, 1);

insert into user_authority (user_id, authority_id)
values (4, 2);

insert into user_authority (user_id, authority_id)
values (5, 5);



insert into boats(name, address, behavior_rules, cancellation_price, capacity, fishing_equipment, max_speed, motor_power, description, number_of_motors, rate, length, price, type, navigation_equipment)
values( 'Ocean', 'California Harbor', 'Jumping is not allowed', 1, 120,'Fishing rod', 15, 120, 'The boat is the right place to rest', 3, 8, 10, 1000, 'FERRY', 'GPS');

insert into boats(name, address, behavior_rules, cancellation_price, capacity, fishing_equipment, max_speed, motor_power, description, number_of_motors, rate, length, price, type, navigation_equipment)
values( 'Hristina', 'Los Angeles Harbor', 'Jumping is not allowed', 0, 1000,'Fishing rod', 20, 200, 'The boat is the right place to rest', 4, 10, 20, 1300, 'FERRY','GPS' );

insert into boats(name, address, behavior_rules, cancellation_price, capacity, fishing_equipment, max_speed, motor_power, description, number_of_motors, rate, length, price, type, navigation_equipment)
values( 'AquaMarine', 'Cape Town', 'Smoking is not allowed inside', 0, 12,'No equipment', 10, 190, 'The boat is the right place to rest', 2, 6, 50, 1300, 'CATAMARAN','GPS' );

insert into boats(name, address, behavior_rules, cancellation_price, capacity, fishing_equipment, max_speed, motor_power, description, number_of_motors, rate, length, price, type, navigation_equipment)
values( 'Dolphin', 'Vancouver', 'Smoking is not allowed inside', 1, 100,'Fishing rod', 11, 180, 'Boat for fishing', 3, 4, 30, 1300, 'YACHT','GPS');



insert into cottages(name, address, city, description, max_num_of_persons, one_day_price, rate)
values( 'Vila Maria', 'Dedinje', 'Beograd', '2 bedrooms, best for couples', 4, 1000, 9  );

insert into cottages(name, address, city, description, max_num_of_persons, one_day_price, rate)
values( 'Hristina', 'California', 'Beograd', '2 bedrooms, best for couples', 4, 1000, 9  );

insert into cottages(name, address, city, description, max_num_of_persons, one_day_price, rate)
values( 'Luna', 'London', 'London', '2 bedrooms, best for couples', 4, 1000, 7 );

insert into cottages(name, address, city, description, max_num_of_persons, one_day_price, rate)
values( 'Eiffel', 'Pariz 14', 'Pariz', '1 big room, best for couples', 4, 1000, 9  );




insert into adventures(description, max_num_of_persons, name, price, rate, rules)
values('you will have amazing time', 15, 'Walking in nature', 1000, 10, 'No negative energy');

insert into adventures(description, max_num_of_persons, name, price, rate, rules)
values('you will have amazing time', 15, 'Fishing all day', 1000, 10, 'No negative energy');
insert into adventures(description, max_num_of_persons, name, price, rate, rules)
values('you will have amazing time', 15, 'Fishing training', 1000, 10, 'No negative energy');
insert into adventures(description, max_num_of_persons, name, price, rate, rules)
values('you will have amazing time', 15, 'Sailing', 1000, 10, 'No negative energy');



insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-03-13T17:09:42', 1000, 'BOAT','2022-01-13T17:09:42', null, 1, 1, null);

insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-05-01T17:09:42', 1000, 'BOAT','2022-04-01T17:09:42', null, 2, 1, null);

insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-10-01T17:09:42', 1000, 'BOAT','2022-11-01T17:09:42', null, 3, 3, null);




insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-03-13T17:09:42', 1000, 'COTTAGE','2022-01-13T17:09:42', null, null, 1, 1);

insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-05-01T17:09:42', 1000, 'COTTAGE','2022-04-01T17:09:42', null, null, 1, 2);

insert into reservations(end_time, price, reservation_type, start_time, adventure_id, boat_id, client_id, cottage_id)
values('2022-10-01T17:09:42', 1000, 'COTTAGE','2022-11-01T17:09:42', null, null, 1, 3);




insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-02-15 17:09:42', 3, 1300, 1000,'2022-02-13 17:09:42', false, null, 1, null )

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-03-15 17:09:42', 3, 1300, 1000,'2022-02-13 17:09:42', false, null, 1, null )


insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-07-15 17:09:42', 3, 1300, 1000,'2022-04-13 17:09:42', false, null, 1, null )

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-04-21 17:09:42', 3, 1300, 1000,'2022-04-17 17:09:42', false, null, 1, null )




insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-02-15 17:09:42', 3, 1300, 1000,'2022-02-13 17:09:42', false, null, 2, null )

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-03-15 17:09:42', 3, 1300, 1000,'2022-02-13 17:09:42', false, null, 2, null )


insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-07-15 17:09:42', 3, 1300, 1000,'2022-04-13 17:09:42', false, null, 2, null )

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-04-21 17:09:42', 3, 1300, 1000,'2022-04-17 17:09:42', false, null, 3, null )



insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-01-15 17:09:42', 3, 1300, 1000,'2022-01-13 17:09:42', false, null,  null, 2)

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-03-15 17:09:42', 3, 1300, 1000,'2022-02-13 17:09:42', false, null,  null, 2 )


insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-07-15 17:09:42', 3, 1300, 1000,'2022-04-13 17:09:42', false, null,  null, 3 )

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-04-21 17:09:42', 3, 1300, 1000,'2022-04-17 17:09:42', false, null,  null, 4 )


insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-01-15 17:09:42', 3, 1300, 1000,'2022-01-13 17:09:42', false, null,  null, 1)

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-03-15 17:09:42', 3, 1300, 1000,'2022-02-13 17:09:42', false, null,  null, 1 )


insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-07-15 17:09:42', 3, 1300, 1000,'2022-04-13 17:09:42', false, null,  null, 1 )

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-04-21 17:09:42', 3, 1300, 1000,'2022-04-17 17:09:42', false, null,  null, 1 )



insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-01-15 17:09:42', 3, 1300, 1000,'2022-01-13 17:09:42', false, 1,null, null)

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-03-15 17:09:42', 3, 1300, 1000,'2022-02-13 17:09:42', false, 2,null,  null)


insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-07-15 17:09:42', 3, 1300, 1000,'2022-04-13 17:09:42', false, 3,null,  null)

insert into action(end_date, max_number_of_persons, old_price, price, start_date, taken, adventure_id, boat_id, cottage_id)
values('2022-04-21 17:09:42', 3, 1300, 1000,'2022-04-17 17:09:42', false, 1,null,  null)