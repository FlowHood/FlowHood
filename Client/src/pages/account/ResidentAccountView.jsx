import React from "react";


const ResidentAccountView = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-icy-lilac">
          <h1 className="text-3xl font-Inter text-center text-black">Tu cuenta</h1>
          <p className="text-lg text-center font-B612 text-light-gray mt-2">Administra tu cuenta y ten control de tu app</p>
          
          <div className="relative mt-6">
            <img
              src="https://via.placeholder.com/150" 
              alt="Foto de perfil"
              className="w-40 h-40 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-tanzanite text-white p-2 rounded-full shadow-card flex items-center justify-center">
              <FaCog size={20} />
            </button>
          </div>

          <h2 className="text-xl text-royal-amethyst font-semibold mt-4">Martín López</h2>
          <p className="text-lg font-Inter text-black mt-2">Familia López</p>
          <p className="text-sm font-B612 text-light-gray mt-1">Residencial HLVS, calle principal, pasaje 25, casa #24</p>

          <div className="mt-4 w-full px-8">
                <h3 className="text-lg font-B612 text-black text-left">Ajustes generales</h3>
                <button className="flex items-start text-left font-B612 text-light-gray mt-2">
                <FaUser size={20} className="mr-2" />
                Información personal
                </button>
                <button className="flex items-start text-left font-B612 text-light-gray">
                <FaFolderOpen size={20} className="mr-2" />
                Contacto con administrador
                </button>
                <button className="flex items-start text-left font-B612 text-light-gray">
                <FaCalendarAlt size={20} className="mr-2" />
                Registros de entrada
                </button>
                <button className="flex items-start text-left font-B612 text-light-gray">
                <FaHome size={20} className="mr-2" />
                Administrar hogar
                </button>
                <button className="flex items-start text-left font-B612 text-light-gray">
                <FaSignOutAlt size={20} className="mr-2" />
                Cerrar sesión
                </button>
            </div>

          

         
        </div>
        
      );

}
export default ResidentAccountView;




