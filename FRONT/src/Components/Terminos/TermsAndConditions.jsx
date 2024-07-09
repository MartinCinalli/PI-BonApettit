import React, { useRef } from 'react';
import './TermsAndConditions.css';

export const TermsAndConditions = ({ onClose }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        <div className="terms-container">
          <h2>Términos y Condiciones</h2>
          <p>Última actualización: [Fecha]</p>
          <div className="terms-scroll">
            <p>Estos términos y condiciones ("Términos", "Acuerdo") son un acuerdo entre el operador del sitio web ("Operador del sitio web", "nosotros", "nuestro" o "nos") y usted ("Usuario", "usted" o "su"). Este Acuerdo establece los términos y condiciones generales de su uso del sitio web [nombre de la página de comidas] y de cualquiera de sus productos o servicios (colectivamente, "Sitio web" o "Servicios").</p>
            <h3>1. Aceptación de los Términos</h3>
            <p>Al acceder y utilizar el Sitio web y los Servicios, usted acepta y está de acuerdo con los términos y condiciones de este Acuerdo. Si no está de acuerdo con los términos de este Acuerdo, no está autorizado a usar o acceder al Sitio web y los Servicios.</p>
            <h3>2. Cuentas y Membresía</h3>
            <p>Si crea una cuenta en el Sitio web, es responsable de mantener la seguridad de su cuenta y es completamente responsable de todas las actividades que ocurran bajo la cuenta y cualquier otra acción tomada en relación con ella. Proporcionar información de contacto precisa y actualizada es obligatorio. Notifique de inmediato cualquier uso no autorizado de su cuenta o cualquier otra violación de seguridad.</p>
            <h3>3. Contenido del Usuario</h3>
            <p>No poseemos ningún dato, información o material (colectivamente, "Contenido") que usted envíe al Sitio web durante el uso del Servicio. Usted es el único responsable de la precisión, calidad, integridad, legalidad, confiabilidad, idoneidad y propiedad intelectual o derecho de uso de todo el Contenido enviado. Podemos monitorear y revisar el Contenido enviado o creado utilizando nuestros Servicios por usted. A menos que lo permita específicamente usted, su uso del Sitio web y los Servicios no nos otorga la licencia para usar, reproducir, adaptar, modificar, publicar o distribuir el Contenido creado por usted o almacenado en su cuenta de usuario para propósitos comerciales, de marketing o similares. Pero nos otorga permiso para acceder, copiar, distribuir, almacenar, transmitir, reformatar, exhibir y ejecutar el Contenido de su cuenta de usuario únicamente según sea necesario para proporcionar los Servicios a usted.</p>
            <h3>4. Limitación de Responsabilidad</h3>
            <p>En la máxima medida permitida por la ley aplicable, en ningún caso BonAppetit, sus afiliados, directores, empleados, agentes, proveedores o licenciatarios serán responsables ante ninguna persona por (a): cualquier daño indirecto, incidental, especial, punitivo, de cobertura o consecuente (incluidos, sin limitación, daños por pérdida de beneficios, ingresos, ventas, buena voluntad, uso de contenido, impacto en el negocio, interrupción del negocio, pérdida de ahorros anticipados, pérdida de oportunidades comerciales) independientemente de la causa, bajo cualquier teoría de responsabilidad, incluidos, entre otros, contrato, agravio, garantía, incumplimiento de deber legal, negligencia o de otro tipo, incluso si la parte responsable ha sido informada de la posibilidad de tales daños o podría haber previsto tales daños. En la máxima medida permitida por la ley aplicable, la responsabilidad total agregada de [nombre de la página de comidas] y sus afiliados, funcionarios, empleados, agentes, proveedores y licenciatarios, relacionada con los servicios, se limitará a un monto mayor de un dólar o cualquier monto pagado en efectivo por usted a [nombre de la página de comidas] por el período de un mes anterior a cualquier primer evento o ocurrencia que dé lugar a tal responsabilidad. Las limitaciones y exclusiones también se aplican si este remedio no le compensa completamente por cualquier pérdida o no cumple con su propósito esencial.</p>
            <h3>5. Aceptación de Estos Términos</h3>
            <p>Usted reconoce que ha leído este Acuerdo y acepta todos sus términos y condiciones. Al utilizar el Sitio web o sus Servicios, usted acepta estar sujeto a este Acuerdo. Si no acepta cumplir con los términos de este Acuerdo, no está autorizado a usar o acceder al Sitio web y sus Servicios.</p>
          </div>
        </div>
        <button className='button-close-term' onClick={onClose}>CERRAR</button>
      </div>
    </div>
  );
};
