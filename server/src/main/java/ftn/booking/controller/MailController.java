package ftn.booking.controller;

import ftn.booking.dto.MailDTO;
import ftn.booking.model.Mail;
import ftn.booking.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "emails")
public class MailController {

	private MailService emailService;

	@Autowired
	public MailController(MailService emailService) {
		this.emailService = emailService;
	}

	@ResponseStatus(HttpStatus.OK)
	@PostMapping(value = "/send-mail", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public boolean sendMail(@RequestBody MailDTO emailDTO){
		Mail mail = new Mail(emailDTO.getMailFrom(),emailDTO.getMailTo(),emailDTO.getMailCc(),emailDTO.getMailBcc(),
				emailDTO.getMailSubject(),emailDTO.getMailContent(),emailDTO.getContentType(),emailDTO.getAttachments());
		return emailService.sendMail(mail);
	}
	
}
