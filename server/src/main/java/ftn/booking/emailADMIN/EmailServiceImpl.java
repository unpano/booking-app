package ftn.booking.emailADMIN;


import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService{

    private final JavaMailSender mailSender;
    @Override
    public void send(String to){
         SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("dejanpetrusic123@gmail.com");
        message.setTo(to);
        message.setSubject("Your account is verified!");
        message.setText("Congrats!Your account is verified!");

        mailSender.send(message);

    }

}
