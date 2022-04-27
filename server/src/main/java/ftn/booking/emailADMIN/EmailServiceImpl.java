package ftn.booking.emailADMIN;


import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService{

    private final static Logger LOGGER =
            LoggerFactory.getLogger(EmailServiceImpl.class);
    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String to) {
            try{
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,
                        "utf-8");
                helper.setText("Dear user " + to + " , your account is verified!!"
                + "\n Hope you enjoy using our app!! \n \n" +
                "IsaBoooking56 team",false);
                helper.setTo(to);
                helper.setSubject("Your account verified!!");
                helper.setFrom("dejanpetrusic123@gmail.com");
                mailSender.send(mimeMessage);


            } catch (MessagingException e) {
                LOGGER.error("failed to send email ", e);
                throw new IllegalStateException("failed to send email");

            }
    }
}
