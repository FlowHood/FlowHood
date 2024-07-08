import React from "react";
import UserLayout from "../../components/user/UserLayout";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-3xl font-bold">Política de Privacidad</h1>
      <p className="mb-4">
        En FlowHood, valoramos su privacidad y nos comprometemos
        a proteger su información personal. Esta política de privacidad explica
        cómo recopilamos, usamos, y compartimos su información.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">
        Recopilación de Información
      </h2>
      <p className="mb-4">
        Recopilamos información que usted nos proporciona directamente, como su
        nombre, dirección de correo electrónico y cualquier otra información que
        nos envíe a través de nuestros formularios de contacto o de registro.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Uso de la Información</h2>
      <p className="mb-4">
        Utilizamos la información recopilada para proporcionar, mantener y
        mejorar nuestros servicios, así como para comunicarnos con usted.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Compartir la Información</h2>
      <p className="mb-4">
        No compartimos su información personal con terceros, excepto cuando sea
        necesario para proporcionar nuestros servicios o cuando lo exija la ley.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Seguridad</h2>
      <p className="mb-4">
        Implementamos medidas de seguridad para proteger su información
        personal. Sin embargo, ninguna medida de seguridad es infalible y no
        podemos garantizar la seguridad de su información.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Cambios en esta Política</h2>
      <p className="mb-4">
        Podemos actualizar esta política de privacidad periódicamente. Le
        notificaremos sobre cualquier cambio publicando la nueva política en
        nuestro sitio web.
      </p>
      <p className="mb-4">
        Si tiene alguna pregunta sobre nuestra política de privacidad, por favor
        contáctenos en galactic.studio23@gmail.com.
      </p>
    </div>
  );
};

const TermsOfService = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-3xl font-bold">Términos de Servicio</h1>
      <p className="mb-4">
        Bienvenido a FlowHood. Al utilizar nuestros servicios,
        usted acepta cumplir con los siguientes términos y condiciones.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Uso de los Servicios</h2>
      <p className="mb-4">
        Usted se compromete a utilizar nuestros servicios solo para fines
        legales y de acuerdo con estos términos de servicio.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Cuentas de Usuario</h2>
      <p className="mb-4">
        Usted es responsable de mantener la confidencialidad de su cuenta y
        contraseña, y acepta notificar de inmediato a FlowHood de
        cualquier uso no autorizado de su cuenta.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Propiedad Intelectual</h2>
      <p className="mb-4">
        Todo el contenido y materiales disponibles en nuestro sitio web están
        protegidos por derechos de autor y otras leyes de propiedad intelectual.
        Usted se compromete a no reproducir, distribuir o crear trabajos
        derivados sin nuestro permiso expreso.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Terminación</h2>
      <p className="mb-4">
        Nos reservamos el derecho de suspender o terminar su acceso a nuestros
        servicios en cualquier momento, sin previo aviso, si incumple estos
        términos de servicio.
      </p>
      <h2 className="mb-2 text-2xl font-semibold">Cambios en los Términos</h2>
      <p className="mb-4">
        Podemos actualizar estos términos de servicio periódicamente. Le
        notificaremos sobre cualquier cambio publicando los nuevos términos en
        nuestro sitio web.
      </p>
      <p className="mb-4">
        Si tiene alguna pregunta sobre nuestros términos de servicio, por favor
        contáctenos en galactic.studio23@gmail.com.
      </p>
    </div>
  );
};

const Policy = () => {
  return (
    <UserLayout showLogout={false}>
      <PrivacyPolicy />
      <TermsOfService />
    </UserLayout>
  );
};

export default Policy;
