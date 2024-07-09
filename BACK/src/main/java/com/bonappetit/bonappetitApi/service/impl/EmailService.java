package com.bonappetit.bonappetitApi.service.impl;

import com.bonappetit.bonappetitApi.entity.Usuario;
import com.bonappetit.bonappetitApi.service.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements IEmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Override
    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("testbonappetitapp@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
    }

    private String generateEmailBody() {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<meta charset=\"UTF-8\">" +
                "<title>Confirmación de Registro - Bonapetit</title>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }" +
                ".container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }" +
                "h1 { color: #333333; }" +
                "p { color: #555555; line-height: 1.5; }" +
                "a { display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #800020; color: #ffffff; text-decoration: none; border-radius: 4px; border: 2px solid #800020; }" +
                "a:hover { background-color: #ffffff; color: #800020; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class=\"container\">" +
                "<h1>Confirmación de Registro</h1>" +
                "<p>Hola,</p>" +
                "<p>Gracias por registrarte en Bonapetit. Por favor, haz clic en el siguiente enlace para confirmar tu registro e iniciar sesión:</p>" +
                "<a href=\"" + "localhost:5173/" + "\">Confirmar Registro</a>" +
                "<p>Saludos,<br>El equipo de Bonapetit</p>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
