-------------------------------------NAPOMENA---------------------------------------------------------------------------

FRONT se nalazi u folderu client, a BACK u folderu server.
------------------------------------------------------------------------------------------------------------------------

-------------------------------------3.3. REGISTRACIJA VLASNIKA VIKENDICE ILI BRODA-------------------------------------

U tabelu authorities ubaciti sledeće podatke:
insert into authority (name) values ('ROLE_COTTAGE_OWNER');
insert into authority (name) values ('ROLE_BOAT_OWNER');
insert into authority (name) values ('ROLE_INSTRUCTOR');
insert into authority (name) values ('ROLE_CLIENT');
insert into authority (name) values ('ROLE_ADMIN');

Kada se registruje novi vlasnik, polje enabled se set-uje na false. Tako sam modelovala zahtev za registraciju. Admin
to polje može promeniti na true i tada korisnik postaje aktivan. Do tada se ne može logovati.

Šifra mora imati jedno veliko, jedno malo slovo i bar jednu cifru. Sve ukupno od 8 do 20 karaktera...

update users set enabled = true where id=? (navesti id registrovanog user-a).
------------------------------------------------------------------------------------------------------------------------

-------------------------------------3.6. VLASNIK VIKENDICE-------------------------------------------------------------

Za potrebe testiranja spiska završenih rezervacija i pisanja izveštaja o završenim rezervacijama neophodno je uneti u 
bazu:
insert into reservations (start_time, end_time, price, reservation_type, client_id, cottage_id)
values ('2021-12-12 11:00:00','2021-12-15 11:00:00',40,'COTTAGE',2,1);
insert into reservations (start_time, end_time, price, reservation_type, client_id, boat_id)
values ('2021-12-12 11:00:00','2021-12-15 11:00:00',40,'BOAT',2,1);
------------------------------------------------------------------------------------------------------------------------


-------------------------------------BEZBEDNOST APLIKACIJE--------------------------------------------------------------

Za bezbednost aplikacije korišćen je Spring Security.
------------------------------------------------------------------------------------------------------------------------

-------------------------------------MySQL BAZA PODATAKA----------------------------------------------------------------

Baza se kreira na localhost:3306/booking. booking je naziv šeme baze podataka. U application.properties fajlu
podesiti:
spring.datasource.username= ?ovdeIdeUsername
spring.datasource.password= ?ovdeIdeSifra
Tako da odgovara korisničkom imenu i šifri koju ste koristili prilikom otvaranja konekcije na tom portu. 

Kada pokrenete prvi put back, tabele se formiraju automatski. 
-------------------------------------------------------------------------------------------------------------------------

-------------------------------------SLANJE MAIL-A-----------------------------------------------------------------------

Za slanje email-a podesiti u application.properties fajlu email i password. Kreiran je poseban Google Account i vec je
podeseno da se sa njega salju mejlovi. 

spring.mail.username= isaBooking56@gmail.com
spring.mail.password= isaBooking56Password

Da bi mejlovi stizali na gmail, mora se u podesiti da se primaju mejlovi od manje sigurnih izvora!
-------------------------------------------------------------------------------------------------------------------------

-----POKRETANJE FRONTEND-A-----

Pozicionirati se u folder client i pokrenuti sledece komande.
npm install -g @angular/cli
npm install
npm start

Po potrebi pre pokretanja pokrenuti komandu (ako dodje do greske prilikom pokretanja)
npm install --save-dev @angular-devkit/build-angular

-----POKRETANJE BACKEND-A-----

server
Otvoriti projekat u IntelliJ-u. Podesiti konfiguraciju da prepozna main class-u. Pokrenuti na Run.
Aplikacija se pokrece na portu 8084. Nije preporucljivo menjati port, jer je front takodje podesen da gadja
taj port, u suprotnom moralo bi se i tamo menjati.

-----REŠAVANE KONFLIKTNE SITUACIJE-----

U Word dokumentu korenskog direktorijuma projekta nalazi se opis konfliktnih situacija koje su rešavane kad je
u pitanju konkurentni pristup resursima baze u ulozi vlasnika vikendice/broda.
