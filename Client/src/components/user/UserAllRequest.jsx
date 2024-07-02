import React, { useEffect, useState } from "react";
import UserRequestContainer from "../UserRequestContainer";
import RequestFilterBar from "./filterBar/RequestFilterBar";
import { ROL, getHighestPriorityRole } from "../../lib/rol";
import ScrollToTopButton from "../ScrollToTopButton";
import Button from "../buttons/Button";
import { VIEWS } from "../../lib/views";
import { Link } from "react-router-dom";
import { getAllRequestsInMyHouse } from "../../services/request.service";
import Loading from "../Loading";
import { useAuth } from "../../context/AuthContext";

const getScreenInformation = (rol) => {
  let title;
  let subTitle;
  let subTitle2;

  switch (rol) {
    case ROL.RESIDENT:
      title = "Crear invitacion para visitas";
      subTitle =
        "Crea y mantente pendiente del estado de las invitaciones que generes para tus invitados.";
      subTitle2 = "Mantente pendiente del estado de tus solicitudes";
      break;
    case ROL.OWNER:
      title = "Invitaciones de visitantes a tu hogar";
      subTitle =
        "Administra las solicitudes de invitaciones para residentes enviadas de tu hogar o crea una nueva.";
      subTitle2 =
        "Gestiona las solicitudes de invitación de los integrantes de tu hogar.";
      break;

    case ROL.VISITOR:
      title = "Tus Invitaciones de visitas";
      subTitle =
        "Administra las solicitudes de invitaciones para residentes enviadas por los integrantes de tu hogar o crea la tuya propia.";

      break;
    default:
      title = "Invitaciones de visitantes a tu hogar";
      subTitle =
        "Administra las solicitudes de invitaciones para residentes enviadas de tu hogar o crea una nueva.";
      subTitle2 =
        "Gestiona las solicitudes de invitación de los integrantes de tu hogar.";
      break;
  }

  return {
    title,
    subTitle,
    subTitle2,
  };
};

export default function UserAllRequest() {
  const { user } = useAuth();

  const highestRole = getHighestPriorityRole(user.roles);

  let { title, subTitle, subTitle2 } = getScreenInformation(highestRole);
  const [requests, setRequests] = useState([]);
  const [allrequests, setAllRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("PEN");

  useEffect(() => {
    const fetchRequests = async () => {
      const result = await getAllRequestsInMyHouse();
      setAllRequests(result);
      setIsLoading(false);
    };

    fetchRequests();
  }, [filter]);

  useEffect(() => {
    const fetchRequests = async () => {
      const filteredRequests = allrequests.filter(
        (request) => request.status === filter,
      );

      setRequests(filteredRequests);
    };

    fetchRequests();
  }, [allrequests, filter]);

  const listOfItems =
    requests.map((request) => {
      return (
        <UserRequestContainer
          userName={request.visitor.name}
          date={request.startDate.split("T")[0]}
          time={request.startTime === request.endTime ? request.startTime : `${request.startTime} - ${request.endTime}`}
          key={request.id}
          to={`${VIEWS.requestDetail.replace("/:id", "")}/${request.id}`}
          address={request.house.address}
          reason={request.reason}
          status={request.status}
        />
      );
    }) || [];

  const handleChangeSelected = (selected) => {
    console.log("Selected:", selected);
    setFilter(selected);
  };

  return (
    <div className="flex min-h-[80vh] w-full min-w-32 flex-col items-center gap-3 px-4 font-Inter">
      <div className="flex w-11/12 flex-col gap-1 text-center">
        <h1 className="text-xl font-semibold sm:text-4xl">{title}</h1>
        <p className="text-[0.75rem] font-light sm:text-base">{subTitle}</p>
      </div>
      <div className="flex w-full flex-col sm:w-11/12">
        <div className="flex min-h-screen flex-col gap-4">
          {/* {rol === ROL.OWNER || rol === ROL.RESIDENT ? (
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-royal-amethyst sm:text-3xl">
                Solicitudes pendientes
              </h2>
              <p className="text-[0.75rem] font-light sm:text-base">
                {subTitle2}
              </p>4
            </div>
          ) : null} */}
          <RequestFilterBar
            rol={user.roles[0].id}
            handleChangeSelected={handleChangeSelected}
          />
          <div className="grid h-full w-full flex-1 grid-cols-1 grid-rows-[max-content] flex-col justify-start gap-2 pb-8 sm:px-4 md:grid-cols-2">
            {isLoading ? (
              <Loading />
            ) : listOfItems.length > 0 ? (
              listOfItems
            ) : (
              "No hay solicitudes pendientes."
            )}
          </div>
          <div className="sticky bottom-[4.2rem] flex flex-col items-center justify-center gap-2 bg-white p-3 sm:bottom-0">
            <div className="hidden flex-row items-center justify-center gap-1 text-gray-600 sm:flex">
              <hr className="h-[0.1rem] w-1/4 min-w-12 bg-gray-400" />
              <p>Ó</p>
              <hr className="h-[0.1rem] w-1/4 min-w-12 bg-gray-400" />
            </div>
            <Button as={Link} to={VIEWS.createRequest}>
              Crear invitación
            </Button>
          </div>
        </div>
      </div>
      <ScrollToTopButton scrollClassname="bottom-[4.8rem] right-5" />
    </div>
  );
}
