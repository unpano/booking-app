export class MailDTO{
    mailFrom !: String;
    mailTo !: String;
    mailCc : String = ""
    mailBcc : String = ""
    mailSubject !: String;
    mailContent !: String;
    contentType : String = ""
    attachments : String[] = []
}