package ftn.booking.service;

import ftn.booking.model.Mail;

public interface MailService {
    boolean sendMail(Mail mail);

    boolean sendMailSimplified(String sendTo,String subject,String body);
}
